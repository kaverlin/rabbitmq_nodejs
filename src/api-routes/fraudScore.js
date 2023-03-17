const express = require('express');
const scoreController = require('../controllers/score/index');
const router = express.Router();

router.get('/', (req, res) => { 
    res.json({
        name: 'testing point', 
        status: 200
    });
});

router.post('/analyse',(req, res) => {
    let scoreControl = new scoreController();
    return scoreControl.evaluateTransaction(req, res);
}); 

module.exports = router;