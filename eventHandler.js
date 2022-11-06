const logEvents = require('./logEvents');
const EventEmitter = require('events');

class EventHandler extends EventEmitter {}

const eventHandler = new EventHandler();
eventHandler.on('log', (msg, fileName) => logEvents(msg, fileName));

module.exports = eventHandler;
