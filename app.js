const express = require('express');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Read hospital data from JSON file
const hospitalsData = JSON.parse(fs.readFileSync('hospitals.json', 'utf-8'));

// Define routes
// GET all hospitals
app.get('/hospitals', (req, res) => {
    res.json(hospitalsData);
});

// POST a new hospital
app.post('/hospitals', (req, res) => {
    const newHospital = req.body;
    hospitalsData.push(newHospital);
    fs.writeFileSync('hospitals.json', JSON.stringify(hospitalsData));
    res.json(newHospital);
});

// PUT/update a hospital
app.put('/hospitals/:hospitalId', (req, res) => {
    const hospitalId = req.params.hospitalId;
    const updatedHospital = req.body;
    hospitalsData[hospitalId] = updatedHospital;
    fs.writeFileSync('hospitals.json', JSON.stringify(hospitalsData));
    res.json(updatedHospital);
});

// DELETE a hospital
app.delete('/hospitals/:hospitalId', (req, res) => {
    const hospitalId = req.params.hospitalId;
    const deletedHospital = hospitalsData.splice(hospitalId, 3);
    fs.writeFileSync('hospitals.json', JSON.stringify(hospitalsData));
    res.json(deletedHospital);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
