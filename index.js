const Twitter = require('twitter')

require('dotenv').config()

const twitter = new Twitter({
    consumer_key: process.env.BCK,
    consumer_secret: process.env.BCS,
    access_token_key: process.env.BAT,
    access_token_secret: process.env.BATS
})

function action(event) {
    const {retweeted_status, text, id_str, screen_name, is_quote_status} = event;
    const {name} = event.user;
    function stro(texto) {
    const text = texto.trim().toLowerCase()
    return text == 'stro'
    }

    if(!retweeted_status && !is_quote_status && stro(text)) {
        Tweet.post(`statuses/retweet/${id_str}`, err => {
            if(err){
                console.log('erro' + err)
            } else {
                console.log('Retweet:' + `https://twitter.com/${name}/status/${id_str}`)
            }
        })
    } else {
        return;
    }
}

var stream = twitter.stream('statuses/filter', {track: 'bot'})

stream.on('data', action)

stream.on('erro', console.log)
