package bogConfig

import ()

func getToken(){
	return os.Getenv("BOT_TOKEN")
}