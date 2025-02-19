export const appendZero = (time:number):string=>{
    return `${time<10?"0":""}${time}`;
}

export const ignoreTime = (date:Date) => {
    return date.toISOString().split("T")[0];
}

export const getToday = () => {
    return new Date(new Date().toISOString().split("T")[0]);
}