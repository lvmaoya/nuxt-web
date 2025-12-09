const fs = require('fs')

function bumpPatch(version) {
  const parts = (version || '0.0.0').split('.')
  const major = parseInt(parts[0] || '0', 10)
  const minor = parseInt(parts[1] || '0', 10)
  const patch = parseInt(parts[2] || '0', 10) + 1
  return `${major}.${minor}.${patch}`
}

try {
  const pkgPath = 'package.json'
  const raw = fs.readFileSync(pkgPath, 'utf8')
  const pkg = JSON.parse(raw)
  const oldVersion = pkg.version
  const newVersion = bumpPatch(oldVersion)
  pkg.version = newVersion
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8')
  console.log(`[Version] Bumped: ${oldVersion} -> ${newVersion}`)
} catch (e) {
  console.error('[Version] Bump failed:', e?.message || e)
  process.exitCode = 0
}
