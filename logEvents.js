const dayjs = require('dayjs');
dayjs.extend(require('dayjs/plugin/customParseFormat'));

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, logName) => {
    const dateTime = `${dayjs().format('YYYY-MM-DD HH:mm:ss')}`;
    const logItem = `${dateTime}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, 'logs'));
        }

        await fsPromises.appendFile(
            path.join(__dirname, 'logs', logName),
            logItem
        );
    } catch (err) {
        console.log(err);
    }
};

module.exports = logEvents;
