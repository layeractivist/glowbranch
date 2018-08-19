const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const PREFIX = ">>";

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
    console.log(`> ${bot.user.username} был успешно запущен!`);
    // Эта команда высвечивает сообщение в консоли, во время успешного запуска бота.
});

var fortunes = [
    "Да!", 
    "Нет.", 
    "Возможно.", 
    "Мало вероятно.", 
    "Категорически нет."
    // Варианты для случайного ответа (для команды >>фортуна).
    ]; 

bot.on("guildMemberAdd", function(member) {
    member.guild.channels.find("name", "приветствия").sendMessage(member.toString() + " добро пожаловать на **Glow Branch!**\nЧтобы подробнее ознакомиться с функционалом бота, введите: *>>инфо*.");

    member.addRole(member.guild.roles.find("name", "Участник"));
});

bot.on("ready", () => { 
    bot.user.setActivity(`>>инфо`); 
    // Эта команда отображает во что играет бот. 
}); 

bot.on("message", function(message) { 
    if (message.author.equals(bot.user)) return; 

    if (!message.content.startsWith(PREFIX)) return;
    
    var args = message.content.substring(PREFIX.length).split(" ");
    
    switch (args[0].toLowerCase()) {
        case "фортуна":
            if (args[1]) message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)]); 
            else message.channel.sendMessage("**Пожалуйста, введите вопрос после команды.**"); 
            break;
        default:
            message.channel.sendMessage("**Вы неверно ввели команду.**");
            break;
        case "инфо": 
            message.channel.sendMessage("**Информация о боте:**\n```Этот бот был создан @Layer Activist#2150, специально для сервера Glow Branch.\n\nФункционал бота:\n>>навигация - вызывает навигацию по каналам сервера\n>>фортуна - по образцу >>фортуна вопрос, вы сможете получить ответ на свой вопрос.\n>>вложение - бла-бла-бла вся хуйня```\nЕсли у Вас отображаются пустые сообщения после ввода команды *>>вложение*, то последуйте инструкции снизу:\n**1.** Откройте настройки.\n**2.** Настройки приложения > Текст и изображения.\n**3.** Предпросмотр ссылки > Отображать предпросмотр сайта для ссылок в чате. (Включить)\n\n`В будущем функционал бота будет пополнятся, включая в себя новые команды.`"); 
            break; 
        case "навигация": 
            message.channel.sendMessage("**Навигация по серверу**```\n#приветствия - канал, где отображаются имена новых участников сервера.\n#основной_чат - чат для общения участников сервера (*и использования бота*)\n\n- Блок информации:\n#правила_сервера - правила, с которыми необходимо ознакомиться всем участникам сервера.\n#роли - информация о получении и привелегиях ролей на сервере.```"); 
            break; 
        // Обычные текстовые команды.
        case "вложение":
            let bicon = bot.user.displayAvatarURL;
            let botembed = new Discord.RichEmbed()
            .setDescription("Тест:")
            .setColor("#E60F4B")
            .setThumbnail(bicon)
            .addField("Bot Name", bot.user.username);

            return message.channel.send(botembed);

            break;
    }

});

bot.login(botconfig.token);
