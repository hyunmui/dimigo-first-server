const logEvents = require('./logEvents');
const EventEmitter = require('events');

class EventHandler extends EventEmitter {
    constructor() {
        this.on('log', (msg, fileName) => logEvents(msg, fileName));
    }
}

module.exports = EventHandler;
