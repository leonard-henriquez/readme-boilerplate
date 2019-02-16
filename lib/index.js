#!/usr/bin/env node
const fs       = require('fs');
const ct       = require('./content');
const chalk    = require('chalk');
const figlet   = require('figlet');
const mustache = require('mustache');

const path = (filename, isTemplate = false) => {
  return `./${(isTemplate)? 'templates/' : '' }${filename}.md`;
};

const render = (content, input, output) => {
  const template = fs.readFileSync(path(input, true), 'utf-8');
  const rendered_content = mustache.render(template, content);
  fs.writeFileSync(path(output), rendered_content, 'utf-8');
};

const main = async () => {
  // Welcome message
  console.clear();
  console.log(
    chalk.yellow(
      figlet.textSync('README Gen', { horizontalLayout: 'full' })
    )
  );

  // Get infos for filling content
  const content = await ct.ask();

  // Write README
  render(content, 'readme_template', 'rendered');

  // Write LICENSE
  if (content.license !== undefined) {
    render(content, content.license + '_license_template', './LICENSE');
  }
};

main();
