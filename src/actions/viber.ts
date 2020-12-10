import axios from "axios";
import { functionParams } from '../types/functionParams';
import { RequestMessageViber } from '../types/requestMessages';


export async function ViberSendApi( token:string, receiver:string, senderName:string, params:functionParams, callback:Function ){

    const requestMess:RequestMessageViber = {
        receiver: receiver,
        type: params.photoUrl ? 'picture' : 'text' ,
        sender:{
            name: senderName
        },
        keyboard: {
            DefaultHeight:false,
            Type:'keyboard',
            Buttons: params.keyboard.map( ( k ) => ({
                Text: k.text,
                Columns: 12 / ( params.buttonsInRow || 1 ),
                Rows:1,
                ActionType: k.request_contact ? "share-phone" : k.request_location ? "location-picker" : "reply",
                ActionBody:k.text
            }))
        },
        text: params.text,
        media: params.photoUrl,
        min_api_version:3
    };
    try{
        const sendMessage = await axios.post("https://chatapi.viber.com/pa/send_message", requestMess ,{headers:{'X-Viber-Auth-Token': token }})
        callback({
            error: false,
            data: sendMessage.data
        })
    } catch( e ){
        callback({
            error:true,
            data:e.response
        })
    }
}