const bodyParser = require( "body-parser" );
const express = require('express');
const fraudScoreRoute=require('../api-routes/fraudScore');
const config = require('../configs/environment.variable');
const queueService = require('../services/queue.service');

class ExpressLaoder{
    constructor(){
        const app = express();
        let queue = new queueService();
        app.use(express.json());
        bodyParser.json({ type: 'application/*+json' });
        app.use('/score', fraudScoreRoute);
        queue.retrievingData();  
        this.server = app.listen(config.port, () =>{
            console.log('SERVER IS LAUCH !!', config.port);
        });
    }

    get Server(){
        return this.server;
    }
}

module.exports = ExpressLaoder;