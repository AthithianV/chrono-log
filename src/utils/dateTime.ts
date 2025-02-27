export const appendZero = (time:number):string=>{
    return `${time<10?"0":""}${time}`;
}

export const secToHours = (time:number):string => {
    return Math.floor(time / 3600).toString().padStart(2, "0");
}

export const secToMinutes = (time:number):string => {
    return Math.floor(time / 60).toString().padStart(2, "0");
}

export const timeFormat = (time: number): string => {
    if (time < 0) return "00:00:00";

    const hours = secToHours(time);
    const minutes = secToMinutes(time%3600);
    const seconds = (time % 60).toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
};


export const ignoreTime = (date:Date) => {
    return date.toISOString().split("T")[0];
}

export const getToday = () => {
    return new Date(new Date().toISOString().split("T")[0]);
}