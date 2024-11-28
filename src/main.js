const {HtmlTelegramBot, userInfoToString} = require("./bot");
const ChatGptService = require("./gpt");

class MyTelegramBot extends HtmlTelegramBot {
    constructor(token) {
        super(token);
        this.mode = null;
    }

    // Мы будем писать тут наш код


    async start(msg) {
        this.mode = "main"
        const text = this.loadMessage("main")
        await this.sendImage("main")
        await this.sendText(text)
    }


    async html(msg) {
        await this.sendHTML('<h3 style="color:#1558b0">Привет!</h3>')
        const html = this.loadHtml("main")
        await this.sendHTML(html, {theme: "dark"})
    }


    async gpt(msg) {
        this.mode = "gpt"
        const text = this.loadMessage("gpt")
        await this.sendImage("gpt")
        await this.sendText(text)
    }


    async gptDialog(msg) {
        const text = msg.text;
        const answer = await chatgpt.sendQuestion("Ответь на вопрос?", text)
        await this.sendText(answer)
    }


    async hello(msg) {
        if (this.mode === "gpt")
            await this.gptDialog(msg);
        else {
            const text = msg.text
            await this.sendText("<b>Привет!</b>")
            await this.sendText("<i>Как дела?</i>")
            await this.sendText(`Вы написали привет: ${text}`)

            await this.sendImage("avatar_main")
            this.sendTextButtons("Какая у вас тема в телеграмм", {
                "theme_light": "Светлая",
                "theme_dark": "Темная",
            })
        }
    }

    async helloButton(callbackQuery) {
        const query = callbackQuery.data;
        if (query === "theme_light")
            await this.sendText("У вас светлая тема")
        else if (query === "theme_dark")
            await this.sendText("У вас темная тема")
    }
}

const chatgpt = new ChatGptService("gpt:AI6Jk5emA0osUkc2nivglWTowjq5GNCo2bpddaqxeEU8Jc4C4Zde0k5yHYJFkblB3TZ4vjiZ2EYkjx9hF0XMim3ZuBv5PzgpjMDJRq1trkAElmp9iUdQKCs0HqDc")
const bot = new MyTelegramBot("7281823810:AAHarZYv6TgI1gQKzYqRwG3BVMutk_IoADo");


// Мы будем писать тут наш код
bot.onCommand( /\/start/, bot.start)
bot.onCommand( /\/html/, bot.html)
bot.onCommand( /\/gpt/, bot.gpt)
bot.onTextMessage(bot.hello)
bot.onButtonCallback(/^.*/, bot.helloButton)