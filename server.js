
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handle user registration
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password], (err) => {
        if (err) {
            console.error('Error inserting user:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log('User registered successfully.');
            res.status(200).json({ message: 'User registered successfully.' });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
