const { app, BrowserWindow } = require('electron')
const path = require('path')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true
    }
  })

  mainWindow.loadFile(path.join(__dirname,'../../public/index.html'))
  
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools()
  }
  
  mainWindow.on('closed', function() {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})
