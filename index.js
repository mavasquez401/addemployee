
const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL Server!');
});

// Middleware to parse request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});





function storeData(event) {
  event.preventDefault(); // Prevent the default form submission
  
  let fname = document.getElementById('fname').value;
  let lname = document.getElementById('lname').value;
  let dept = document.getElementById('dept').value;
  let salary = document.getElementById('salary').value
  let jobTitle = document.getElementById('jobTitle').value
  let hireDate = document.getElementById('hireDate').value
  let endDate = document.getElementById('endDate').value
  let statusUpdate = document.getElementById('status');
  
  const employee = {
    FirstName: fname,
    LastName: lname,
    Department: dept,
    JobTitle: jobTitle,
    StartDate: hireDate,
    EndDate: endDate,
    Salary: salary
  };
  
  if (employee) {
    console.log(employee);
    statusUpdate.innerHTML = '<p style="color:green">Saved</p>';
  }
}

// app.get('/', function (req, res) {
//   // res.send('Hello Geeks!')  
//   // instead of hello geeks, res.send index.html
//   const { FirstName, LastName, Department, JobTitle, StartDate, EndDate, Salary } = employee;
//   connection.query(`INSERT INTO ${process.env.DB_TABLE_NAME} SET ?`, { FirstName, LastName, Department, JobTitle, StartDate, EndDate, Salary }, err => {
//     if (err) throw err;
//     console.log('1 record inserted');
//     res.send('Employee added successfully');
    
//     // res.redirect('/listemployee'); // Redirect to list employees after adding
//   });
// })

// Endpoint to handle form submissions
app.post('/addemployee', (req, res) => {
    const { fname, lname, dept, salary, jobTitle, hireDate, endDate } = req.body;
    const employee = {
        FirstName: fname,
        LastName: lname,
        Department: dept,
        JobTitle: jobTitle,
        StartDate: hireDate,
        EndDate: endDate,
        Salary: salary
    };

    connection.query('INSERT INTO employees SET ?', employee, (err) => {
        if (err) {
            console.error('Error inserting data: ', err);
            return res.status(500).send('Error inserting data');
        }
        console.log('1 record inserted');
        res.send('Employee added successfully');
    });
  });
  // app.post('/addemployee', (req, res) => {
    //   const { FirstName, LastName, Department, JobTitle, StartDate, EndDate, Salary } = employee;
    //   connection.query('INSERT INTO employees SET ?', { FirstName, LastName, Department, JobTitle, StartDate, EndDate, Salary }, err => {
      //       if (err) throw err;
      //       console.log('1 record inserted');
      //       res.send('Employee added successfully');
      
      //       // res.redirect('/listemployee'); // Redirect to list employees after adding
      //   });
      // });
      
      
      app.listen(PORT, () => {
        console.log(`Node.js server running at http://localhost:${PORT}`);
      });
      
      
//       app.listen(PORT, () => {
//         console.log(`Node.js server running at http://localhost:${PORT}`);
//   console.log(`add user to database at http://localhost:${PORT}/addemployee`);
// })