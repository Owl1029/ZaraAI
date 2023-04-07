const AWS = require('aws-sdk');
const fs = require('fs');
require('dotenv').config();

const polly = new AWS.Polly({
  region: 'us-west-2', 
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

async function TTS(message) {
    return new Promise((resolve, reject) => {
        const params = {
            Text: message,
            OutputFormat: 'mp3',
            VoiceId: 'Salli' 
        };
          
        polly.synthesizeSpeech(params, (err, data) => {
            if (err) {
              reject(err);
            } else {  
                fs.writeFileSync(`./src/data/audio.mp3`, data.AudioStream);  
            }
        });
        resolve(true)    
    });
}

exports.TTS = TTS;