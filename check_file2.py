
import os

files_to_check = [
    'src/components/Scene3D.jsx',
    'src/components/RightPanel.jsx'
]

for file_path in files_to_check:
    if os.path.exists(file_path):
        print("=== {} ===".format(file_path))
        with open(file_path, 'r') as f:
            # Read first 200 lines
            lines = []
            for i, line in enumerate(f):
                if i < 200:
                    lines.append(line.rstrip())
                else:
                    break
            print('\n'.join(lines))
        print("\n")
    else:
        print("File {} not found\n".format(file_path))
