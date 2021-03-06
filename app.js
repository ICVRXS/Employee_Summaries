const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const employees = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//Questions user on their role in the company as well as their name, id #, and email
const role = [
    {
    type: "list",
    message: "What is your role in the company?",
    choices: ["Manager", "Engineer", "Intern"],
    name: "userRole"
    },
    {
    type: "input",
    message: "What is your name?",
    name: "userName"
    },
    {
    type: "input",
    message: "What is your id number?",
    name: "userId"
    },
    {
    type: "input",
    message: "What is your email address?",
    name: "userEmail"
    }
]

//Question specific to managers
const managerQuestions = [
    {
    type: "input",
    message: "What is your office number?",
    name: "officeNumber"
    }
]

//Question specific to engineers
const engineerQuestions = [
    {
    type: "input",
    message: "What is your GitHub name?",
    name: "githubName"
    }
]

//Question specific to interns
const internQuestions = [
    {
    type: "input",
    message: "What school do you go to?",
    name: "internSchool"
    }
]

//Runs inquirer, asks additional question based on user's role in the company
inquirer.prompt(role).then((response)=>{
    console.log(response);
    if(response.userRole === "Manager"){
        console.log("You Are a Manager");
        inquirer.prompt(managerQuestions).then((response)=>{
            console.log(response);
        });
    }
    if(response.userRole === "Engineer"){
        console.log("You are an Engineer");
        inquirer.prompt(engineerQuestions).then(({userName, userId, userEmail, githubName})=>{
            console.log(response);
            employees.push(new Engineer(response.userName, response.userId, response.userEmail, githubName));
            console.log(employees);
        });
    }
    if(response.userRole === "Intern"){
        console.log("You are an Intern");
        inquirer.prompt(internQuestions).then(({userName, userId, userEmail, internSchool})=>{
            console.log(response);
            employees.push(new Intern(response.userName, response.userId, response.userEmail, internSchool));
            console.log(employees);
        });
    }
});

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```