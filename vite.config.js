import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isGitHubActions = process.env.GITHUB_ACTIONS === 'true'
const repoBase = '/pannu-holistic/'

export default defineConfig({
  plugins: [react()],
  base: isGitHubActions ? repoBase : '/',
})
