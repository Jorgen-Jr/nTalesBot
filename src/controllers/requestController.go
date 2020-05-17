package requestController

import (
	"strconv"
)

func SimpleMessage(botAPI *tgbotapi.BotAPI, chatid int64, messageid int, text string) error {

	msg := tgbotapi.NewMessage(chatid, text)

	if messageid != 0 {
		msg.ReplyToMessageID = messageid
	}

	msg.ParseMode = "markdown"
	msg.DisableWebPagePreview = false

	_, err := botAPI.Send(msg)

	if err != nil {
		return err
	}

	return nil
}