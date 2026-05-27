# Deployment Instructions

## Vercel (Recommended)

1.  **Push to GitHub/GitLab/Bitbucket**: Ensure your project is pushed to a repository.
2.  **Import Project**:
    *   Go to [Vercel Dashboard](https://vercel.com/dashboard).
    *   Click **Add New...** > **Project**.
    *   Import your repository.
3.  **Configure**:
    *   Framework Preset: **Next.js** (Should be auto-detected).
    *   Root Directory: `./` (default).
    *   Build Command: `next build` (default).
4.  **Deploy**: Click **Deploy**.

## Manual Build

To build the project locally for production:

```bash
npm run build
npm start
```

## Environment Variables

Currently, no environment variables are required for the static portfolio features.
If you add dynamic features (like a real email backend), add them in Vercel Project Settings > Environment Variables.
