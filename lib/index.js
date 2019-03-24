#!/usr/bin/env node
const fs         = require('fs');
const ct         = require('./content');
const chalk      = require('chalk');
const figlet     = require('figlet');
const Handlebars = require('handlebars');

const path = (filename, isTemplate = false) => {
  return `./${(isTemplate)? 'templates/' : '' }${filename}.md`;
};

const render = (content, input, output) => {
  const template = fs.readFileSync(path(input, true), 'utf-8');
  var compiler = Handlebars.compile(template);
  const rendered_content = compiler(content);
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
  render(content, 'readme_template', 'README');
  console.log('README.md created!')

  // Write LICENSE
  if (content.license !== undefined) {
    const license_template = `${content.license.replace(/\s+/g, '_')}_license_template`;
    render(content, license_template, 'LICENSE');
    console.log('LICENSE.md created!')
  }
};

main();
