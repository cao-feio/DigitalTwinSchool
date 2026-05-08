
import subprocess
import sys

def run_cmd(cmd):
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True, cwd='/workspace')
        return result.stdout, result.stderr, result.returncode
    except Exception as e:
        return "", str(e), -1

# Check git status
print("=== git status ===")
stdout, stderr, code = run_cmd('git status')
print(stdout)
if stderr:
    print("stderr:", stderr)

print("\n=== git diff ===")
stdout, stderr, code = run_cmd('git diff')
print(stdout)
if stderr:
    print("stderr:", stderr)
