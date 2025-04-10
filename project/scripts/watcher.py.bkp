import os
import subprocess
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

# Paths
BASE_DIR = os.path.dirname(__file__)  # Base directory of the project
SRC_DIR = os.path.join(BASE_DIR, "../src")  # Directory containing page content
COMPONENTS_DIR = os.path.join(BASE_DIR, "../components")  # Directory containing reusable components
OUTPUT_DIR = os.path.join(BASE_DIR, "output")  # Directory for merged output files

# Commands
TAILWIND_CMD = ["tailwindcss", "-i", "output/css/input.css", "-o", "output/css/styles.css"]  # Tailwind CLI command
RELOADSERVER_CMD = ["python", "-m", "reloadserver"]  # Command to start the reload server

class ChangeHandler(FileSystemEventHandler):
    """
    Handles file system events (e.g., file changes, additions, deletions).
    Triggers the merge process when changes are detected.
    """
    def on_any_event(self, event):
        # Ignore directory events
        if event.is_directory:
            return

        # Trigger merge.py if an HTML file changes in src or components
        if event.src_path.endswith(".html"):
            print(f"Change detected: {event.src_path}")
            run_merge()

def run_merge():
    """
    Runs the merge.py script to merge components and page content into the output directory.
    """
    try:
        print("Running merge.py...")
        subprocess.run(["python", "scripts/merge.py"], check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error running merge.py: {e}")

def start_tailwind():
    """
    Starts the Tailwind CLI in watch mode to process CSS changes.
    """
    try:
        print("Starting Tailwind...")
        subprocess.Popen(TAILWIND_CMD)
    except FileNotFoundError:
        print("Error: Tailwind CLI not found. Make sure it is installed and available in your PATH.")

def start_reloadserver():
    """
    Starts the reload server to serve files and reload the browser on changes.
    """
    try:
        print("Starting reloadserver...")
        subprocess.Popen(RELOADSERVER_CMD)
    except FileNotFoundError:
        print("Error: reloadserver not found. Make sure it is installed and available in your PATH.")

if __name__ == "__main__":
    # Start Tailwind and reloadserver in the background
    start_tailwind()
    start_reloadserver()

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
            pass  # Keep the script running
    except KeyboardInterrupt:
        # Stop the observer on Ctrl+C
        observer.stop()
    observer.join()
