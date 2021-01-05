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

    if (query) {
        console.log("Fetching: " + query);

        let results = [];

        //Catch the word from TheSaurus
        results.push(...(await ThesaurusController.default(query)));

        //Fetch results from Priberam
        results.push(...(await PriberamController.default(query)));

        //Catch the word from Urban Dictionary
        results.push(...(await UrbanDictionaryController.default(query)));

        if (inline_query) {
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
                triviaFragment = await NumbersController.triviaFragment(queryContent);
                yearFragment = await NumbersController.yearFragment(queryContent);

                facts.push({
                    title: 'Trivia',
                    description: trivia,
                });
                facts.push({
                    title: 'Math',
                    description: math,
                });
                if (parseInt(queryContent) <= 31) {
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

            await answerInlineQuery({
                inline_query_id: inline_query.id,
                results,
            })
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