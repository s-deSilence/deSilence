export interface functionParams{
    photoUrl:string|null,
    buttonsInRow?:number,
    keyboard: KeyboardTextTypes[],
    text:string,
    buttonsColor?:string,
    inlineButtons?:boolean
}

export interface KeyboardTextTypes{
    id: number,
    text:string,
    request_contact?: boolean,
    request_location?: boolean,
    url?:string
}