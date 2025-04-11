import os
import shutil
import subprocess
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

# Paths
BASE_DIR = os.path.dirname(__file__)  # Base directory of the script
SRC_DIR = os.path.join(BASE_DIR, "../src")  # Directory to watch for changes
OUTPUT_DIR = os.path.join(BASE_DIR, "../output")  # Output directory
COMPONENTS_DIR = os.path.join(BASE_DIR, "../components")  # Directory for components

# Debounce state
last_run_time = {}  # Dictionary to track the last time each file was processed
DEBOUNCE_DELAY = 3  # Minimum delay (in seconds) between consecutive runs for the same file

class ChangeHandler(FileSystemEventHandler):
    """
    Handles file system events in the src and components directories.
    Triggers the merge process for modified or created files, with debounce logic.
    """
    def on_any_event(self, event):
        global last_run_time

        # Ignore directory events
        if event.is_directory:
            return

        # Only process 'modified' or 'created' events
        if event.event_type in ["modified", "created"]:
            current_time = time.time()
            file_path = event.src_path

            # Check if enough time has passed since the last run for this file
            if file_path not in last_run_time or current_time - last_run_time[file_path] > DEBOUNCE_DELAY:
                print(f"Change detected: {file_path}, Event type: {event.event_type}")

                # Handle non-HTML files (copy them directly)
                if not file_path.endswith(".html"):
                    copy_non_html_file(file_path)
                else:
                    # Check if the change is in the components directory
                    if file_path.startswith(COMPONENTS_DIR):
                        print(f"Component file changed: {file_path}. Re-merging all HTML files...")
                        remerge_all_html_files()
                    else:
                        # Otherwise, merge only the changed HTML file
                        run_merge(file_path)

                # Run Tailwind after merging or copying
                run_tailwind()

                # Update the last run time for this file
                last_run_time[file_path] = current_time
            else:
                print(f"Ignoring event due to debounce: {file_path}, Event type: {event.event_type}")


def run_merge(changed_file):
    """
    Runs the merge.py script to process the changed file.
    """
    try:
        print(f"Running merge.py for {changed_file}...")
        subprocess.run(["python", "scripts/merge.py", changed_file], check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error running merge.py: {e}")

def remerge_all_html_files():
    """
    Re-merges all HTML files in the src directory.
    """
    try:
        for root, _, files in os.walk(SRC_DIR):
            for file in files:
                if file.endswith(".html"):
                    file_path = os.path.join(root, file)
                    run_merge(file_path)
    except Exception as e:
        print(f"Error re-merging all HTML files: {e}")

def copy_non_html_file(file_path):
    """
    Copies non-HTML files from the src directory to the output directory.
    """
    try:
        # Determine the relative path and destination path
        relative_path = os.path.relpath(file_path, SRC_DIR)
        destination_path = os.path.join(OUTPUT_DIR, relative_path)

        # Ensure the destination directory exists
        os.makedirs(os.path.dirname(destination_path), exist_ok=True)

        # Copy the file
        shutil.copy2(file_path, destination_path)
        print(f"Copied non-HTML file: {file_path} to {destination_path}")
    except Exception as e:
        print(f"Error copying file {file_path}: {e}")

def run_tailwind():
    """
    Runs the Tailwind CSS build process.
    """
    try:
        print("Running Tailwind CSS...")
        # Replace the following command with your Tailwind build command
        subprocess.run(["tailwindcss", "-i", "output/css/input.css", "-o", "output/css/styles.css"], check=True)
        print("Tailwind CSS build complete.")
    except subprocess.CalledProcessError as e:
        print(f"Error running Tailwind CSS: {e}")

def initial_merge():
    """
    Performs an initial merge of all HTML files in the src directory.
    """
    print("Performing initial merge of all HTML files...")
    remerge_all_html_files()
    print("Initial merge complete.")

if __name__ == "__main__":
    # Ensure the src directory exists
    if not os.path.exists(SRC_DIR):
        print(f"Error: The directory {SRC_DIR} does not exist.")
        exit(1)

    # Ensure the components directory exists
    if not os.path.exists(COMPONENTS_DIR):
        print(f"Error: The directory {COMPONENTS_DIR} does not exist.")
        exit(1)

    # Perform an initial merge of all HTML files
    initial_merge()

    # Set up the observer to monitor both src and components directories
    event_handler = ChangeHandler()
    observer = Observer()

    # Watch the src directory for changes
    observer.schedule(event_handler, SRC_DIR, recursive=True)

    # Watch the components directory for changes
    observer.schedule(event_handler, COMPONENTS_DIR, recursive=True)

    print(f"Watching for changes in {SRC_DIR} and {COMPONENTS_DIR}...")
    try:
        # Start the observer
        observer.start()
        while True:
            time.sleep(1)  # Keep the script running with minimal CPU usage
    except KeyboardInterrupt:
        # Stop the observer on Ctrl+C
        print("Stopping the watcher...")
        observer.stop()
    observer.join()
