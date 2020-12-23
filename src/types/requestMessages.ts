export interface telegramRequestMessage{
    chat_id: string,
    text?:string,
    reply_markup: null | KeyboardTelegram,
    photo?:string,
    caption?:string
}

interface KeyboardTelegram{
    resize_keyboard: boolean,
    one_time_keyboard: boolean,
    remove_keyboard: boolean,
    keyboard?: null | KeyboardTextTypesTelegram[][],
    inline_keyboard?: KeyboardTextTypesTelegram
}

interface KeyboardTextTypesTelegram{
    id?: number,
    text:string,
    request_contact?: boolean,
    request_location?: boolean,
    url?:string,
    callback_data?:string
}

export interface RequestMessageFacebook{
    messaging_type:'RESPONSE'|'MESSAGE_TAG',
    recipient:{
        id:string
    },
    message:{
        text?: string,
        quick_replies?:QuickReplies[],
        attachment?:{
            type:string,
            payload:{
                template_type:string,
                text:string,
                buttons:{ type:string, title:string , url?:string, payload?:string }[]
            }
        }
    }
}

interface QuickReplies{
    content_type:string,
    title?:string,
    payload?:string
}

export interface RequestMessageViber{
    receiver: string,
    type: string,
    sender:any,
    keyboard?: KeyboardViber | null,
    text?:string,
    min_api_version:number ,
    media?: string | null,
    rich_media?:{
        Type:string,
        ButtonsGroupColumns:number,
        ButtonsGroupRows:number,
        BgColor:string,
        Buttons: KeyboardViberTextTypes[]
    }
}

interface KeyboardViber{
    DefaultHeight:boolean,
    Buttons: KeyboardViberTextTypes[],
    Type:string
}

interface KeyboardViberTextTypes{
    Text:string,
    Columns:number,
    Rows:number,
    ActionType:string,
    ActionBody:string
}