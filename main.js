const { app, BrowserWindow, Menu , shell, ipcMain} = require('electron')
const path = require('node:path')

const menuItems = [
  {
    label: "Menu",
  },
  {
    label: "File",
    submenu: [
      {
        label: "New",
        click: async () => {
          createWindow();
        },
      },
      {
        label: "Open Canva",
        click: async () => {
          const canvas = new BrowserWindow({
            height: 900,
            width: 1000,
          });

          ipcMain.on("close-window-2", () => canvas.close());

          canvas.webContents.openDevTools();
          canvas.loadFile("canvas.html");
          canvas.once("ready-to-show", () => canvas.show());
        },
      },
      {
        type: "separator",
      },
      {
        label: "Learn More About CDS",
        click: async () => {
          await shell.openExternal("https://www.cognitive-design-systems.com/");
        },
      },
      {
        type: "separator",
      },
      {
        label: "Exit",
        click: () => app.quit(),
      },
    ],
  },
  {
    label: "Window",
    submenu: [
      {
        role: "Minimize",
      },
      {
        role: "close",
      },
    ],
  },
];

const menu = Menu.buildFromTemplate(menuItems);
Menu.setApplicationMenu(menu);

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    height: 900,
    width: 1000,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('index.html')
  mainWindow.once("ready-to-show", () => mainWindow.show());


  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.