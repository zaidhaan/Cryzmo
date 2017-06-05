const fs = require("fs");
const crypto = require("crypto");
const path = require("path");

function openTab(evt, name) {
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(name).style.display = "block";
  evt.currentTarget.className += " active";
}

function genPass(){
  document.getElementById("epass").value = crypto.randomBytes(10).toString("hex");
}

function startEncryption() {
  sendError("e", "");
  if(document.querySelector("input[id='filename']").value && document.querySelector("input[id='filename']").value !== ""){
    const p = path.resolve(document.querySelector("input[id='filename']").value);
    if(fs.existsSync(p)){
      if(document.getElementById("epass").value && document.getElementById("epass").value !== ""){
        beginEncryption(p, document.getElementById("epass").value);
      }else{
        sendError("e", "Please enter a password!");
      }
    }else{
      sendError("e", "Please enter a valid path!");
    }
  }else{
    sendError("e", "Please enter the full path of the file to encrypt!")
  }
}

function startDecryption() {
  sendError("d", "");
  if(document.querySelector("input[id='dfilename']").value && document.querySelector("input[id='dfilename']").value !== ""){
    const p = path.resolve(document.querySelector("input[id='dfilename']").value);
    if(fs.existsSync(p)){
      if(document.getElementById("dpass").value && document.getElementById("dpass").value !== ""){
        beginDecryption(p, document.getElementById("dpass").value);
      }else{
        sendError("d", "Please enter a password!");
      }
    }else{
      sendError("d", "Please enter a valid path!");
    }
  }else{
    sendError("d", "Please enter the full path of the file to decrypt!")
  }
}

function sendError(t,msg) {
  document.getElementById(`${t}warning`).innerText = msg;
}

function beginEncryption(data, pass){
  const key = pass;
  const outpath = path.join(path.dirname(data), path.win32.basename(data)+".cryzmo");
  let cipher = crypto.createCipher("aes192", key);
  let input = fs.createReadStream(data);
  let output = fs.createWriteStream(outpath);

  input.pipe(cipher).pipe(output);

  output.on("finish", () => {
    confirm(`Encrypted file written to ${outpath}`);
  });
}

function beginDecryption(data, pass){
  const key = pass;
  const outpath = path.join(path.dirname(data), path.win32.basename(data).substring(0, path.win32.basename(data).lastIndexOf(".")));
  let cipher = crypto.createDecipher("aes192", key);
  let input = fs.createReadStream(data);
  let output = fs.createWriteStream(outpath);

  input.pipe(cipher).pipe(output);

  output.on("finish", () => {
    confirm(`Decrypted file written to ${outpath}`);
  });
}

process.on("uncaughtException", e => {
  if(e.message.includes("EVP_DecryptFinal_ex:wrong final block length")){ // Not very effective but I don't see any other ways around it.
    alert("Could not decrypt file! Please ensure you have written the correct password!");
  }
});
