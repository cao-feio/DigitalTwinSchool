
import os

files_to_check = [
    'src/components/Scene3D.jsx',
    'src/components/RightPanel.jsx'
]

for file_path in files_to_check:
    if os.path.exists(file_path):
        print(f"=== {file_path} ===")
        with open(file_path, 'r') as f:
            # Read first 200 lines
            for i, line in enumerate(f):
                if i &lt; 200:
                    print(line.rstrip())
                else:
                    break
        print("\n")
    else:
        print(f"File {file_path} not found\n")
