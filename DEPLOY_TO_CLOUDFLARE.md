# ☁️ Deploying to Cloudflare Pages

This guide walks you through deploying your portfolio to **Cloudflare Pages**.

## Protocol 1: Automatic Deployment (Recommended)

This is the easiest method. Cloudflare connects to your GitHub repository and automatically builds your site whenever you push code.

### Steps:
1.  **Push your code to GitHub**:
    Ensure your latest changes are pushed to your repository:
    ```bash
    git add .
    git commit -m "Ready for deployment"
    git push origin main
    ```

2.  **Log in to Cloudflare**:
    Go to [dash.cloudflare.com](https://dash.cloudflare.com) and log in.

3.  **Create a New Application**:
    *   Navigate to **Workers & Pages**.
    *   Click **Create application**.
    *   Select the **Pages** tab.
    *   Click **Connect to Git**.

4.  **Configure Project**:
    *   Select your repository (`my-portfolio-`).
    *   **Project Name**: Choose a name (e.g., `yash-portfolio`).
    *   **Production Branch**: `main`.

5.  **Build Settings** (Crucial Step):
    *   **Framework Preset**: Select `Next.js (Static Export)`.
    *   **Build command**: `npm run build`
    *   **Build output directory**: `out`

    > **Note**: Since we configured `output: 'export'` in `next.config.ts`, Next.js will generate a static site in the `out` folder.

6.  **Deploy**:
    Click **Save and Deploy**. Cloudflare will clone, build, and deploy your site.

---

## Protocol 2: Manual Upload (Direct Upload)

If you don't want to connect GitHub, you can build locally and upload the folder.

1.  **Build Locally**:
    Run the following command in your terminal:
    ```bash
    npm run build
    ```
    This will create an `out` directory in your project folder.

2.  **Upload to Cloudflare**:
    *   Go to **Workers & Pages** > **Create application** > **Pages** > **Upload Assets**.
    *   Project Name: `yash-portfolio`.
    *   Drag and drop the `out` folder you just created.
    *   Click **Deploy Site**.

## Troublshooting

*   **Image Issues**: If images are broken, strictly ensure `images: { unoptimized: true }` is present in `next.config.ts`. Cloudflare Pages (Free) typically handles static assets better this way.
*   **Routing Issues**: If reloading a page gives a 404, Cloudflare Pages usually handles this automatically for Next.js exports, but if not, ensure a `_routes.json` isn't misconfigured (usually not needed for basic exports).
