const { Configuration, OpenAIApi } = require("openai");
const fs = require('fs');
const path = require('path')
require("dotenv").config();

// Log in to OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_TOKEN,
});

const openai = new OpenAIApi(configuration);

async function passMessage(context) {
    if (context === "Skipped") return; 

    const content = `Classify the sentence as Assertive, Imperative, Interrogative, or Exclamatory: ${context}`
  
    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: content}],
    })
  
    if (res.data.choices[0].message.content.toLowerCase().includes("interrogative")) {
        const oldMessages = fs.readFileSync(path.join(__dirname, "../data/output.txt"))
        const content = `${oldMessages}` + `\n QUESTION TO ZARA: ${context}` + "\nREPLY WITH ANSWER";
    
        return openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: content}],
          }).then((res => {
            fs.writeFileSync(path.join(__dirname, "../data/output.txt"), content + `\n${res.data.choices[0].message.content}\n`)
    
            return res.data.choices[0].message.content
        }))
    }
    if (res.data.choices[0].message.content.toLowerCase().includes("imperative") || res.data.choices[0].message.content.toLowerCase().includes("exclamatory")) {
        const oldMessages = fs.readFileSync(path.join(__dirname, "../data/output.txt"))
        const content = `${oldMessages}` + `\n COMMAND TO ZARA: ${context}` + "\nGENERATE A REPLY";

        return openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: content}],
            }).then((res => {
            fs.writeFileSync(path.join(__dirname, "../data/output.txt"), content + `\n${res.data.choices[0].message.content}\n`)

            return res.data.choices[0].message.content
        }))
    }
    if (res.data.choices[0].message.content.toLowerCase().includes("assertive")) {
        const oldMessages = fs.readFileSync(path.join(__dirname, "../data/output.txt"))
        const content = `${oldMessages}` + `\n MESSAGE TO ZARA: ${context}` + "\nGENERATE A REPLY";

        return openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: content}],
            }).then((res => {
            fs.writeFileSync(path.join(__dirname, "../data/output.txt"), content + `\n${res.data.choices[0].message.content}\n`)
            
            return res.data.choices[0].message.content
        }))
    }
}

async function STT() {
    try {
      const res = await openai.createTranscription(fs.createReadStream(path.join(__dirname, "../data/audio.wav")), 'whisper-1');
      return res.data.text
    } catch(err) {
      return "Skipped"
    }
}

exports.passMessage = passMessage;
exports.STT = STT;