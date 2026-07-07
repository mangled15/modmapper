const fs = require("fs");

if (fs.existsSync("ExpertPlusStandard.dat")) {
    console.log("\x1b[32m%s\x1b[0m", "[OK] ExpertPlusStandard.dat found");
}
else {
    console.log("\x1b[31m%s\x1b[0m", "[CRITICAL] ExpertPlusStandard.dat not found");
}

const diff = "ExpertPlusStandard.dat"

let data = fs.readFileSync(diff, "utf-8");

let json = JSON.parse(data);

/**
 * Animates a note | Recommended to use with a for loop
 * @param {number} beat - The beat the note is on that you want to animate
 * @param {{
 * animation?: {
 * offsetPosition: [][]
 * rotation: [][]
 * scale?: [][]
 * }}} properties - Properties for the animation
 */
export function animateNote(beat, properties) {
    if (json.colorNotes.forEach(note => {
        if(note.b == beat) {
            note.customData = properties
        }
        else{
            console.log(`note on beat ${beat} not found`)
        }
    }));
}

/**
 * Animates a set of notes in between 2 beats(INCLUSIVE) using a for loop
 * @param {number} beat1 - The start beat
 * @param {number} beat2 - The end beat
 * @param {{
 * spawnEffect: boolean
 * animation?: {
 * offsetPosition: [][]
 * rotation: [][]
 * scale?: [][]
 * }}} properties - Properties for the animation
 */
export function animateNoteInBetween(beat1, beat2, properties) {
    if (properties) {
        for (const note of json.colorNotes) {
            if (note.b >= beat1 && note.b <= beat2){
                note.customData = properties
            }
        }
    }
}
console.log("\x1b[33m%s\x1b[0m", "[WARNING] writing to file...");
fs.writeFileSync(
    diff,
    JSON.stringify(json, null, 4)
);

console.log("\x1b[32m%s\x1b[0m", "[OK] Succesfully executed the script");
