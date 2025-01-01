export const appendZero = (time:number):string=>{
    return `${time<10?"0":""}${time}`;
}