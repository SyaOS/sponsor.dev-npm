# sponsor.dev

Sponsor.dev for npm.

## Getting started

There are 2 ways to add sponsor.dev to your package:

### Install as dependency

Run `npm install --save sponsor.dev` or `yarn add sponsor.dev`, and put

    "scripts": {
      "install": "sponsor.dev"
    }

or

    "scripts": {
      "postinstall": "sponsor.dev"
    }

into `package.json` of your package.

### Directly call with `npx`

If you are sure that your customers are all using `node>5.2.0` with `npx`,
you could just add

    "scripts": {
      "install": "npx sponsor.dev"
    }

or

    "scripts": {
      "postinstall": "npx sponsor.dev"
    }

without any additional dependencies.

## For package user: disable Sponsor.dev

Sponsor.dev will be automatically disabled in CI environment, if you want to
totally disable sponsor.dev notifications, add `SPONSOR_DEV_DISABLED=1` to your
environment variables, and sponsor.dev notifications won't be appeared in your console.
