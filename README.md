# modmapper
A library I'm making to simplify making modcharts in beat saber.

---
Template: 
```
import * as modmapper from 'modmapper'
import fs from 'fs';
const diff = "test.dat"

let data = fs.readFileSync(diff, "utf-8");

let json = JSON.parse(data);

// VVV code VVV



// ^^^ code ^^^

fs.writeFileSync(
    diff,
    JSON.stringify(json, null, 4)
);
```

Only single diff supported atm
