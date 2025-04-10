import os

def generate_header(title):
    # Adjust the path to the components directory
    components_dir = os.path.join(os.path.dirname(__file__), "../components")
    with open(os.path.join(components_dir, "header.html"), "r") as f:
        header_template = f.read()
    return header_template.replace("{{title}}", title)

# Test the function
if __name__ == "__main__":
    # Example title for testing
    test_title = "Test Page"
    print(generate_header(test_title))
