# Hannah Seo — Portfolio migration to GitHub Pages

A first-pass React + Vite recreation of the Framer homepage. This is **not yet the complete portfolio**: About and project-detail pages are placeholders, and thumbnail images are temporary screenshot crops.

## Preview locally

Run `npm install` and `npm run dev`. Open the local address printed in the terminal. Run `npm run build` to check production output.

## Publish to GitHub Pages

1. Create an empty **public** repository at https://github.com/new (for example, `hannah-portfolio`). Do not add a GitHub README or `.gitignore` because this folder already contains them.
2. In a terminal opened to this folder, run:

   ```bash
   git init
   git add .
   git commit -m "Add portfolio website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/hannah-portfolio.git
   git push -u origin main
   ```

   Replace the username and repository name with yours. GitHub may prompt you to sign in.
3. On GitHub, open the repo's **Settings → Pages** and choose **GitHub Actions** under **Build and deployment → Source**.
4. Open the repo's **Actions** tab to monitor the `Deploy portfolio to GitHub Pages` workflow. Once complete, visit `https://YOUR_USERNAME.github.io/hannah-portfolio/` (adjust the repository name).
5. Any future push to `main` automatically rebuilds and publishes your website.

### Notes

- Navigation uses hash paths (`#/about`, `#/projects/...`) because GitHub Pages does not provide custom SPA rewrite rules. This avoids 404 errors when refreshing a subpage.
- `vite.config.js` uses the relative base `./` so CSS/JS/images work on a project subpath and later on a custom domain.
- The deployed footer automatically shows a link to the source GitHub repository, based on the deployment workflow's `VITE_REPO_URL` environment variable. It is absent in the local preview unless you explicitly define the variable.
- Leave the existing Framer domain alone for now. Only point `hannah-seo.com` to GitHub Pages after the replacement is complete and verified. Follow GitHub Pages' **Custom domain** and DNS setup instructions at that point.

## To finish the assignment

- Replace the temporary screenshot thumbnails with originals from Framer.
- Add actual About information, photo, interests, skills, and contact details.
- Recreate complete case-study pages.
- Implement and describe a meaningful AI-assisted improvement, and accurately document AI usage and your own modifications.
- Test on desktop, tablet, and phone.
