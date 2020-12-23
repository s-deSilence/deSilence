import axios from "axios";
import { functionParams } from '../types/functionParams';
import { RequestMessageViber } from '../types/requestMessages';

export async function ViberSendApi( token:string, receiver:string, senderName:string, params:functionParams, callback:Function ){

    let requestMess:RequestMessageViber = {
        receiver: receiver,
        type: params.photoUrl ? 'picture' : 'text' ,
        sender:{
            name: senderName
        },
        text: params.text,
        media: params.photoUrl,
        min_api_version:3
    };
    if( params.keyboard.length ){
        if( params.inlineButtons ){
            sendByApi( requestMess , ( response:any) => {
                if( response.error ){
                    callback( response );
                } else {
                    delete requestMess.text;
                    requestMess.type = "rich_media";
                    requestMess.rich_media = {
                        Type:'rich_media',
                        ButtonsGroupColumns: 6,
                        ButtonsGroupRows: Math.ceil( params.keyboard.length / ( params.buttonsInRow || 1 ) ),
                        BgColor: "#FFFFFF",
                        Buttons: params.keyboard.slice( 0, 3 * 6 / ( params.buttonsInRow || 1) ).map( ( k ) => ({
                            Text: k.text,
                            Columns: 6 / ( params.buttonsInRow || 1 ),
                            Rows:1,
                            ActionType: k.url ? "open-url" : "reply",
                            ActionBody: k.url ? k.url : k.text,
                            BgColor: params.buttonsColor
                        }))
                    }
                    sendByApi( requestMess , ( response:any) => {
                        callback( response );
                    })
                }
            })
        } else {
            requestMess.keyboard = {
                DefaultHeight:false,
                Type:'keyboard',
                Buttons: params.keyboard.map( ( k ) => ({
                    Text: k.text,
                    Columns: 6 / ( params.buttonsInRow || 1 ),
                    Rows:1,
                    ActionType: k.request_contact ? "share-phone" : k.request_location ? "location-picker" : "reply",
                    ActionBody:k.text,
                    BgColor: params.buttonsColor || '#ffffff'
                }))
            }
            sendByApi( requestMess , ( response:any ) => {
                callback( response );
            })
        }
    } else {
        sendByApi( requestMess , ( response:any ) => {
            callback( response );
        })
    }

    async function sendByApi( requestMess:RequestMessageViber, callback:Function ) {
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
}