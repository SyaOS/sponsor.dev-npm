#!/usr/bin/env node

try {
  require('./index')()
} catch (error) {
  process.exit(0)
}
