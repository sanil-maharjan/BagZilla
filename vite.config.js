import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Read .local.env manually to securely get Khalti keys
let khaltiSecretKey = ''
let khaltiPublicKey = ''
try {
  const envPath = path.resolve(__dirname, '.local.env')
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8')
    const secretMatch = envContent.match(/khalti_merchant_live_secret_key\s*=\s*["']?([^"'\r\n]+)["']?/)
    const publicMatch = envContent.match(/khalti_merchant_live_public_key\s*=\s*["']?([^"'\r\n]+)["']?/)
    if (secretMatch) khaltiSecretKey = secretMatch[1].trim()
    if (publicMatch) khaltiPublicKey = publicMatch[1].trim()
  }
} catch (e) {
  console.error('Error reading .local.env:', e)
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/khalti': {
        target: 'https://a.khalti.com/api/v2',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/khalti/, ''),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            if (khaltiSecretKey) {
              proxyReq.setHeader('Authorization', `Key ${khaltiSecretKey}`)
            }
          })
        }
      },
      '/api/esewa': {
        target: 'https://rc-epay.esewa.com.np/api/epay',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/esewa/, '')
      }
    }
  }
})

