[CmdletBinding(SupportsShouldProcess)]
param(
  [string]$CodexSkillsRoot
)

$projectRoot = Split-Path -Parent $PSScriptRoot
$sourceRoot = Join-Path $projectRoot '.agents\skills'
$skillNames = @(
  'agency-code-reviewer',
  'agency-frontend-developer',
  'agency-software-architect',
  'agency-technical-writer',
  'agency-ui-designer',
  'agency-ux-architect',
  'design-taste-frontend'
)

if (-not (Test-Path -LiteralPath $sourceRoot -PathType Container)) {
  throw "Project skill source is missing: $sourceRoot"
}

if (-not $CodexSkillsRoot) {
  $configuredRoot = [Environment]::GetEnvironmentVariable('CODEX_HOME')
  if ($configuredRoot) {
    $CodexSkillsRoot = Join-Path $configuredRoot 'skills'
  } else {
    $CodexSkillsRoot = Join-Path $env:USERPROFILE '.codex\skills'
  }
}

if (-not (Test-Path -LiteralPath $CodexSkillsRoot -PathType Container)) {
  if ($PSCmdlet.ShouldProcess($CodexSkillsRoot, 'Create Codex skills directory')) {
    New-Item -ItemType Directory -Path $CodexSkillsRoot -Force | Out-Null
  }
}

foreach ($skillName in $skillNames) {
  $source = Join-Path $sourceRoot $skillName
  $manifest = Join-Path $source 'SKILL.md'
  $destination = Join-Path $CodexSkillsRoot $skillName

  if (-not (Test-Path -LiteralPath $manifest -PathType Leaf)) {
    throw "Missing skill manifest: $manifest"
  }

  if (Test-Path -LiteralPath $destination) {
    Write-Warning "Skipped $skillName because destination already exists: $destination"
    continue
  }

  if ($PSCmdlet.ShouldProcess($destination, "Create junction to $source")) {
    New-Item -ItemType Junction -Path $destination -Target $source | Out-Null
    Write-Output "Enabled $skillName"
  }
}

$harnessCli = Join-Path $projectRoot 'scripts\bin\harness-cli.exe'
if (Test-Path -LiteralPath $harnessCli -PathType Leaf) {
  $registeredTools = @(& $harnessCli query tools --json | ConvertFrom-Json)
  $qualityProviders = @(
    @('codebase-memory-mcp', 'mcp', 'impact-analysis', 'mcp:codebase-memory-mcp', 'Graph-based code discovery and change-impact analysis.'),
    @('browser-qa', 'skill', 'browser-qa', 'skill:browser:control-in-app-browser', 'Interactive desktop and mobile UI verification in Codex Browser.')
  )

  foreach ($provider in $qualityProviders) {
    if ($registeredTools.name -contains $provider[0]) {
      continue
    }

    & $harnessCli tool register --name $provider[0] --kind $provider[1] --capability $provider[2] --command $provider[3] --description $provider[4] --responsibility Verification
    if ($LASTEXITCODE -ne 0) {
      throw "Could not register Harness provider: $($provider[0])"
    }
    Write-Output "Registered Harness provider $($provider[0])"
  }
} else {
  Write-Warning "Harness CLI was not found; register the providers when the project Harness is installed."
}

Write-Output 'Restart or begin a new Codex task to refresh its skill catalog.'
