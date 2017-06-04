const {createWindowsInstaller} = require("electron-winstaller");
const {resolve, join} = require("path");
const url = require("url");
const settings = {
  appDirectory: resolve(join("release", "Cryzmo-win32-x64")),
  authors: "Vex",
  noMsi: true,
  outputDirectory: resolve(join("release", "windows")),
  exe: "Cryzmo.exe",
  setupExe: "CryzmoSetup.exe",
  setupIcon: resolve(join("assets", "icons", "icon.ico")),
  iconUrl: url.format({pathname: resolve(join("assets", "icons", "icon.ico")), protocol: "file:", slashes: true})
}

console.log("Creating Windows Installer...");

createWindowsInstaller(settings).then(() => {
  console.log("Installer successfully created!");
}, (e)=>{
  console.log(`Failed to create the installer: ${e.message}`);
});
