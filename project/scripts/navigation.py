import os

def generate_navigation():
    # Adjust the path to the components directory
    components_dir = os.path.join(os.path.dirname(__file__), "../components")
    with open(os.path.join(components_dir, "navigation.html"), "r") as f:
        return f.read()
