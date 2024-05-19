// const express = require('express')
// const app = express()
// const mysql = require('mysql');

// dotenv
// require('dotenv').config()
// const doxname = process.env.SECRET_USER
// const PORT = process.env.PORT
// console.log(doxname);

// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER, 
//     password:  process.env.DB_PASSWORD, 
//     database:  process.env.DB_NAME, 
//     tableName:  process.env.DB_TABLE_NAME,
// });

// connection.connect(err => {
//     if (err) throw err;
//     console.log('Connected to MySQL Server!');
// });

// let salary = document.getElementById('salary').value
// let jobTitle = document.getElementById('jobTitle').value
// let hireDate = document.getElementById('hireDate').value
// let endDate = document.getElementById('endDate').value
// fname = 'gamby'



storeData = () => {
  let fname = document.getElementById('fname').value
  let lname = document.getElementById('lname').value
  let dept = document.getElementById('dept').value
  event.preventdefault()
  const employee = {
    FirstName: fname,
    LastName: lname,
    Department: dept,
    // JobTitle: jobTitle,
    // StartDate: hireDate,
    // EndDate: endDate,
    // Salary: salary
  };
  if (employee) {
    console.log(employee)
  }
}

// app.get('/', function (req, res) {
//   // res.send('Hello Geeks!')  
//   // instead of hello geeks, res.send index.html
//   const { FirstName, LastName, Department, JobTitle, StartDate, EndDate, Salary } = employee;
//   connection.query(`INSERT INTO ${process.env.DB_TABLE_NAME} SET ?`, { FirstName, LastName, Department, JobTitle, StartDate, EndDate, Salary }, err => {
//       if (err) throw err;
//       console.log('1 record inserted');
//       res.send('Employee added successfully');
      
//       // res.redirect('/listemployee'); // Redirect to list employees after adding
//   });
// })

// app.post('/addemployee', (req, res) => {
//   const { FirstName, LastName, Department, JobTitle, StartDate, EndDate, Salary } = employee;
//   connection.query('INSERT INTO employees SET ?', { FirstName, LastName, Department, JobTitle, StartDate, EndDate, Salary }, err => {
//       if (err) throw err;
//       console.log('1 record inserted');
//       res.send('Employee added successfully');
      
//       // res.redirect('/listemployee'); // Redirect to list employees after adding
//   });
// });




// app.listen(PORT, () => {
//   console.log(`Node.js server running at http://localhost:${PORT}`);
//   console.log(`add user to database at http://localhost:${PORT}/addemployee`);
// })