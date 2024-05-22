
// const mysql = require('mysql2')
// const express = require('express')
// const bodyParser = require('body-parser')
// require('dotenv').config()

// const app = express()
// const PORT = process.env.PORT || 3000

// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// })

// connection.connect(err => {
//     if (err) throw err
//     console.log('Connected to MySQL Server!')
// });

// // Middleware to parse request bodies
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }))

// // Serve the HTML file
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html')
// });

// // function storeData(event) {
// //   event.preventDefault(); // Prevent the default form submission
  
// //   let fname = document.getElementById('fname').value;
// //   let lname = document.getElementById('lname').value;
// //   let dept = document.getElementById('dept').value;
// //   let salary = document.getElementById('salary').value
// //   let jobTitle = document.getElementById('jobTitle').value
// //   let hireDate = document.getElementById('hireDate').value
// //   let endDate = document.getElementById('endDate').value
// //   let statusUpdate = document.getElementById('status')
// //   let Username = document.getElementById('Username').value
// //   let Password = document.getElementById('Password').value

// //   const employee = {
// //     FirstName: fname,
// //     LastName: lname,
// //     Department: dept,
// //     JobTitle: jobTitle,
// //     StartDate: hireDate,
// //     EndDate: endDate,
// //     Salary: salary,
// //     Username: Username,
// //     Password: Password

// //   };
  
// //   if (employee) {
// //     console.log(employee)
// //     statusUpdate.innerHTML = '<p style="color:green">Saved</p>'
// //   }
// // }

// // Endpoint to handle form submissions
// app.post('/addemployee', (req, res) => {
//     const { fname, lname, dept, salary, jobTitle, hireDate, endDate, Username, Password } = req.body;
//     const employee = {
//         FirstName: fname,
//         LastName: lname,
//         Department: dept,
//         JobTitle: jobTitle,
//         StartDate: hireDate,
//         EndDate: endDate,
//         Salary: salary,
//         Username: Username,
//         Password: Password
//     }

//     connection.query('INSERT INTO employees SET ?', employee, (err) => {
//         if (err) {
//             console.error('Error inserting data: ', err)
//             return res.status(500).send('Error inserting data')
//         }
//         console.log('1 record inserted')
//         res.send('Employee added successfully')
//     })
//   })
      
//   app.post('/login', (req, res) => {
//     const { username, password } = req.body
//     console.log(`Login attempt with username: ${username} and password: ${password}`); // Debugging log

//     connection.query('SELECT * FROM employees WHERE Username = ? AND Password = ?', [username, password], (err, results) =>{
//       if (err) {
//         console.error('Error during login query:', err);
//         return res.status(500).json({ success: false, message: 'Database error' });
//       }
//       console.log('Login query results:', results);

//       if (results.length > 0) {
//         res.json({ success: true})
//       } else {
//         res.json({ success: false,  message: 'Invalid username or password' })
//       }
//     })
//   })

//       app.listen(PORT, () => {
//         console.log(`Node.js server running at http://localhost:${PORT}`)
//       })


const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors') //cors was req due to port

const app = express();
const PORT = process.env.PORT || 3000;


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL Server!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/addemployee', (req, res) => {
    const { fname, lname, dept, salary, jobTitle, hireDate, endDate, username, password } = req.body;
    const employee = {
        FirstName: fname,
        LastName: lname,
        Department: dept,
        JobTitle: jobTitle,
        StartDate: hireDate,
        EndDate: endDate,
        Salary: salary,
        Username: username,
        Password: password
    };

    console.log('Adding employee:', employee); // Debugging log

    connection.query('INSERT INTO employees SET ?', employee, (err) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).send('Error inserting data');
        }
        console.log('1 record inserted');
        res.send('Employee added successfully');
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(`Login attempt with username: ${username} and password: ${password}`); // Debugging log

    connection.query('SELECT * FROM employees WHERE Username = ? AND Password = ?', [username, password], (err, results) => {
        if (err) {
            console.error('Error during login query:', err);
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        console.log('Login query results:', results); // Debugging log

        if (results.length > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: 'Invalid username or password' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Node.js server running at http://localhost:${PORT}`);
});