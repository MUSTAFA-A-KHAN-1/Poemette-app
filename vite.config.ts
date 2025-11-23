import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Get the repository name from the homepage field in package.json
// In the gh-pages environment, the app is hosted under a subdirectory.
const repoName = 'Poemette-app'; // <-- Ensure this matches your GitHub repo name!

export default defineConfig({
  base: `/${repoName}/`, // Set the base public path for assets
  plugins: [react()],
});