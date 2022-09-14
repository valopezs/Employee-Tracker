const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

// Connect to mysql database
const db = mysql.createConnection ({
    host: "localhost",
    user: "root",
    password: "password",
    database: "employee",
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    purpose();
});

// Start application

const purpose = () => {
    return inquirer
    .prompt ([
        {
            type: "list",
            name: "purpose",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role",
                "EXIT",
            ],
        },
    ])
    .then((data) => {
        if (data.purpose === "View all departments") {
            viewDept();
        } else if (data.purpose === "View all roles") {
            viewRole();
        } else if (data.purpose === "View all employees") {
            viewEmployee();
        } else if (data.purpose === "Add a department") {
            addDept();
        } else if (data.purpose === "Add a role") {
            addRole();
        } else if (data.purpose === "Add an employee") {
            addEmployee();
        } else if (data.purpose === "Update an employee role") {
            updateRole();
        } else if (data.purpose === "EXIT") {
            db.end();
            console.log("See you later! Exiting app...");
        }
    });
};

// View all departments selection
const viewDept = () => {
    db.query(`SELECT * FROM departments;`, (err, data) => {
        if (err) throw err;
        console.table(data);
        purpose();
    });
};

// View all roles selection
const viewRole = () => {
    db.query(`SELECT roles.role_id, roles.title, departments.name
        AS department, roles.salary
        FROM roles
        INNER JOIN departments
        ON roles.dept_id = department.dept_id;`,
        (err, data) => {
            if (err) throw err;
            console.table (data);
            purpose();
        });
};

// View all employees selection
const viewEmployee = () => {
    db.query(` SELECT employees.emploee_id, employees.first_name, employees.last_name, roles.title, departments.name
        AS department, roles.salary, CONCAT(managers.first_name, " " managers.last_name) AS manager
        FROM roles
        INNER JOIN employees
        ON roles.role_id = employees.role_id
        INNER JOIN departments
        ON roles.dept_id = departments.dept_id
        LEFT JOIN employees managers
        ON managers.employee_id = employees.manager_id
        ORDER BY employee_id;`,
        (err, data) => {
            if (err) throw err;
            console.table (data);
            purpose();
        });
};

// Add a new department selection
const addDept = () => {
    return inquirer
    .prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of the department you'd like to add?",
        },
    ])
    .then((answer) => {
        db.query(`INSERT INTO departments (name)
            VALUES ("${answer.name}");`,
            (err, data) => {
                if (err) throw err;
            });
            console.log("Added", `${answer.name}`, "to the database");
            purpose();
    });
};