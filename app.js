const {app, ipcMain, BrowserWindow} = require("electron");
const path = require("path");
const url = require("url");
const fs = require("fs");

let win;

ipcMain.on("file-data", (event) => {
  try{
    let data = null;
    if (process.platform == "win32" && process.argv.length >= 2) {
      const openFilePath = process.argv[1];
      if(fs.lstatSync(openFilePath).isFile()){
        data = fs.readFileSync(openFilePath, "utf-8");
      }
    }
    event.returnValue = data;
  }catch(e){
    event.returnValue = null;
  }
});

function createWindow () {
  win = new BrowserWindow({titleBarStyle: "hidden",
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    frame: false,
    icon: path.join(__dirname, "assets/icons/64x64.png")
  });

  win.loadURL(url.format({
    pathname: path.join(__dirname, "index.html"),
    protocol: "file:",
    slashes: true
  }));

  win.once("ready-to-show", () => {
    win.show();
  });

  win.on("closed", function () {
    win = null;
  });
}

ipcMain.on("open-second-window", (event, arg)=> {
    secondWindow.show()
});


app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});
