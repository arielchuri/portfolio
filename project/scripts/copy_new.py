import os
import shutil
from filecmp import cmp

def copy_new_or_changed_files(source_dir, target_dir, exclude_files=None):
    """
    Copies new or changed files from source_dir to target_dir, preserving directory structure.
    Excludes files listed in exclude_files.
    """
    if exclude_files is None:
        exclude_files = []

    for root, dirs, files in os.walk(source_dir):
        # Recreate directory structure in the target directory
        relative_path = os.path.relpath(root, source_dir)
        target_root = os.path.join(target_dir, relative_path)
        os.makedirs(target_root, exist_ok=True)

        for file in files:
            source_file = os.path.join(root, file)
            target_file = os.path.join(target_root, file)

            # Skip excluded files
            if file in exclude_files:
                continue

            # Copy the file if it doesn't exist in the target or if it has changed
            if not os.path.exists(target_file) or not cmp(source_file, target_file, shallow=False):
                shutil.copy2(source_file, target_file)
                print(f"Copied: {source_file} -> {target_file}")
