# Cryzmo
A simple cryptographic tool to encrypt your files. The files are encrypted with AES cipher.

**NOTE:** This tool is currently built only for windows. You could try making your own version of this for other OS's but it's not a priority for me now.

### Building
1. Install all dependencies. `npm install`
2. Package the app. `npm run package`
3. Build the installable. `npm run build`

And that's it! Any wanted changes could be made after installing the dependencies. After that just package it and build!

### FAQ
* **Why do I have to *write* the file path?**  
 Because the chromium that this runs on prevents the full path from being revealed when you *Browse* for files.


* **Will you make any versions of this for [insertNameOfOSthatIsNotWindows]?**  
Well, I only have a Windows, So I cannot debug or fix errors on how this would work on non-Windows machines.


* **I forgot the password I used to encrypt my file. Can I get it back?**  
Nope. The password is the *key* you used to encrypt your file, and that *key* is the only thing that can decrypt it.


* **Where can I directly download the executable for this?**  
You can download the setup from the [releases](https://github.com/TheVexatious/Cryzmo/releases).

#### TODO
* Better HTML Layout
* Add pictures to README
* covfefe


Feel free to contribute by sending PR's and creating issues!
