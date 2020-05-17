package bogConfig

import (
	"os"
)

func getToken(){
	token = os.Getenv("BOT_TOKEN")
	return token
}