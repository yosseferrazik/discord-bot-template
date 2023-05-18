const generic = require('generic-logs')
module.exports = () => {
    process.on('unhandledRejection', (reason, promise) => {
        generic.error('[ANTI-CRASH] unhandledRejection');
        generic.error(promise, reason);
    });

    process.on("uncaughtException", (err, origin) => {
        generic.error('[ANTI-CRASH] uncaughtException');
        generic.error(err, origin);
    });
    
    process.on('uncaughtExceptionMonitor', (err, origin) => {
        generic.error('[ANTI-CRASH] uncaughtExceptionMonitor');
        generic.error(err, origin);
    });
};