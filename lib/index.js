#!/usr/bin/env node
const fs       = require('fs');
const ct       = require('./content');
const chalk    = require('chalk');
const figlet   = require('figlet');
const mustache = require('mustache');

const render = (content, input, output) => {
  const template = fs.readFileSync(input, 'utf-8');
  const rendered_content = mustache.render(template, content);
  fs.writeFileSync(output, rendered_content, 'utf-8');
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
  content.has_license = (content.license !== 'None')

  // Write README
  render(content, './readme_template.md', './rendered.md');

  // Write LICENSE
  render(content, './license_template.md', './LICENSE.md');
};

main();
