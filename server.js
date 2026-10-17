const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Create an in-memory SQLite database
const db = new sqlite3.Database(':memory:');

// Create a table to store movie and theatre information
db.serialize(() => {
    db.run("CREATE TABLE movie_theatre_info (id INTEGER PRIMARY KEY AUTOINCREMENT, movie_name TEXT, theatre_name TEXT)");
});

app.post('/storeInfo', (req, res) => {
    const { movieName, theatreName } = req.body;

    db.run("INSERT INTO movie_theatre_info (movie_name, theatre_name) VALUES (?, ?)", [movieName, theatreName], function(err) {
        if (err) {
            return res.status(500).json({ message: 'Failed to store information.' });
        }
        res.json({ message: 'Information stored successfully.' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
