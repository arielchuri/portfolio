import os
import sys
import re

# Paths
BASE_DIR = os.path.dirname(__file__)  # Base directory of the script
SRC_DIR = os.path.join(BASE_DIR, "../src")  # Source directory
OUTPUT_DIR = os.path.join(BASE_DIR, "../output")  # Output directory
COMPONENTS_DIR = os.path.join(BASE_DIR, "../components")  # Components directory

def load_component(component_name):
    """
    Loads the content of a component (e.g., head, nav, footer) from the components directory.
    """
    component_path = os.path.join(COMPONENTS_DIR, f"{component_name}.html")
    if not os.path.exists(component_path):
        print(f"Warning: Component {component_name} not found.")
        return f"<!-- Missing {component_name} -->"
    with open(component_path, "r") as component_file:
        return component_file.read()

def extract_title_from_body(content):
    """
    Extracts the title from the id attribute of the <main> tag in the content file.
    """
    match = re.search(r'<main[^>]*id="([^"]+)"', content)
    if match:
        return match.group(1).strip()
    return "Untitled Page"  # Default title if no id is found

def merge_file(file_path):
    """
    Merges the head, nav, content, and footer into a complete HTML document.
    Writes the output to the output directory.
    """
    # Get the relative path of the file (e.g., "index.html")
    file_name = os.path.basename(file_path)

    # Read the content of the source file
    with open(file_path, "r") as src_file:
        content = src_file.read()

    # Extract the title from the <body> tag's id attribute
    page_title = extract_title_from_body(content)

    # Load components
    head = load_component("head")
    nav = load_component("navigation")
    footer = load_component("footer")

    # Merge the components into a complete HTML document
    merged_content = f"""
    <!DOCTYPE html>
    <html>
    {head.replace("<title></title>", f"<title>{page_title}</title>")}
    {nav}
    {content}
    {footer}
    </html>
    """

    # Write the merged content to the output directory
    output_path = os.path.join(OUTPUT_DIR, file_name)
    with open(output_path, "w") as output_file:
        output_file.write(merged_content)

    print(f"Merged {file_name} into {output_path}")

if __name__ == "__main__":
    # Check if a file path was passed as an argument
    if len(sys.argv) < 2:
        print("Error: No file specified for merging.")
        sys.exit(1)

    # Get the file path from the command-line arguments
    file_path = sys.argv[1]

    # Ensure the file exists
    if not os.path.exists(file_path):
        print(f"Error: File {file_path} does not exist.")
        sys.exit(1)

    # Merge the specified file
    merge_file(file_path)
