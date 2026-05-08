
import os
import time

# List of files we modified
files = [
    'src/components/Scene3D.jsx',
    'src/components/RightPanel.jsx'
]

print("Checking modified files:")
for f in files:
    if os.path.exists(f):
        stat = os.stat(f)
        print(f"{f}: mtime = {stat.st_mtime}")
        # Touch the file to update modification time
        with open(f, 'rb') as infile:
            content = infile.read()
        with open(f, 'wb') as outfile:
            outfile.write(content)
        print(f"Touched {f}")
    else:
        print(f"File not found: {f}")

print("\nDone.")
