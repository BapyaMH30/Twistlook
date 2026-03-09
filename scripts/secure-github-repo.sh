#!/bin/bash

#############################################
# GitHub Repository Security Configuration
# Repository: BapyaMH30/Twistlook
#############################################

REPO="BapyaMH30/Twistlook"
BRANCH="main"

echo "============================================"
echo "  GitHub Repository Security Setup"
echo "  Repository: $REPO"
echo "============================================"
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "ERROR: GitHub CLI (gh) is not installed."
    echo "Install it from: https://cli.github.com/"
    exit 1
fi

# Check if authenticated
echo "[1/10] Checking GitHub authentication..."
if ! gh auth status &> /dev/null; then
    echo "You need to authenticate with GitHub first."
    gh auth login
fi
echo "✓ Authenticated"
echo ""

CURRENT_USER=$(gh api user -q '.login')
echo "Logged in as: $CURRENT_USER"
echo ""

#############################################
# Repository Settings
#############################################

echo "[2/10] Configuring repository settings..."
RESULT=$(gh api repos/$REPO -X PATCH \
    -f has_issues=true \
    -f has_wiki=false \
    -f has_projects=false \
    -f allow_squash_merge=true \
    -f allow_merge_commit=false \
    -f allow_rebase_merge=false \
    -f delete_branch_on_merge=true \
    -f allow_forking=false \
    -f web_commit_signoff_required=true 2>&1)

if [ $? -eq 0 ]; then
    echo "✓ Repository settings configured"
else
    echo "⚠ Could not update all settings (some may require admin access)"
    echo "  Trying individual settings..."

    # Try each setting individually
    gh api repos/$REPO -X PATCH -f has_wiki=false 2>/dev/null && echo "  ✓ Disabled wiki"
    gh api repos/$REPO -X PATCH -f has_projects=false 2>/dev/null && echo "  ✓ Disabled projects"
    gh api repos/$REPO -X PATCH -f allow_squash_merge=true 2>/dev/null && echo "  ✓ Enabled squash merge"
    gh api repos/$REPO -X PATCH -f delete_branch_on_merge=true 2>/dev/null && echo "  ✓ Auto-delete branches"
fi
echo ""

#############################################
# Branch Protection Rules
#############################################

echo "[3/10] Setting up branch protection for '$BRANCH'..."

# First check if repo has any commits
BRANCHES=$(gh api repos/$REPO/branches 2>&1)
if echo "$BRANCHES" | grep -q "\"name\""; then

    # Try simplified branch protection
    PROTECT_RESULT=$(gh api repos/$REPO/branches/$BRANCH/protection -X PUT \
        -H "Accept: application/vnd.github+json" \
        --input - 2>&1 << 'EOF'
{
  "required_status_checks": null,
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "required_approving_review_count": 1,
    "dismiss_stale_reviews": true
  },
  "restrictions": null
}
EOF
)

    if [ $? -eq 0 ]; then
        echo "✓ Branch protection enabled"
        echo "  - Require 1 PR approval"
        echo "  - Dismiss stale reviews"
        echo "  - Enforce for admins"
    else
        echo "⚠ Branch protection may require GitHub Pro/Team"
        echo "  Error: $PROTECT_RESULT"
    fi
else
    echo "⚠ No branches found - push code first, then re-run"
fi
echo ""

#############################################
# Security Features
#############################################

echo "[4/10] Enabling vulnerability alerts..."
VULN_RESULT=$(gh api repos/$REPO/vulnerability-alerts -X PUT 2>&1)
if [ $? -eq 0 ]; then
    echo "✓ Vulnerability alerts enabled"
else
    echo "⚠ Could not enable vulnerability alerts"
fi
echo ""

echo "[5/10] Enabling automated security fixes..."
SEC_RESULT=$(gh api repos/$REPO/automated-security-fixes -X PUT 2>&1)
if [ $? -eq 0 ]; then
    echo "✓ Automated security fixes enabled"
else
    echo "⚠ Could not enable automated security fixes"
fi
echo ""

echo "[6/10] Enabling Dependabot..."
# Create dependabot.yml
mkdir -p .github
cat > .github/dependabot.yml << 'EOF'
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/backend"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5

  - package-ecosystem: "npm"
    directory: "/frontend"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5
EOF
echo "✓ Created .github/dependabot.yml"
echo ""

#############################################
# Action Permissions
#############################################

echo "[7/10] Configuring GitHub Actions permissions..."
gh api repos/$REPO/actions/permissions -X PUT \
    -f enabled=true \
    -f allowed_actions=all 2>/dev/null && echo "✓ Actions configured" || echo "⚠ Could not configure actions"
echo ""

#############################################
# Create Security Files
#############################################

echo "[8/10] Creating security policy..."

cat > .github/SECURITY.md << 'EOF'
# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability:

1. **DO NOT** open a public issue
2. Email the maintainers or use GitHub's private vulnerability reporting
3. Include steps to reproduce
4. Allow 48 hours for response

We take security seriously and will address vulnerabilities promptly.
EOF
echo "✓ Created SECURITY.md"

echo ""
echo "[9/10] Creating contributing guidelines..."

cat > .github/CONTRIBUTING.md << 'EOF'
# Contributing to TwistLook

## How to Contribute

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a Pull Request

## Guidelines

- Be respectful
- Follow existing code style
- Write clear commit messages
- Keep PRs focused
EOF
echo "✓ Created CONTRIBUTING.md"

echo ""
echo "[10/10] Creating issue templates..."

mkdir -p .github/ISSUE_TEMPLATE

cat > .github/ISSUE_TEMPLATE/bug_report.md << 'EOF'
---
name: Bug Report
about: Report a bug
title: '[BUG] '
labels: bug
---

**Describe the bug**

**Steps to reproduce**

**Expected behavior**

**Screenshots (if applicable)**
EOF

cat > .github/ISSUE_TEMPLATE/feature_request.md << 'EOF'
---
name: Feature Request
about: Suggest a feature
title: '[FEATURE] '
labels: enhancement
---

**Problem**

**Proposed solution**

**Alternatives considered**
EOF

cat > .github/PULL_REQUEST_TEMPLATE.md << 'EOF'
## Description

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation

## Checklist
- [ ] Tested changes
- [ ] Updated documentation
EOF

echo "✓ Created issue/PR templates"

#############################################
# Summary
#############################################

echo ""
echo "============================================"
echo "  SETUP COMPLETE"
echo "============================================"
echo ""
echo "Created files in .github/:"
ls -la .github/
echo ""
echo "NEXT STEPS:"
echo ""
echo "1. Push the security files to GitHub:"
echo "   git add ."
echo "   git commit -m 'Add security policy and templates'"
echo "   git push origin main"
echo ""
echo "2. Go to GitHub Settings to enable additional features:"
echo "   https://github.com/$REPO/settings"
echo ""
echo "   Settings > General:"
echo "   - Uncheck 'Wikis'"
echo "   - Uncheck 'Projects'"
echo "   - Check 'Automatically delete head branches'"
echo ""
echo "   Settings > Branches:"
echo "   - Add branch protection rule for 'main'"
echo "   - Require pull request reviews"
echo ""
echo "   Settings > Code security:"
echo "   - Enable Dependabot alerts"
echo "   - Enable Dependabot security updates"
echo "   - Enable Secret scanning"
echo ""
echo "============================================"
