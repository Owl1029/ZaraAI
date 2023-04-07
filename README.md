<img src="https://i.imgur.com/ES2TxfD.png" alt="ZaraAI Logo" />

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://www.javascript.com/)

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Discord](https://img.shields.io/discord/1043936305127632927?color=%23697EC6&label=discord)](https://discord.gg/svqDa5TaxA)

## What is ZaraAI?
ZaraAI is a AI created using the GPT 3.5 Turbo Model by OpenAI. ZaraAI can hear you and respond to you in English. 

## Using ZaraAI

Using ZaraAI is really easy. 

Make sure you have downloaded NodeJS v16 and NPM before continuing any further 

1. You must installed [VLC](https://www.videolan.org/vlc/).
2. Add VLC to path (There is plenty of tutorials on how to do so)
3. Download the source code by clicking the code button and clicking "Download ZIP"
4. Extract the ZIP
5. Type ```npm install```
6. Create a ``.env`` file. Write the file like this:
```
OPENAI_API_TOKEN=<Your OpenAI API Token>
AWS_ACCESS_KEY=<Your AWS Access Key>
```
7. Finally, You can run ``npm start`` to start the bot.

If you are having some trouble setting up the AI, Feel free to join my [Discord Server](https://discord.gg/fmDQYhhQdC).

## How does this work? 

The project uses GPT 3.5 Turbo model by OpenAI for reponses, OpenAI Whisper API for Speech to Text translaton provided by you, and AWS for Text-To-Speech  translaton provided by the AI.

### Brief Explanation & Inner workings of AI

The project first sends a audio file every 5 second and the Whisper Speech-To-Text system translates this to text, if there is any audio at all, then the translated text would be send to OpenAI to process, OpenAI would respond to the prompt, then the response by OpenAI is send to AWS Text-To-Speech system and then finally you can hear the audio. It should take about 3-4 seconds. It's very slow but note that this is not the final version of this project, I'll keep improving this. But if someone can help me improve the Speech-To-Text, It would be appreciate.

### AI's Personality or Response Type

The AI uses the file ``/src/data/output.txt`` to define it's personality and the way it responses to messages. You can even change the AI's name there. By default the AI is set to act like a Twitch Streamer.

Example of how things work:

1. Translate Speech-To-text
2. Process Text
3. Translate Text-To-Speech
4. Output the result

## Problems

Currently the AI takes around 3-4 seconds to respond, it's a long time. 

Note that the project is still not 
finished, I will work on it more!

## Credits

I originally got this idea from a AI Vtuber called [Neuro Sama](https://www.twitch.tv/vedal987) created by Vedal.

## Links
* [Discord](https://discord.gg/svqDa5TaxA)