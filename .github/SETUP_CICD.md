# CI/CD Setup Guide for Vercel Deployment

This guide will help you set up automatic deployments to Vercel using GitHub Actions.

## Prerequisites
- GitHub repository with your code
- Vercel account with a project already created

## Step 1: Get Your Vercel Tokens

### 1.1 Get Vercel Token
1. Go to https://vercel.com/account/tokens
2. Click **Create Token**
3. Name it "GitHub Actions" (or any name you prefer)
4. Copy the token (you won't see it again!)

### 1.2 Get Project Information
Run these commands in your terminal:

```bash
# Install Vercel CLI (if not already installed)
npm install -g vercel@latest

# Link to your Vercel project
vercel link

# Get your project details
cat .vercel/project.json
```

You'll need:
- `projectId` (from the `.vercel/project.json` file)
- `orgId` (from the `.vercel/project.json` file)

## Step 2: Add Secrets to GitHub

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add these three secrets:

| Secret Name | Value |
|------------|-------|
| `VERCEL_TOKEN` | The token you created in step 1.1 |
| `VERCEL_ORG_ID` | The `orgId` from `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | The `projectId` from `.vercel/project.json` |

## Step 3: How to Use the CI/CD Pipeline

### Automatic Deployment
- **Push to `main` branch** → Automatically deploys to **production**

### Manual Deployment (from any branch)
1. Go to your GitHub repository
2. Click **Actions** tab
3. Select **Deploy to Vercel** workflow
4. Click **Run workflow** button
5. Choose:
   - **Branch to deploy** (e.g., `feature/content-booking-updates`, `main`, etc.)
   - **Environment** (`production` or `preview`)
6. Click **Run workflow**

### Deployment Types
- **Production**: Deploys to your main domain (mermaid2.vercel.app)
- **Preview**: Creates a unique preview URL for testing

## Step 4: Commit and Push the Workflow

```bash
# Add the workflow file
git add .github/workflows/deploy-vercel.yml

# Commit
git commit -m "Add CI/CD workflow for Vercel deployment"

# Push to GitHub
git push origin feature/content-booking-updates
```

## Troubleshooting

### Error: "Missing Vercel Token"
- Make sure you added `VERCEL_TOKEN` secret in GitHub Settings

### Error: "Project not found"
- Verify `VERCEL_PROJECT_ID` and `VERCEL_ORG_ID` are correct
- Run `vercel link` again to ensure project is linked

### Deployment Failed
- Check the Actions tab in GitHub for detailed logs
- Ensure your project builds successfully locally with `npm run build`

## Advanced: Deploy on Pull Requests

If you want to automatically deploy preview environments for pull requests, add this to the workflow:

```yaml
on:
  pull_request:
    branches:
      - main
```

This will create a preview deployment for every pull request!
