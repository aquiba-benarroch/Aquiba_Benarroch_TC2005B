//Importing express library
import express from 'express';

import fs from 'fs';

//Creating an express application
const app = express();

//Setting up the port
const port = 3000;

//Use the express.json() middleware to parse the request body
app.use(express.json());

app.get('/', (req, res) => {
    fs.readFile('./html/home.html', 'utf8', (err, html) => {
        if (err) {
            res.status(500).send('There was an error: ' + err)
            return
        }

        console.log("Sending page...")
        res.send(html)
        console.log("Page sent!")
    })
});

app.get('/person', (req, res) => {
    console.log("hello server!")

    const person = {
        name: "Aquiba Benarroch",
        email: "A01783710@tec.mx",
        message: "Hello World from server!"
    }

    res.json(person)
});

//Starting the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});