const {HtmlTelegramBot, userInfoToString} = require("./bot");
const ChatGptService = require("./gpt");

class MyTelegramBot extends HtmlTelegramBot {
    constructor(token) {
        super(token);
    }

    // Мы будем писать тут наш код
    async hello(msg) {
        const text = msg.text
        await this.sendText("<b>Привет!</b>")
        await this.sendText("<i>Как дела?</i>")
        await this.sendText(`Вы написали привет: ${text}`)

        await this.sendImage("avatar_main")
        this.sendTextButtons("Какая у вас тема в телеграмм", {
            "theme light": "Светлая",
            "theme dark": "Темная",
        })
    }
}

const bot = new MyTelegramBot("7281823810:AAHarZYv6TgI1gQKzYqRwG3BVMutk_IoADo");

// Мы будем писать тут наш код
bot.onTextMessage(bot.hello)