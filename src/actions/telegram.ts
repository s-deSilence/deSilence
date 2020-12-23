import { telegramRequestMessage } from '../types/requestMessages';
import axios from "axios";
import { functionParams } from '../types/functionParams';

export async function TelegramSendApi( token:string, chatId:string, params:functionParams, callback:Function ){
    const returnKeyboard = () => {
        let subarray = [];
        let size = params.buttonsInRow || 1;
        for (let i = 0; i <Math.ceil( params.keyboard.length/ size ); i++){
            subarray[i] = params.keyboard.slice(( i*size ), (i*size) + size).map( k => {
                return params.inlineButtons 
                    ?   
                        k.url
                        ?
                            { text: k.text, url: k.url }
                        :
                            { text: k.text, callback_data: k.text }
                    :  k
            });
        }
        return {
            [ params.inlineButtons ? 'inline_keyboard' : 'keyboard' ]: subarray,
            resize_keyboard: true,
            one_time_keyboard: true,
            remove_keyboard: true
        }
    }
    const requestMess:telegramRequestMessage = params.photoUrl 
        ?
            {
                chat_id: chatId,
                photo: params.photoUrl,
                caption: params.text,
                reply_markup: returnKeyboard()
            }
        :
            {
                chat_id: chatId,
                text: params.text,
                reply_markup: returnKeyboard()
            };
    try{
        const sendMessage = await axios.post(`https://api.telegram.org/bot${ token }/${params.photoUrl?'sendPhoto':'sendMessage'}`, requestMess )
        callback({
            error:false,
            data: sendMessage.data
        })
    } catch( e ){
        callback({
            error:true,
            data: e.response
        })
    }
}