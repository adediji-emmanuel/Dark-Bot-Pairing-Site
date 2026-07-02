const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
	default: Dark-Bot,
	useMultiFileAuthState,
	jidNormalizedUser,
	Browsers,
	delay,
	makeInMemoryStore,
} = require("@whiskeysockets/baileys");

function removeFile(FilePath) {
	if (!fs.existsSync(FilePath)) return false;
	fs.rmSync(FilePath, {
		recursive: true,
		force: true
	})
};
const {
	readFile
} = require("node:fs/promises")
router.get('/', async (req, res) => {
	const id = makeid();
	async function Dark-Bot_QR_CODE() {
		const {
			state,
			saveCreds
		} = await useMultiFileAuthState('./temp/' + id)
		try {
			let Qr_Code_By_Dark-Bot = Dark-Bot({
				auth: state,
				printQRInTerminal: false,
				logger: pino({
					level: "silent"
				}),
				browser: Browsers.macOS("Desktop"),
			});

			Qr_Code_By_Dark-Bot.ev.on('creds.update', saveCreds)
			Qr_Code_By_Dark-Bot.ev.on("connection.update", async (s) => {
				const {
					connection,
					lastDisconnect,
					qr
				} = s;
				if (qr) await res.end(await QRCode.toBuffer(qr));
				if (connection == "open") {
					await delay(5000);
					let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
					await delay(800);
				   let b64data = Buffer.from(data).toString('base64');
				   let session = await Qr_Code_By_Dark-Bot.sendMessage(Qr_Code_By_Dark-Bot.user.id, { text: 'DARK-BOT~' + b64data });
	
				   let Dark-Bot_TEXT = `
╔════════════════════◇
║『 SESSION CONNECTED』
║ ✨DARK-BOT🔷
║ ✨DARK-BOT OFFICIAL🔷
╚════════════════════╝


---

╔════════════════════◇
║『 YOU'VE CHOSEN DARK-BOT 』
║ -Set the session ID in Heroku:
║ - SESSION_ID: 
╚════════════════════╝
╔════════════════════◇
║ 『••• _V𝗶𝘀𝗶𝘁 𝗙𝗼𝗿_H𝗲𝗹𝗽 •••』
║❍ 𝐘𝐨𝐮𝐭𝐮𝐛𝐞: youtube.com/@
║❍ 𝐎𝐰𝐧𝐞𝐫: +2348132990186
║❍ 𝐑𝐞𝐩𝐨: https://github.com/adediji-emmanuel/Dark-Bot 
║❍ 𝐖𝐚𝐆𝗿𝐨𝐮𝐩: https://chat.whatsapp.com/
║❍ 𝐖𝐚𝐂𝐡𝐚𝐧𝐧𝐞𝐥: https://whatsapp.com/channel/
║❍ 𝐈𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦: _https://www.instagram.com/
║ ☬ ☬ ☬ ☬
╚═════════════════════╝
𒂀 Enjoy DARK-BOT


---

Don't Forget To Give Star⭐ To My Repo
______________________________`;
	 await Qr_Code_By_Dark-Bot.sendMessage(Qr_Code_By_Dark-Bot.user.id,{text:Dark-Bot_TEXT},{quoted:session})



					await delay(100);
					await Qr_Code_By_Dark-Bot.ws.close();
					return await removeFile("temp/" + id);
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					Dark-Bot_QR_CODE();
				}
			});
		} catch (err) {
			if (!res.headersSent) {
				await res.json({
					code: "Service is Currently Unavailable"
				});
			}
			console.l/" + id);
		}
	}
	return await Dark-Bot_QR_CODE()
});
module.exports = router
