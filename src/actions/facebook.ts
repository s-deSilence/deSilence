import axios from "axios";
import { functionParams } from '../types/functionParams';
import { RequestMessageFacebook } from '../types/requestMessages';

export async function FacebookSendApi( token:string , recipientId:string, params:functionParams, callback:Function ){
    if( params.photoUrl ){
        let urlSendMessage = {
            messaging_type:'RESPONSE',
            recipient:{
                id: recipientId
            },
            message:{
                "attachment":{
                    "type":"image", 
                    "payload":{
                        "is_reusable": true,
                        "url": params.photoUrl
                    }
                }
            }
        }
        try{
            const send = await axios.post(`https://graph.facebook.com/v9.0/me/messages?access_token=${token}`, urlSendMessage )
        } catch ( e ){
            callback({
                error:true,
                data: e.response
            })
        } 
    }
    let requestMessage:RequestMessageFacebook = {
        messaging_type:'RESPONSE',
        recipient:{
            id: recipientId
        },
        message:{
            text: params.text
        }
    };
    if( params.keyboard.filter( k => !k.request_location ).length ){
        requestMessage.message.quick_replies = params.keyboard
            .filter( k => !k.request_location )
            .map( k =>  k.request_contact ? { content_type:"user_phone_number" } : {
                content_type:"text",
                title:k.text,
                payload: k.text
            })
    }
    try{
        const send = await axios.post(`https://graph.facebook.com/v9.0/me/messages?access_token=${token}`, requestMessage )
        callback({
            error: false,
            data: send.data
        })
    } catch ( e ){
        callback({
            error:true,
            data:e.response
        })
    }

}