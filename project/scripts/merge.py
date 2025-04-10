import os
import re
from header import generate_header
from navigation import generate_navigation
from footer import generate_footer
from copy_new import copy_new_or_changed_files

# Define directories relative to the scripts folder
BASE_DIR = os.path.dirname(__file__)
PAGES_DIR = os.path.join(BASE_DIR, "../src")
OUTPUT_DIR = os.path.join(BASE_DIR, "../output")

# Ensure output directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Function to extract the title from the <main> tag's id attribute
def extract_title_from_main(content):
    # Match the <main> tag with an id attribute
    match = re.search(r'<main\s+id="(.+?)"', content)
    return match.group(1) if match else "Untitled"

# Track merged files to exclude them from being overwritten
merged_files = []

# Merge HTML files
for page_file in os.listdir(PAGES_DIR):
    if page_file.endswith(".html"):
        # Read the page content
        with open(os.path.join(PAGES_DIR, page_file), "r") as f:
            page_content = f.read()

        # Extract the title from the <main> tag's id attribute
        page_title = extract_title_from_main(page_content)

        # Generate each component
        header = generate_header(page_title)
        navigation = generate_navigation()
        footer = generate_footer()

        # Merge the components and page content
        merged_content = f"{header}\n{navigation}\n{page_content}\n{footer}"

        # Write the merged content to the output directory
        output_file = os.path.join(OUTPUT_DIR, page_file)
        with open(output_file, "w") as f:
            f.write(merged_content)

        print(f"Merged {page_file} into {output_file}")

        # Add the merged file to the exclusion list
        merged_files.append(page_file)

# Copy new or changed files, excluding merged files
copy_new_or_changed_files(PAGES_DIR, OUTPUT_DIR, exclude_files=merged_files)
