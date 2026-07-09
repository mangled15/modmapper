# modmapper
A library I'm making to simplify making modcharts in beat saber.

---

Only single diff supported atm

---
# How to use
### Make sure you have [Node](https://nodejs.org/en/download) installed and you can run `npm -v` in the terminal

- Open VSCode in the directory of your map, then in a terminal window run 
```bash
npm install github:mangled15/modmapper
```
and wait for it to install.

- Then create a new file with a .js extension

- Paste the template and start coding :)

- Run the file by running: 
```bash
node <YOUR-FILE-NAME>.js
```
in the terminal.

- If you get an error about some module you need to create a new file in the same directionary called `package.json` and paste the contents of modmapper's [package.json](https://github.com/mangled15/modmapper/blob/main/package.json)

- If you get any more errors or need help dm me but I have to set allis up which is going to take a while.

Will add way more in the future(maybe). Wiki will also come

---
# Template: 
``` javascript
import * as modmapper from "modmapper.js"
await modmapper.setDifficulty("ExpertPlusStandard.dat") // Make sure this matches the name of the diff you want to mod EXACTLY

// VVV code VVV



// ^^^ code ^^^

// Make sure you run this function AFTER your code else it won't pick it up. And if you don't run this function then well it doesn't write any custom data (duhhh!)
modmapper.writeToFile()
```
