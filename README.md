# modmapper
A library I'm making to simplify making modcharts in beat saber.

---
Template: 
``` javascript
import * as modmapper from 'modmapper'
import fs from 'fs';
const diff = "ExpertPlusStandard.dat" // Make sure this matches the name of the diff you want to mod EXACTLY
let data = fs.readFileSync(diff, "utf-8"); // Reads what is in the .dat file
let json = JSON.parse(data); // Make JSON out of it or sum idk

// VVV code VVV



// ^^^ code ^^^

// Writes the new JSON contents in the .dat file
fs.writeFileSync(
    diff,
    JSON.stringify(json, null, 4)
);
```

Only single diff supported atm

---
# How to use
### Make sure you have [Node](https://nodejs.org/en/download) installed
Open VSCode in the directory of your map, then in a terminal window run `npm install github:mangled15/modmapper` and wait for it to install
Then create a new file with a .js extension
Paste the template and start coding :)

Will add way more in the future(maybe)
Wiki will also come
