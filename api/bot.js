const TelegramBot = require('node-telegram-bot-api');
const schedule = require('node-schedule');
const moment = require('moment-timezone');

// Замените 'YOUR_TELEGRAM_BOT_TOKEN' на токен вашего бота
const token = '7264320577:AAH9stYH4tH4qfa1-lwDndtj6NDRnsG0Aps';
const chatId = '-4237525066';

// Создайте экземпляр бота
const bot = new TelegramBot(token);

// Установите Webhook для бота
const url = 'https://byte-smoking.vercel.app/';  // замените на URL вашего приложения на Vercel
bot.setWebHook(url);

// Функция для отправки сообщения
const sendMessage = (message) => {
    bot.sendMessage(chatId, message);
};

// Пример расписания для отправки сообщений с учетом часового пояса
const scheduleMessages = () => {
    const createJob = (cronTime, timezone, message) => {
        schedule.scheduleJob({ tz: timezone, rule: cronTime }, () => {
            sendMessage(message);
        });
    };

    // Настройте расписание согласно вашему времени и сообщениям
    createJob('45 15 * * *', 'Asia/Bishkek', 'Доброе утро!');
    createJob('46 15 * * *', 'Asia/Bishkek', 'Пора обедать!');
    createJob('00 18 * * *', 'Asia/Bishkek', 'Добрый вечер!');
};

// Запустить планировщик
scheduleMessages();

// Обработка сообщений от пользователей
module.exports = async (req, res) => {
    try {
        const { body } = req;

        // Проверка на тип события
        if (body.message) {
            const chatId = body.message.chat.id;
            bot.sendMessage(chatId, 'Сообщение получено!');
        }

        res.status(200).send('OK');
    } catch (error) {
        console.error('Ошибка обработки запроса:', error);
        res.status(500).send('Внутренняя ошибка сервера');
    }
};
