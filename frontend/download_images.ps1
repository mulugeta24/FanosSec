$dir = "C:\CyberCodingHub\frontend\public\assets\images\courses"
if (-not (Test-Path -Path $dir)) {
    New-Item -ItemType Directory -Force -Path $dir
}

$prompts = @(
    "cyberpunk web application pentester hacker matrix",
    "cyberpunk network security server room glowing blue",
    "cyberpunk malware analysis binary code virus red",
    "cyberpunk red team hacker hoodie neon red",
    "cyberpunk digital forensics investigation blue neon",
    "cyberpunk threat intelligence global map radar",
    "cyberpunk cloud security data servers glowing",
    "cyberpunk SOC analyst multiple monitors command center",
    "cyberpunk cryptography encryption keys padlock golden",
    "cyberpunk application security secure code shield",
    "cyberpunk IoT smart devices hardware chip glowing",
    "cyberpunk threat hunter sniper crosshair data",
    "cyberpunk compliance governance holographic document",
    "cyberpunk blue team hacker defensive shield neon blue"
)

for ($i=0; $i -lt $prompts.Length; $i++) {
    $prompt = $prompts[$i] -replace ' ', '%20'
    $url = "https://image.pollinations.ai/prompt/$prompt?width=600&height=400&nologo=true"
    $outFile = "$dir\course_$($i+1).jpg"
    try {
        Invoke-WebRequest -Uri $url -OutFile $outFile -UseBasicParsing
        Write-Host "Downloaded course_$($i+1).jpg"
    } catch {
        Write-Host "Failed to download course_$($i+1).jpg: $_"
    }
    Start-Sleep -Seconds 1
}
