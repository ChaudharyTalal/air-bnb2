//core module
const path = require("path")

// Resolve to the project root regardless of runtime (local/serverless)
// On Vercel, __dirname points to /var/task/utils, so we need to go up one level
// For local development, this also works correctly
module.exports = path.join(__dirname, "..");