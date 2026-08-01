import { readdir, rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const optimized = path.join(dist, 'optimized')
const rasterExtensions = new Set(['.jpg', '.jpeg', '.png'])

async function prune(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      if (target !== optimized) await prune(target)
      continue
    }

    if (rasterExtensions.has(path.extname(entry.name).toLowerCase())) {
      await rm(target)
    }
  }
}

await prune(dist)
