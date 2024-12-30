export const formatTime = (time:number):string=>{
    const hours = Math.floor(time/36000);
    const minutes = Math.floor(time/600);
    const seconds = Math.floor(time/10);
    return `${appendZero(hours)}:${appendZero(minutes)}:${appendZero(seconds)}`
}

export const appendZero = (time:number):string=>{
    return `${time<10?"0":""}${time}`;
}