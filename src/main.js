const {HtmlTelegramBot, userInfoToString} = require("./bot");
const ChatGptService = require("./gpt");

class MyTelegramBot extends HtmlTelegramBot {
    constructor(token) {
        super(token);
    }

    // Мы будем писать тут наш код
    hello() {

    }
}

const bot = new MyTelegramBot("7281823810:AAHarZYv6TgI1gQKzYqRwG3BVMutk_IoADo");

// Мы будем писать тут наш код
bot.onTextMessage(bot.hello)
