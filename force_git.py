
import subprocess
import sys

def run_cmd(cmd):
    try:
        with open('/tmp/git_force.log', 'a') as f:
            f.write("\n=== Running: {} ===\n".format(cmd))
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True, cwd='/workspace')
        with open('/tmp/git_force.log', 'a') as f:
            if result.stdout:
                f.write(result.stdout)
            if result.stderr:
                f.write("STDERR: {}".format(result.stderr))
            f.write("\nReturn code: {}\n".format(result.returncode))
        return result.stdout, result.stderr, result.returncode
    except Exception as e:
        with open('/tmp/git_force.log', 'a') as f:
            f.write("Exception: {}\n".format(str(e)))
        return "", str(e), -1

# Clear log
with open('/tmp/git_force.log', 'w') as f:
    f.write("Starting force git sync...\n")

# Check git status
stdout, stderr, code = run_cmd('git status')

# Force add all changes
stdout, stderr, code = run_cmd('git add -u')

# Check if there are changes to commit
stdout, stderr, code = run_cmd('git status')

# Try to commit
stdout, stderr, code = run_cmd('git commit -m "Add annotation location and transform control improvements"')

# Try to push
stdout, stderr, code = run_cmd('git push')

print("Done. Check /tmp/git_force.log for details.")
