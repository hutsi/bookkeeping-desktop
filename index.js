'use strict';
const {app, BrowserWindow} = require('electron');

const path = require('path')
const url = require('url');

require('electron-reload')(__dirname);


// adds debug features like hotkeys for triggering dev tools and reload
//require('electron-debug')();

// prevent window being garbage collected
let mainWindow;

function onClosed() {
    // dereference the window
    // for multiple windows store them in an array
    mainWindow = null;
}

function createMainWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    });

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/index.html'),
        protocol: 'file:',
        slashes: true
    }))
    win.on('closed', onClosed);

    return win;
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
    app.quit();
}
});

app.on('activate', () => {
    if (!mainWindow) {
    mainWindow = createMainWindow();
}
});

app.on('ready', () => {
    mainWindow = createMainWindow();
    mainWindow.openDevTools();
});

