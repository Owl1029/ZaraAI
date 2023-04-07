const ZaraAI = require("./controllers/openAIController");
const AWS = require('./controllers/awsController');
const { SpeechRecorder } = require("speech-recorder");
const exec = require('child_process').exec; 
const wav = require("wav");

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function recordAndProcessAudio(){
  try {
    const fileWriter = new wav.FileWriter("./src/data/audio.wav", {
      channels: 1,
      sampleRate: 16000,
      bitDepth: 16,
    });
    
    const recorder = new SpeechRecorder({
      onAudio: ({ speaking, audio }) => {
        if (speaking) {
          const buffer = Buffer.from(audio.buffer);
          fileWriter.write(buffer);
        }
      },
    });
    
    console.log("Recording for 5 seconds...");
    recorder.start();
    await wait(5000); 
    console.log("Done!");
    recorder.stop();
    fileWriter.end();
    
    const response = await ZaraAI.STT();
    console.log("STT:"+response)
    await ZaraAI.passMessage(response)
    .then(async (res) => {
      if (res) {
        await AWS.TTS(res);
        await wait(2000);
        exec('vlc -I dummy --dummy-quiet /src/data/audio.mp3');
      } 
    });
  } catch (err) {
    console.log(err)
  }
 recordAndProcessAudio()
}

recordAndProcessAudio()