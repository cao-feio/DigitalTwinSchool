
import subprocess
import os

def run_command(cmd):
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True, cwd='/workspace')
        return result.stdout, result.stderr, result.returncode
    except Exception as e:
        return "", str(e), -1

# Get changed files
stdout, stderr, code = run_command('git diff --name-only origin/main...main')
with open('/tmp/changes.txt', 'w') as f:
    f.write(stdout)

# Get git log
stdout, stderr, code = run_command('git log --oneline origin/main..main')
with open('/tmp/log.txt', 'w') as f:
    f.write(stdout)

# Get git status
stdout, stderr, code = run_command('git status')
with open('/tmp/status.txt', 'w') as f:
    f.write(stdout)

print("Git info saved to /tmp/")
