# EmailJS Troubleshooting Guide

## Issue: "Email service is not configured" on GitHub Pages

If you're seeing this error after deployment, follow these steps:

### Step 1: Verify GitHub Secrets Are Set

1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Verify you have these **exact** secret names (case-sensitive):
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`

4. **Important:** Make sure:
   - No extra spaces before or after the secret names
   - No typos in the names
   - The values are not empty (click on each secret to verify it has a value)

### Step 2: Check GitHub Actions Workflow Run

1. Go to your repository → **Actions** tab
2. Click on the latest workflow run
3. Expand the "Verify EmailJS secrets are set" step
4. If you see ❌ errors, the secrets are not set correctly
5. If you see ✅, the secrets are being read

### Step 3: Verify Secret Values

Make sure your secret values match what you have in your local `.env` file:

**Local `.env` file:**
```
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

**GitHub Secrets should have the same values** (without the `VITE_` prefix in the value itself - the prefix is only in the secret name).

### Step 4: Rebuild and Redeploy

After fixing any issues:

1. Make a small change (like adding a space) and commit
2. Push to `main` branch
3. Wait for the GitHub Actions workflow to complete
4. Check the Actions tab to ensure the build succeeded

### Step 5: Verify in Browser

1. Open your deployed site
2. Open browser Developer Tools (F12)
3. Go to **Console** tab
4. Try submitting the contact form
5. Check for any error messages

### Common Issues

#### Issue: Secrets show as set but still getting error

**Solution:** The secrets might have been set after the last build. Make sure to:
- Push a new commit to trigger a rebuild
- Or manually trigger the workflow: Actions → Deploy to GitHub Pages → Run workflow

#### Issue: Secret names don't match

**Solution:** The secret names in GitHub must **exactly** match:
- `VITE_EMAILJS_SERVICE_ID` (not `EMAILJS_SERVICE_ID` or `VITE_EMAILJS_SERVICE`)
- `VITE_EMAILJS_TEMPLATE_ID` (not `EMAILJS_TEMPLATE_ID`)
- `VITE_EMAILJS_PUBLIC_KEY` (not `EMAILJS_PUBLIC_KEY`)

#### Issue: Values have extra spaces

**Solution:** When setting secrets in GitHub:
1. Copy the value from your EmailJS dashboard
2. Paste it directly (don't add spaces)
3. Make sure there are no leading/trailing spaces

### Testing Locally

To verify your setup works:

1. Create a `.env` file in the project root:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

2. Run `npm run build`
3. Run `npm run preview`
4. Test the contact form
5. If it works locally but not on GitHub Pages, the issue is with the GitHub Secrets setup

### Still Not Working?

If you've verified all the above and it's still not working:

1. Check the GitHub Actions build logs for any errors
2. Verify the build output includes the environment variables (they'll be embedded in the JS files)
3. Make sure you're testing on the deployed GitHub Pages URL, not localhost

