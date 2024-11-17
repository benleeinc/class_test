const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Preloaded Credentials (ID: Password)
let credentials = [
    { id: 'aadi40440', password: '40440', used: false },
    { id: 'aadi34982', password: '34982', used: false },
    { id: 'adan42582', password: '42582', used: false },
    { id: 'ajay78108', password: '78108', used: false },
    { id: 'albi34184', password: '34184', used: false },
    { id: 'asla78053', password: '78053', used: false },
    { id: 'ayus34122', password: '34122', used: false },
    { id: 'benb33920', password: '33920', used: false },
    { id: 'admin911', password: '44505', used: false }, // Admin Credential
    { id: 'chri77278', password: '77278', used: false },
    { id: 'chri35931', password: '35931', used: false },
    { id: 'eyon40445', password: '40445', used: false },
    { id: 'isha35873', password: '35873', used: false },
    { id: 'jeev76260', password: '76260', used: false },
    { id: 'mehu34306', password: '34306', used: false },
    { id: 'moha77866', password: '77866', used: false },
    { id: 'moha78021', password: '78021', used: false },
    { id: 'mirz78182', password: '78182', used: false },
    { id: 'muha77615', password: '77615', used: false },
    { id: 'naku42568', password: '42568', used: false },
    { id: 'nath34035', password: '34035', used: false },
    { id: 'pran34049', password: '34049', used: false },
    { id: 'razi40448', password: '40448', used: false },
    { id: 'rohi34074', password: '34074', used: false },
    { id: 'rube45192', password: '45192', used: false },
    { id: 'sanj77764', password: '77764', used: false },
    { id: 'sena77784', password: '77784', used: false },
    { id: 'vidh76735', password: '76735', used: false },
    { id: 'yath34604', password: '34604', used: false },
    { id: 'zaee76754', password: '76754', used: false },
    { id: 'zaya42599', password: '42599', used: false },
];

// Login endpoint
app.post('/login', (req, res) => {
    const { id, password } = req.body;
    const user = credentials.find((cred) => cred.id === id && cred.password === password);
    if (user) {
        if (user.used) {
            return res.status(400).json({ message: 'This ID and password have already been used.' });
        }
        user.used = true; // Mark as used
        return res.json({ message: 'Login successful!', isAdmin: user.id === 'admin911' });
    }
    return res.status(401).json({ message: 'Invalid ID or password.' });
});

// Admin: Reset credentials
app.post('/reset-credentials', (req, res) => {
    const { id, password } = req.body;
    if (id === 'admin911' && password === '44505') {
        credentials.forEach((cred) => (cred.used = false));
        return res.json({ message: 'All credentials have been reset.' });
    }
    return res.status(403).json({ message: 'Unauthorized access.' });
});

// Admin: Get credentials status
app.get('/credentials', (req, res) => {
    res.json(credentials);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
