const conversion = 60*100;

const pomodaroConfig = {
    conversion, // seconds * 100
    sessionDuration: 25*conversion, 
    sessionCount: 4,
    breakDuration: 5*conversion,

    maxSessionDuration: 120*conversion, 
    minSessionDuration: 5*conversion, 
    maxBreakDuration: 30*conversion, 
    minBreakDuration: 1*conversion, 
    maxSessionCount: 10,
    minSessionCount: 1,

    autoStart: true,
    syncWithTimeTracking: true
}

export default pomodaroConfig;