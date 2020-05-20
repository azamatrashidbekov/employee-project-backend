const express = require('express');
var cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
Employees = require('./models/employees.js');
// Connext to Mongoose
mongoose.connect('mongodb://localhost/employees',
  { useNewUrlParser: true, useUnifiedTopology: true  } );
const db = mongoose.connection;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World with nodemon');
});

app.get('/api/employees', (req, res) => { // localhost:8000/api/employees
    // Employees.getEmployees((err, employees) => {
    //     if (err) {
    //         throw err;
    //     }
    //     res.json(employees);
    // })
    Employees.find({}, function(err, data) {
        if (err) {
            throw err;
        }
        res.json(data)
    });
})

app.get('/api/employee/:id', (req, res) => {
    Employees.getEmployeeById(req.params.id,(err, employee) => {
        if (err) {
            throw err;
        }
        res.json(employee);
    })
});

app.post('/api/employees', (req, res) => {
    const employee = req.body;
    Employees.createEmployee(employee,(err, employee) => {
        if (err) {
            throw err;
        }
        res.json(employee);
    })
});


app.put('/api/employee/:id', (req, res) => {
    const id = req.params.id;
    const employee = req.body;
    Employees.updateEmployee(id, employee, {}, (err, employee) => {
        if (err) {
            throw err;
        }
        res.json(employee);
    })
})

app.delete('/api/employee/:id', (req, res) => {
    const id = req.params.id;
    console.log('id-------', id)
    Employees.deleteEmployee(id, {}, (err, employee) => {
        if (err) {
            throw err;
        }
        res.json(employee);
    })
})

app.listen(5000, console.log('Running on port 5000...'));

