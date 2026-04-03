import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3000
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000'

// Proxy /api/* to Django backend
app.use(
  '/api',
  createProxyMiddleware({
    target: BACKEND_URL,
    changeOrigin: true,
  })
)

// Serve static build output
app.use(express.static(path.join(__dirname, 'dist')))

// SPA fallback — return index.html for all non-asset routes
app.get('/{*path}', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}, proxying /api to ${BACKEND_URL}`)
})
