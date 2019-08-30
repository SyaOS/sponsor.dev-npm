const { default: fetch } = require('node-fetch')
const { default: chalk } = require('chalk')
const { table } = require('table')
const debug = require('debug')('sponsor.dev')

module.exports = async () => {
  const ci = Boolean(process.env.CI)
  const disabled = Boolean(process.env.SPONSOR_DEV_DISABLED)

  try {
    if (ci || disabled) {
      return debug('Sponsor.dev is disabled, exit.')
    }

    const name = process.env.npm_package_name
    debug('Got npm_package_name: %s', name)
    if (!name) {
      throw Error('Invalid package name.')
    }

    const remote = process.env.SPONSOR_DEV_REMOTE || 'https://sponsor.dev'
    debug('Remote: %s', remote)

    const url = new URL(`/api/npm/${name}`, remote)
    const response = await fetch(url)

    if (response.status === 200) {
      const { sponsors } = await response.json()
      const data = [[chalk.bold(`${name} is sponsored by`)]]
      for (const { title, href } of sponsors) {
        const lines = []
        if (title) lines.push(title)
        if (href) lines.push(chalk.blue.underline(href))
        data.push([lines.join('\n')])
      }
      console.log(table(data))
    } else if (response.status === 404) {
      const data = [[chalk.bold(`${name} is looking for sponsors`)]]
      data.push([chalk.blue.underline(`${remote}/npm/${name}`)])
      console.log(table(data))
    } else {
      throw Error(`HTTP ${response.status} ${response.statusText}`)
    }
  } catch (error) {
    debug(error.stack)
  }
}
