
import subprocess
import sys

def run_cmd(cmd):
    try:
        with open('/tmp/git.log', 'a') as f:
            f.write(f"\n=== Running: {cmd} ===\n")
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True, cwd='/workspace')
        with open('/tmp/git.log', 'a') as f:
            if result.stdout:
                f.write(result.stdout)
            if result.stderr:
                f.write(f"STDERR: {result.stderr}")
            f.write(f"\nReturn code: {result.returncode}\n")
        return result.stdout, result.stderr, result.returncode
    except Exception as e:
        with open('/tmp/git.log', 'a') as f:
            f.write(f"Exception: {str(e)}\n")
        return "", str(e), -1

# Clear log
with open('/tmp/git.log', 'w') as f:
    f.write("Starting git sync...\n")

# Check git status
stdout, stderr, code = run_cmd('git status')

# Add files
stdout, stderr, code = run_cmd('git add src/components/Scene3D.jsx src/components/RightPanel.jsx')

# Commit
stdout, stderr, code = run_cmd('git commit -m "Add annotation location and transform control improvements"')

# Push
stdout, stderr, code = run_cmd('git push')

print("Git sync completed. Check /tmp/git.log for details.")
