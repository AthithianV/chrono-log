export const appendZero = (time:number):string=>{
    return `${time<10?"0":""}${time}`;
}

export const timeFormat = (time:number):string=>{
    const hours = time/3600;
    const minutes = time/60;
    const seconds = time%60;

    return `${hours<10?"0":""}${hours}:${minutes<10?"0":""}${minutes}:${seconds<10?"0":""}${seconds}`;
}

export const ignoreTime = (date:Date) => {
    return date.toISOString().split("T")[0];
}

export const getToday = () => {
    return new Date(new Date().toISOString().split("T")[0]);
}