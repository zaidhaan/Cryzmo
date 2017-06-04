const path = require("path");
const spawn = require("child_process").spawn;
const {app} = require("electron");
const updateExe = path.resolve(path.dirname(process.execPath), "..", "Update.exe");

function run(args, callback){
  spawn(updateExe, args, {
    detached: true
  }).on("close", callback);
};

function check(){
  if (process.platform == "win32") {
    const cmd = process.argv[1];
    const target = path.basename(process.execPath);

    if (cmd == "--squirrel-install" || cmd == "--squirrel-updated"){
      run([`--createShortcut=${target}`], app.quit);
      return true;
    }
    if (cmd === "--squirrel-uninstall"){
      run([`--removeShortcut=${target}`], app.quit);
      return true;
    }
    if (cmd === "--squirrel-obsolete"){
      app.quit();
      return true;
    }
  }
  return false;
};

module.exports = check();
