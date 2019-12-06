const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const download = require('download-git-repo');

console.log(chalk.green.hex('#f00').bold('success001'));
console.log(chalk('success'));
let spinner = ora('download template ...');
spinner.start();
// setTimeout(() => {
//   spinner.color = 'yellow';
//   spinner.text = 'Loading rainbows';
//   spinner.succeed('ok');
//   spinner.fail('fail');
// }, 1000);

download('github:ControlZi/hello-world#master', './template', function(err) {
  if (err) {
    console.log('err: ', err);
    spinner.fail('fail');
  } else {
    spinner.succeed('ok');
  }
});

/*
program
  .version('1.0.0')
  .option('-d --debug', 'output extra dubugging')
  .option('-s --small', 'small pizza size')
  .option('-p --pizza-type <type>', 'flavour of pizza');

program
  .command('setup [env]')
  .description('run setup commands for all envs')
  .option('-s, --setup_mode [mode]', 'Which setup mode to use')
  .action(function(env, options) {
    const mode = options.setup_mode || 'normal';
    env = env || 'all';
    console.log('setup for %s env(s) with %s mode', env, mode);
  });

program.command('*').action(function(env) {
  console.log('deploying "%s"', env);
});

program.parse(process.argv);
*/

/*
console.log('Hi, welcome to Node Pizza');

let questions = [
  {
    type: 'confirm',
    name: 'toBeDelivered',
    message: 'Is this for delivery?',
    default: false
  },
  {
    type: 'input',
    name: 'phone',
    message: "What's your phone number?",
    validate: function(value) {
      var pass = value.match(/^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i);
      if (pass) {
        return true;
      }

      return 'Please enter a valid phone number';
    }
  },
  {
    type: 'list',
    name: 'size',
    message: 'What size do you need?',
    choices: ['Large', 'Medium', 'Small'],
    filter: function(val) {
      return val.toLowerCase();
    }
  },
  {
    type: 'input',
    name: 'quantity',
    message: 'How many do you need?',
    validate: function(value) {
      var valid = !isNaN(parseFloat(value));
      return valid || 'Please enter a number';
    },
    filter: Number
  },
  {
    type: 'expand',
    name: 'toppings',
    message: 'What about the toppings?',
    choices: [
      {
        key: 'p',
        name: 'Pepperoni and cheese',
        value: 'PepperoniCheese'
      },
      {
        key: 'a',
        name: 'All dressed',
        value: 'alldressed'
      },
      {
        key: 'w',
        name: 'Hawaiian',
        value: 'hawaiian'
      }
    ]
  },
  {
    type: 'rawlist',
    name: 'beverage',
    message: 'You also get a free 2L beverage',
    choices: ['Pepsi', '7up', 'Coke']
  },
  {
    type: 'input',
    name: 'comments',
    message: 'Any comments on your purchase experience?',
    default: 'Nope, all good!'
  },
  {
    type: 'list',
    name: 'prize',
    message: 'For leaving a comment, you get a freebie',
    choices: ['cake', 'fries'],
    when: function(answers) {
      return answers.comments !== 'Nope, all good!';
    }
  }
];

inquirer.prompt(questions).then(answers => {
  console.log('\nOrder receipt:');
  console.log(JSON.stringify(answers, null, '  '));
});
*/
