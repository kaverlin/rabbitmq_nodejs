const queueService = require('../../services/queue.service');

class scoreController{
    constructor(){}
    async evaluateTransaction ( req, res ) {
        try {
            let qService = new queueService();
            qService.sendData(req.body);
            return res.status(200).json({
                name: 'Request in progress...'
            });
        } catch ( err ) {
          res.status( 500 ).send( err );
        }
      }
}

module.exports = scoreController;




  