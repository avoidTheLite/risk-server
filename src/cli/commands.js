#!/usr/bin/env node
import chalk from 'chalk'
import CommandController from './CommandController'

require('yargs/yargs')(process.argv.slice(2))
  .command(['attack [armies attackingCountry defendingCountry]', 'run', 'up'], 'Attach', {}, (argv) => {
    CommandController.Attack(argv.attackingCountry, argv.armies, argv.defendingCountry)
    console.log(chalk, 'Attacking ' + argv.defendingCountry + ' from ' + argv.attackingCountry + ' with ' + argv.armies + ' armies')
  })
  .command({
    command: 'configure <key> [value]',
    aliases: ['config', 'cfg'],
    desc: 'Set a config variable',
    builder: (yargs) => yargs.default('value', 'true'),
    handler: (argv) => {
      console.log(`setting ${argv.key} to ${argv.value}`)
    }
  })
  .demandCommand()
  .help()
  .wrap(72)
  .argv 