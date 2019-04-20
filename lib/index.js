#!/usr/bin/env node
const fs         = require('fs');
const path       = require('path');
const ct         = require('./content');
const chalk      = require('chalk');
const figlet     = require('figlet');
const Handlebars = require('handlebars');

const templatePath = (filename) => path.join(__dirname, '..', 'templates', `${filename}`);
const relativePath = (filename) => path.join('.', `${filename}`);

const render = (content, input, output) => {
  const template = fs.readFileSync(templatePath(input), 'utf-8');
  var compiler = Handlebars.compile(template);
  const rendered_content = compiler(content);
  fs.writeFileSync(relativePath(output), rendered_content, 'utf-8');
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
  render(content, 'readme_template.md', 'README');
  console.log('README.md created!')

  // Write LICENSE
  if (content.license !== undefined) {
    const license_template = `${content.license.replace(/\s+/g, '_')}_license_template`;
    render(content, license_template, 'LICENSE');
    console.log('LICENSE created!')
  }
};

main();
