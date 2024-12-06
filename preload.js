const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  // getImage: (callback) => ipcRenderer.on("get-image", callback),
  // closeWindow2: () => ipcRenderer.send("close-window-2"),
});
