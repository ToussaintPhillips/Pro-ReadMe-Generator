const fs = require("fs");
const inquirer = require("inquirer");

function generateReadme(answers) {
  // generate license badge 
  const licenseBadgeURL = generateLicenseBadgeURL(answers.license);

  return `
# ${answers.title}

## Description
${answers.description}

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
${answers.installation}

## Usage
${answers.usage}

## License
![License](${licenseBadgeURL})

${generateLicenseNotice(answers.license)}

## Contributing
${answers.contributing}

## Tests
${answers.tests}

## Questions
For any questions or feedback, feel free to reach out:
- GitHub: [${answers.github}](https://github.com/${answers.github})
- Email: ${answers.email}
`;
}

// function to generate license 
function generateLicenseBadgeURL(license) {

  switch (license) {
    case "MIT":
      return "https://img.shields.io/badge/License-MIT-yellow.svg";
    case "Apache":
      return "https://img.shields.io/badge/License-Apache%202.0-blue.svg";
    case "GPL":
      return "https://img.shields.io/badge/License-GPLv3-blue.svg";
    case "BSD":
      return "https://img.shields.io/badge/License-BSD%203--Clause-blue.svg";
    default:
      return "";
  }
}

// function to generate license notification
function generateLicenseNotice(license) {

  switch (license) {
    case "MIT":
      return "This project is licensed under the MIT License.";
    case "Apache":
      return "This project is licensed under the Apache License 2.0.";
    case "GPL":
      return "This project is licensed under the GNU General Public License v3.0.";
    case "BSD":
      return "This project is licensed under the BSD 3-Clause License.";
    default:
      return "";
  }
}

// array of questions for user 
const questions = [
  {
    type: "input",
    name: "title",
    message: "What is the title of your project?",
  },
  {
    type: "input",
    name: "description",
    message: "Enter a description of your project:",
  },
  {
    type: "input",
    name: "installation",
    message: "Enter installation instructions:",
  },
  {
    type: "input",
    name: "usage",
    message: "Enter usage information:",
  },
  {
    type: "list",
    name: "license",
    message: "Choose a license for your project:",
    choices: ["MIT", "Apache", "GPL", "BSD"],
  },
  {
    type: "input",
    name: "contributing",
    message: "Enter contribution guidelines:",
  },
  {
    type: "input",
    name: "tests",
    message: "Enter test instructions:",
  },
  {
    type: "input",
    name: "github",
    message: "Enter your GitHub username:",
  },
  {
    type: "input",
    name: "email",
    message: "Enter your email address:",
  },
];

// function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) =>
    err ? console.error(err) : console.log("README.md generated successfully!")
  );
}

// function to initialize program
function init() {
  inquirer.prompt(questions).then((answers) => {
    const readmeContent = generateReadme(answers);
    writeToFile("README.md", readmeContent);
  });
}

// initialize the program
init();
