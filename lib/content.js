const Repo = require('git-repo-name');
const User = require('git-username');
const inquirer = require('inquirer');
const path = require('path');

const validation = ( value ) => (value.length) ? true : 'Please enter a value.';

const repo = Repo.sync();
const user = User();
const projectName = path.basename(process.cwd());

const defaultValues = {
  year: (new Date()).getFullYear()
};

const questions = [
  {
    type: 'input',
    name: 'user',
    message: 'Github username:',
    default: user,
    validate: validation
  },
  {
    type: 'input',
    name: 'repo',
    message: 'Slug:',
    default: repo,
    validate: validation
  },
  {
    type: 'input',
    name: 'projectName',
    message: 'Project name:',
    default: projectName,
    validate: validation
  },
  {
    type: 'input',
    name: 'shortDescription',
    message: 'Short description:'
  },
  {
    type: 'input',
    name: 'longDescription',
    message: 'Long description:'
  },
  {
    type: 'list',
    name: 'license',
    message: 'License:',
    choices: [ 'None', 'MIT' ],
    default: 'None'
  },
  {
    type: 'list',
    name: 'language',
    message: 'Language:',
    choices: [ 'Python', 'R', 'Ruby', 'Javascript', 'None' ],
    default: 'None'
  }
];

module.exports = {
  ask: async () => {
    const answers = await inquirer.prompt(questions);
    const content = Object.assign(defaultValues, answers);
    return content;
  }
};
