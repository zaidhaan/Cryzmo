const {createWindowsInstaller} = require("electron-winstaller");
const {resolve, join} = require("path");
const settings = {
  appDirectory: resolve(join("release", "Cryzmo-win32-x64")),
  authors: "Vex",
  noMsi: true,
  outputDirectory: resolve(join("release", "windows")),
  exe: "Cryzmo.exe",
  setupExe: "CryzmoSetup.exe",
  setupIcon: resolve(join("assets", "icons", "icon.ico"))
};

console.log("Creating Windows Installer...");

createWindowsInstaller(settings).then(() => {
  console.log("Installer successfully created!");
}, (e)=>{
  console.log(`Failed to create the installer: ${e.message}`);
});
