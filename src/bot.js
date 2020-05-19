
const TelegramBot = require('node-telegram-bot-api');
const NumbersController = require('./controllers/NumbersController');

const token = process.env.BOT_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

bot.on('inline_query', async (query) => {
  const queryId = query.id;
  const queryContent = query.query;
  let results = [];

  if (queryContent) {
    let facts = [];

    if (queryContent.charAt(2) === '/') {
      date = await NumbersController.date(queryContent);

      facts.push({
        title: 'Date',
        description: date,
      });
    } else if (!isNaN(queryContent)) {
      trivia = await NumbersController.trivia(queryContent);
      math = await NumbersController.math(queryContent);
      year = await NumbersController.year(queryContent);

      facts.push({
        title: 'Trivia',
        description: trivia,
      });
      facts.push({
        title: 'Math',
        description: math,
      });
      if (parseInt(queryContent) < 31) {
        date = await NumbersController.date(queryContent);
        facts.push({
          title: 'Date',
          description: date,
        });
      }
      facts.push({
        title: 'Year',
        description: year,
      });
    }

    facts.map((fact, index) => {
      results.push({
        type: 'Article',
        id: index,
        title: fact.title,
        description: fact.description,
        input_message_content: {
          message_text: fact.description,
        },
      })
    })
  }

  bot.answerInlineQuery(queryId, results)
});

// Listen for any kind of message.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'To use this bot, simply use the inline option @ntalesbot + number. You can query trivias, dates, years and math curiosities related to the given number. For dates, please use the format month/day. Numbers less than 30 will give a trivia about the day in january.');
});