import express from 'express'
import fs from 'node:fs/promises'
import path from 'node:path'

const app = express()
const PORT = 3001
const DATA_FILE = path.resolve('subscribers.json')

app.use(express.json())

const readSubscribers = async () => {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8')
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      return []
    }
    throw error
  }
}

const writeSubscribers = async (subscribers) => {
  await fs.writeFile(DATA_FILE, `${JSON.stringify(subscribers, null, 2)}\n`, 'utf-8')
}

app.post('/api/subscribe', async (req, res) => {
  try {
    const email = String(req.body?.email ?? '').trim().toLowerCase()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' })
    }

    const subscribers = await readSubscribers()
    if (subscribers.includes(email)) {
      return res.status(409).json({ error: 'Email already subscribed.' })
    }

    subscribers.push(email)
    await writeSubscribers(subscribers)

    return res.status(201).json({ ok: true, email })
  } catch (error) {
    console.error('Failed to store subscriber:', error)
    return res.status(500).json({ error: 'Internal server error.' })
  }
})

app.listen(PORT, () => {
  console.log(`Subscription API running on http://localhost:${PORT}`)
})
