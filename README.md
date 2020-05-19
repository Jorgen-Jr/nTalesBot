# nTalesBot

I wanted to test out how telegram bots works, so I made this little bot that give you trivias of the given number through inline commands.

It should return the trivia options for the number and send it when the user chooses it.

### Usage

Start typing `@ntalesbot` in any chat and it will show what options you have for the desired number. It's a fair simple bot.

### Options
You will have the following options when entering the numbers.
- Trivia: Will return a trivia abou the given number.
- Math: Will return a math fact about the number.
- Date: Will return an event occurred. in the given date, <b>Must be at month/day format, or less than 31 (In which case with give an event from january.)</b>
- Year: Will return an event that has happened in that year.

### External References
This bot uses the following api at [Numbers API](http://numbersapi.com), huge thanks to David and Mack for providing this api.
