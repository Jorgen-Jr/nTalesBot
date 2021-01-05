const axios = require('axios');
const NumbersController = require('../src/controllers/NumbersController');

exports.handler = async event => {

    const body = event.body;

    const req = JSON.parse(body);

    const {
        message,
        inline_query,
    } = req;

    console.log('Update received: ', req);

    const bot_url = "https://api.telegram.org/bot" + process.env.BOT_TOKEN;

    console.log('BOT endpoint: ' + bot_url);

    let response = {};

    let query = "";

    console.log("Fetching: " + query);

    let results = [];

    if (inline_query) {
        let facts = [];

        const query = inline_query.query;

        if (query.charAt(2) === '/') {
            date = await NumbersController.date(query);

            facts.push({
                title: 'Date',
                description: date,
            });
        } else if (!isNaN(query)) {
            trivia = await NumbersController.trivia(query);
            math = await NumbersController.math(query);
            year = await NumbersController.year(query);
            triviaFragment = await NumbersController.triviaFragment(query);
            yearFragment = await NumbersController.yearFragment(query);

            facts.push({
                title: 'Trivia',
                description: trivia,
            });
            facts.push({
                title: 'Math',
                description: math,
            });
            if (parseInt(query) <= 31) {
                date = await NumbersController.date(query);
                facts.push({
                    title: 'Date',
                    description: date,
                });
            }
            facts.push({
                title: 'Year',
                description: year,
            });
            if (triviaFragment) {
                facts.push({
                    title: 'Trivia Fragment',
                    description: triviaFragment,
                });
            }
            if (yearFragment) {
                facts.push({
                    title: 'Year Fragment',
                    description: yearFragment,
                });
            }
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

        const res = await answerInlineQuery({
            inline_query_id: inline_query.id,
            results,
        });

        console.log("Response generated: ", res.data);
    }
    else if (message) {
        const chatId = message.chat.id;

        /* Answer message. */

        // send a message to the chat acknowledging receipt of their message
        const parse_mode = "HTML";

        // send a message in case it doesn't find anything.
        response = {
            chat_id: chatId,
            text: "Sorry, coudn't catch that 😢 \nPlease use only inline commands for now",
            parse_mode,
        }

        const res = await sendMessage(response);
        console.log("Response generated: ", res.data);
    }

    async function sendMessage(response) {
        return await axios.post('https://ntalesbot.netlify.app/.netlify/functions/answerInlineQuery', response);
    }

    async function answerInlineQuery(response) {
        return await axios.post('https://ntalesbot.netlify.app/.netlify/functions/sendMessage', response);
    }

    return {
        statusCode: 200,

        body: JSON.stringify(response),
    }

}