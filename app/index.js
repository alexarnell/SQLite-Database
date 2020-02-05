// Alex Arnell
// 01/14/2020
// JS Scrit to connect to database and, based on vaild user credentials, the user can query 
// information from such database.
const sqlite3 = require('sqlite3').verbose();
const prompt = require('prompt-sync')();
const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const router = express.Router();
const bodyParser = require("body-parser");
let db

startDatabase().then((returned) => {
    db = returned
    console.log(db)
})

app.use(require("body-parser").json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.listen(port, () => console.log(`Server running on port: ${port}`))
app.use('/', router);

router.get('/', function (req, res) {
    try {
        res.sendFile(path.join(__dirname + '/index.html'));
    } catch (error) {
        console.log(error)
    }
})

//Make sure that you are in the 'app' folder to run the command 'node app.js'
//to run the script, or just use the proper path.

app.post('/login', function (req, res) {
    console.log("Login post request complete")
    username = req.body.user
    password = req.body.pass
    if (ifAdmin(username, password)) {
        console.log("Sucessful admin Login")
    }
    else {
        console.log("Unsucessful admin Login")
    }
    res.send("Connected to the SQlite database | Enter your SQL commands to execute in sqlite3 |  Type 'exit' to close database")
})


app.post('/command', async (req, res) => {
    console.log("Command post request complete")
    command = req.body.cmd
    let c = command.split(";")
    let result = []
    if (ifAdmin(username, password)) {
        if (command.toUpperCase().startsWith("SELECT")) {

            for (let item of c) {
                let data = await query(item)
                result = result.concat(data)
            }
            console.log(result)
            res.send(result)


        }
        else if (command.toUpperCase() == "EXIT") {
            res.send("Closing the database connection")
            closeDatabase(db)
        }
        else {
            console.log("Unsucessful Query")
            res.send("('An error occurred:', 'Invalid SQL Query, must enter valid SQL command')")
        }

    }
    else {
        console.log("Unsucessful Query, Not ADMIN")
        res.send("('An error occurred:', 'Invalid user, must be admin to Query from Database')")
    }
})

function startDatabase() {
    return new Promise(function (resolve, reject) {
        base = new sqlite3.Database('./test0.db', sqlite3.OPEN_READONLY, (err) => {
            if (err) {
                console.error(err.message);
                reject();
            }
            console.log('Connected to the SQlite database');
            resolve(base);
        });
    });
}

// Dylan Martin
// 01/17/2020
// takes in a string of the query and a database on which to run the query and returns an array of results in JSON format
function query(query) {
    return new Promise((res, rej) => {
        db.all(query, (err, result) => {
            if (err) {
                console.log(err);
                rej(err);
            }
            else {
                console.log("Sucessful Query")
                console.log(result);
                res(result);
            }
        });
    });
}

function closeDatabase(db) {
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Closing the database connection.');
        //process.exit();
    });
}

//Checking based on Input credentials if user is admin
function ifAdmin(user, pass) {
    if (user === "admin") {
        if (pass === "admin") {
            return true
        }
    }
    else {
        return false
    }
}

