
import subprocess

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
print(stderr)

print("\n=== git diff --cached ===")
stdout, stderr, code = run_cmd('git diff --cached')
print(stdout)

print("\n=== git diff ===")
stdout, stderr, code = run_cmd('git diff')
print(stdout)
