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
    name: 'author',
    message: 'Name of the author:',
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
    choices: [ 'None', 'MIT', 'GNU GPLv3' ],
    default: 'None',
    filter: (value) => (value == 'None')? undefined: value.replace(/\s+/g, '_')
  },
  {
    type: 'list',
    name: 'language',
    message: 'Language:',
    choices: [ 'Python', 'R', 'Ruby', 'Javascript', 'None' ],
    default: 'None',
    filter: (value) => (value == 'None')? undefined: value.toLowerCase()
  }
];

module.exports = {
  ask: async () => {
    const answers = await inquirer.prompt(questions);
    const content = Object.assign(defaultValues, answers);
    content.has_license = (content.license !== undefined);
    return content;
  }
};
