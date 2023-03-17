const amqp = require('amqplib');

class QueueService{
    chanel;
    connection;
    constructor(){}

    async conect(){
         try{
            this.connection = await amqp.connect({ protocol: 'amqp', hostname: 'localhost', port: 5672, username: 'guest', password: 'guest', vhost: '/' });
            //"amqp://localhost:5672" //old connect path
            this.channel  = await this.connection.createChannel();
            await this.channel.assertQueue("score-queue");
            return  {channel: this.channel, connection: this.connection, a: 'akdkd'};
         }
         catch(error){
            return {
                message: 'Internal error...', 
                status: 500
            };
         }
    }

    async sendData(data){
        this.conect()
        .then(async (amqpConnectData) => {
            try{
                await amqpConnectData.channel.sendToQueue("score-queue", Buffer.from(JSON.stringify(data)));
                await amqpConnectData.channel.close();
                await amqpConnectData.connection.close("score-queue"); 
            }
            catch{
                return {
                    message: 'Internal error...', 
                    status: 500
                };    
            }
            
        })
    }

    async retrievingData(){
        this.conect()
        .then(async (amqpConnectData) => {
             await amqpConnectData.channel.consume('score-queue', (data) => {
                console.log(`${Buffer.from(data.content)}`);
                amqpConnectData.channel.ack(data);
            }); 
        });
        
    }
}

module.exports = QueueService;