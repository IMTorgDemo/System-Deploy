var path = require('path');
var bunyan = require('bunyan');
var bformat = require('bunyan-format');
var formatOut = bformat({ outputMode: 'short' });
var RotatingFileStream = require('bunyan-rotating-file-stream');

exports.log = bunyan.createLogger({
    name: 'web_app',
    streams: [{
            level: 'debug',
            stream: process.stdout
        },
        {
            level: 'info',
            type: 'raw',
            stream: new RotatingFileStream({
                path: path.join(global.config.logs.location, 'myapp-info.log'),
                rotateExisting: true, // Give ourselves a clean file when we start up, based on period
                threshold: '10k', // Rotate log files larger than 10 megabytes
                totalSize: '100k', // Don't keep more than 100kb of archived log files
                //gzip: true // Compress the archive log files to save space
            })
        },
        {
            level: 'error',
            type: 'raw',
            stream: new RotatingFileStream({
                path: path.join(global.config.logs.location, 'myapp-error.log'),
                rotateExisting: true, // Give ourselves a clean file when we start up, based on period
                threshold: '10k', // Rotate log files larger than 10 kilbytes
                totalSize: '100k', // Don't keep more than 100kb of archived log files
                //gzip: true // Compress the archive log files to save space
            })
        }
    ]
});