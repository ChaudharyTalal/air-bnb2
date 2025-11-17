const fs = require('fs')
const path = require('path')

const repoRoot = path.join(__dirname, '..')
const apiRoot = path.join(__dirname, '..', '..')

function resolveRoot() {
  const repoDataFile = path.join(repoRoot, 'data', 'homes.json')
  if (fs.existsSync(repoDataFile)) {
    return repoRoot
  }

  const apiDataFile = path.join(apiRoot, 'data', 'homes.json')
  if (fs.existsSync(apiDataFile)) {
    return apiRoot
  }

  return repoRoot
}

module.exports = resolveRoot()