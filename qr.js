const PastebinAPI = require("pastebin-js");
const pastebin = new PastebinAPI("EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL");

const { makeid } = require("./id");
const QRCode = require("qrcode");
const express = require("express");
const path = require("path");
const fs = require("fs");
const pino = require("pino");

const router = express.Router();

const {
    default: DarkBot,
    useMultiFileAuthState,
    Browsers,
    delay
} = require("@whiskeysockets/baileys");

function removeFile(filePath) {
    if (fs.existsSync(filePath)) {
        fs.rmSync(filePath, {
            recursive: true,
            force: true
        });
    }
}

router.get("/", async (req, res) => {

    const id = makeid();
    const authPath = path.join(__dirname, "temp", id);

    async function startSession() {

        try {

            console.log("Starting QR Session:", id);

            const {
                state,
                saveCreds
            } = await useMultiFileAuthState(authPath);

            const sock = DarkBot({
                auth: state,
                printQRInTerminal: false,
                browser: Browsers.macOS("Desktop"),
                logger: pino({
                    level: "info"
                })
            });

            sock.ev.on("creds.update", saveCreds);

            sock.ev.on("connection.update", async (update) => {

                console.log(update);

                const {
                    connection,
                    lastDisconnect,
                    qr
                } = update;

                // SEND QR TO WEBSITE
                if (qr && !res.headersSent) {

                    console.log("QR Generated");

                    const buffer = await QRCode.toBuffer(qr);

                    res.writeHead(200, {
                        "Content-Type": "image/png",
                        "Cache-Control": "no-cache"
                    });

                    return res.end(buffer);
                }

                // CONNECTED
                if (connection === "open") {

                    console.log("WhatsApp Connected");

                    await delay(5000);

                    const credsFile = path.join(authPath, "creds.json");

                    if (!fs.existsSync(credsFile)) {
                        console.log("creds.json not found.");
                        return;
                    }

                    const data = fs.readFileSync(credsFile);

                    const sessionId = Buffer.from(data).toString("base64");

                    const sent = await sock.sendMessage(
                        sock.user.id,
                        {
                            text: "DARKBOT~" + sessionId
                        }
                    );

                    const text = `
╔════════════════════◇
║『 SESSION CONNECTED』
║ ✨DARK-BOT🔷
║ ✨DARK-BOT OFFICIAL🔷
╚════════════════════╝

Your Session ID has been generated successfully.

Repository:
https://github.com/adediji-emmanuel/Dark-Bot

Don't Forget To Give Star ⭐
`;

                    await sock.sendMessage(
                        sock.user.id,
                        {
                            text
                        },
                        {
                            quoted: sent
                        }
                    );

                    await delay(1000);

                    sock.ws.close();

                    removeFile(authPath);

                }

                // RECONNECT
                else if (
                    connection === "close" &&
                    lastDisconnect &&
                    lastDisconnect.error &&
                    lastDisconnect.error.output &&
                    lastDisconnect.error.output.statusCode !== 401
                ) {

                    console.log("Reconnecting...");

                    await delay(5000);

                    startSession();

                }

            });

        } catch (err) {

            console.error("QR ERROR");
            console.error(err);

            if (!res.headersSent) {
                res.status(500).json({
                    error: err.message
                });
            }

            removeFile(authPath);

        }

    }

    startSession();

});

module.exports = router;					await delay(800);
				   let b64data = Buffer.from(data).toString('base64');
				   let session = await Qr_Code_By_DarkBot.sendMessage(Qr_Code_By_DarkBot.user.id, { text: 'DARKBOT~' + b64data });
	
				   let DarkBot_TEXT = `
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
	 await Qr_Code_By_DarkBot.sendMessage(Qr_Code_By_DarkBot.user.id,{text:DarkBot_TEXT},{quoted:session})



					await delay(100);
					await Qr_Code_By_DarkBot.ws.close();
					return await removeFile("temp/" + id);
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					DarkBot_QR_CODE();
				}
			});
		} catch (err) {
			if (!res.headersSent) {
				await res.json({
					code: "Service is Currently Unavailable"
				});
			}
			console.log("Error in QR route:", err);
		}
	}
	return await DarkBot_QR_CODE()
});
module.exports = router
