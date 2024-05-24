const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors') //cors was req due to port


const app = express();
const PORT = process.env.PORT || 3000;

// establish connectiong
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// checks for mysql that is running
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

// contacting mysql to input data
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

    // inserts infor into mysql
    connection.query('INSERT INTO employees SET ?', employee, (err) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).send('Error inserting data');
        }
        console.log('1 record inserted'); // terminal command tell us 1 user added
        res.send('Employee added successfully'); 
    });
});

// Login function to check if user exists
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