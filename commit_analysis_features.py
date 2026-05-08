
import subprocess

def run_cmd(cmd):
    try:
        with open('/tmp/commit_analysis.log', 'a') as f:
            f.write("\n=== Running: {} ===\n".format(cmd))
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True, cwd='/workspace')
        with open('/tmp/commit_analysis.log', 'a') as f:
            if result.stdout:
                f.write(result.stdout)
            if result.stderr:
                f.write("STDERR: {}\n".format(result.stderr))
            f.write("Return code: {}\n".format(result.returncode))
        return result.stdout, result.stderr, result.returncode
    except Exception as e:
        with open('/tmp/commit_analysis.log', 'a') as f:
            f.write("Exception: {}\n".format(str(e)))
        return "", str(e), -1

# Clear log
with open('/tmp/commit_analysis.log', 'w') as f:
    f.write("Starting analysis features commit...\n")

# Add modified files
stdout, stderr, code = run_cmd('git add src/components/Scene3D.jsx src/components/RightPanel.jsx')

# Commit
stdout, stderr, code = run_cmd('git commit -m "添加可视化范围分析和日照分析功能"')

# Push
stdout, stderr, code = run_cmd('git push')

print("Sync complete. Check /tmp/commit_analysis.log")
