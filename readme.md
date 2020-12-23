# messengers-send-message

Foobar is a Python library for dealing with word pluralization.

## Installation

Using npm.

```bash
$ npm install messengers-send-message
```

## Usage

```javascript
import { TelegramSendApi, ViberSendApi, FacebookSendApi } from 'messengers-send-message';

const messageOptions = // a template of message
{
   photoUrl: null, // a link to picture you want to send
   text: 'Hello world!', // a message you want to send
   buttonsInRow: 1, // a number of buttons in row, default 1, only for telegram and viber
   buttonsColor: '#333333', // a background color of buttons, HEX, default #ffffff, only for Viber
   inlineButtons: false, // use this to bind buttons to a message, default false
   keyboard:[{
      id:1,
      text:"Hi!", // text of button
      request_contact: false, // Optional. Set true for get a phone number
      request_location: false, //Optional. set true for get a location, only for telegram and viber
      url: 'https://www.npmjs.com/package/messengers-send-message'
      //Optional. Use it where you want to open a url by inlineButton
   }]
}

//To a send message to Telegram:
TelegramSendApi( 'yourToken', 'chatId', messageOptions, ( response ) => {
    console.log( response.error , response.data );
})
//To a send message to Viber:
ViberSendApi( 'yourToken', 'receiverId', 'senderName', messageOptions, ( response ) => {
    console.log( response.error , response.data );
})
//To a send message to Facebook:
FacebookSendApi( 'yourToken', 'recipientId', messageOptions, ( response ) => {
    console.log( response.error , response.data );
})

```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)