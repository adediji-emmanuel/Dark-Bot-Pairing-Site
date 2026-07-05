const PastebinAPI = require('pastebin-js');
const pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL');
const { makeid } = require('./id');
const express = require('express');
const fs = require('fs');
let router = express.Router();
const pino = require('pino');

const {
    default: DarkBot,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers
} = require('@whiskeysockets/baileys');

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;

    async function DARK_BOT_PAIR_CODE() {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);

        try {
            let Pair_Code_By_DarkBot = DarkBot({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(
                        state.keys,
                        pino({ level: 'fatal' }).child({ level: 'fatal' })
                    ),
                },
                printQRInTerminal: false,
                logger: pino({ level: 'fatal' }).child({ level: 'fatal' }),
                browser: Browsers.macOS('Chrome')
            });

            if (!Pair_Code_By_DarkBot.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');

                const code = await Pair_Code_By_DarkBot.requestPairingCode(num);

                if (!res.headersSent) {
                    await res.send({ code });
                }
            }

            Pair_Code_By_DarkBot.ev.on('creds.update', saveCreds);

            Pair_Code_By_DarkBot.ev.on('connection.update', async (s) => {
                const { connection, lastDisconnect } = s;

                if (connection === 'open') {
                    await delay(5000);

                    let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);

                    await delay(800);

                    let b64data = Buffer.from(data).toString('base64');

                    let session = await Pair_Code_By_DarkBot.sendMessage(
                        Pair_Code_By_DarkBot.user.id,
                        {
                            text: 'DARK-BOT~' + b64data
                        }
                    );

                    let DarkBot_TEXT = `
<img src="https://files.catbox.moe/7sfhxn.jpeg" alt="DARK-BOT bot Logo" class="logo-img">
╔════════════════════◇
║『 SESSION CONNECTED』
║ ✨ DARK-BOT 🔷
║ ✨ DARK-BOT OFFICIAL🔷
╚════════════════════╝


---

╔════════════════════◇
║『 YOU'VE CHOSEN Dark-Bot 』
║ -Set the session ID in Heroku:
║ - SESSION_ID:
╚════════════════════╝
╔════════════════════◇
║ 『••• _V𝗶𝘀𝗶𝘁 𝗙𝗼𝗿_H𝗲𝗹𝗽 •••』
║❍ 𝐎𝐰𝐧𝐞𝐫: +2348132990186
║❍ 𝐑𝐞𝐩𝐨: https://github.com/adediji-emmanuel/Dark-Bot
║❍ 𝐖𝐚𝐆𝗿𝐨𝐮𝐩: https://chat.whatsapp.com/
║❍ 𝐖𝐚𝐂𝐡𝐚𝐧𝐧𝐞𝐥: https://whatsapp.com/channel/
║
║ ☬ ☬ ☬ ☬
╚═════════════════════╝
𒂀 Enjoy Dark-Bot


---

Don't Forget To Give Star⭐ To My Repo
______________________________`;

                    await Pair_Code_By_DarkBot.sendMessage(
                        Pair_Code_By_DarkBot.user.id,
                        {
                            text: DarkBot_TEXT
                        },
                        {
                            quoted: session
                        }
                    );

                    await delay(100);

                    await Pair_Code_By_DarkBot.ws.close();

                    return await removeFile('./temp/' + id);

                } else if (
                    connection === 'close' &&
                    lastDisconnect &&
                    lastDisconnect.error &&
                    lastDisconnect.error.output.statusCode != 401
                ) {

                    await delay(10000);

                    DARK_BOT_PAIR_CODE();
                }
            });

        } catch (err) {
            console.log('Service restarted');

            await removeFile('./temp/' + id);

            if (!res.headersSent) {
                await res.send({
                    code: 'Service Currently Unavailable'
                });
            }
        }
    }

    return await DARK_BOT_PAIR_CODE();
});

module.exports = router;
