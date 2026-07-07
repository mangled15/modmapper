# modmapper
A library I'm making to simplify making modcharts in beat saber.

---
Template: 
```
const diff = "ExpertPlusStandard.dat"

let data = fs.readFileSync(diff, "utf-8");

let json = JSON.parse(data);

// VVV CODE VVV



// ^^^ CODE ^^^

fs.writeFileSync(
    diff,
    JSON.stringify(json, null, 4)
);
```

Single diff supported atm
