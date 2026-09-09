import json
import os
import re

log_path = r'C:\Users\karth\.gemini\antigravity\brain\d661edee-3a47-47d5-bfe3-50981e33b780\.system_generated\logs\transcript_full.jsonl'
text = ''
with open(log_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            j = json.loads(line)
            if j.get('type') == 'USER_INPUT' and 'Allocated Limit' in j.get('content', ''):
                text = j['content']
        except Exception:
            pass

# Filter only the lines with data
lines = text.split('\n')
data_lines = []
for line in lines:
    if line.strip() and line.strip()[0].isdigit() and ' ' in line:
        data_lines.append(line)

with open('data_pipeline/raw_ocr.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(data_lines))

print(f"Extracted {len(data_lines)} lines of MP data from transcript.")
