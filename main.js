// main.js
const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 360,
        height: 510,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // Hier wird das Standard-Verhalten zum Öffnen von externen Links überschrieben, um sie als Administrator zu öffnen
    win.webContents.on('new-window', (event, url) => {
        event.preventDefault();
        shell.openExternal(url, { admin: true });
    });

    win.loadFile('index.html');
}

app.whenReady().then(createWindow);

// Starte den Express-Server
require('./server.js');
