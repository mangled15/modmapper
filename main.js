// I GOT A LOT OF USEFUL INFORMATION FROM https://heck.aeroluna.dev/ THEY HELPED ME A TON!!!

import fs from 'node:fs'

const colors = {
    reset: "\x1b[0m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    bold: "\x1b[1m",
};

console.log(colors.green, "[OK] Started " + import.meta.filename, colors.reset)

async function fileExists(path) {
    try {
        await fs.promises.access(path);
        console.log(colors.green, `[OK] ${path} found!`, colors.reset)
        return true;
    } catch (err) {
        console.log(colors.magenta, `[CRITICAL] VVV Wrong file name? File does not exist? VVV`, colors.reset)
        console.error(err)
        console.log(colors.magenta, `[CRITICAL] ^^^ Wrong file name? File does not exist? ^^^`, colors.reset)
        return false;
    }

}

let difficulty
let data
let diffJSON

/**
 * 
 * @param {string} diff - Pass in the name of the difficulty you want to edit with modmapper 
 */
export async function setDifficulty(diff) {
    difficulty = diff
    const found = await fileExists(difficulty)
    if (found) {
        data = fs.readFileSync(difficulty, "utf-8")
        diffJSON = JSON.parse(data)

        // erasing previous custom data
        diffJSON.customData = {}
        diffJSON.customData.customEvents = []
        diffJSON.customData.environment = []
        diffJSON.colorNotes.forEach(note => {
            delete note.customData
        })
        diffJSON.basicBeatmapEvents.forEach(event => {
            delete event.customData
        })
    }
    else {
        console.log(colors.magenta, `[CRITICAL] Could not find ${difficulty} in the current directonary`, colors.reset)
        return;
    }
}

// --- NOTES ---
/**
 * @typedef {Object} noteAnimationProperties
 * @property {boolean} [spawnEffect] - Should the note have a spawn effect? Either true or false. Default = true
 * @property {boolean} [disableNoteGravity] - When true, notes will no longer do their animation where they float up. Default = false
 * @property {boolean} [disableNoteLook] - When true, notes will no longer rotate towards the player. Default = false
 * @property {boolean} [disableBadCutDirection] - When true, the note cannot be cut from wrong direction. Default = false
 * @property {boolean} [disableBadCutSpeed] - When true, the note cannot be cut with insufficient speed. Default = false
 * @property {boolean} [disableBadCutSaberType] - When true, the note cannot be cut with the wrong saber. Default = false
 * @property {string} [link] - When cut, all notes with the same link string will also be cut.
 * @property {boolean} [uninteractable] - When true, the note/wall cannot be interacted with. This means notes cannot be cut and walls will not interact with sabers/putting your head in the wall. Notes will still count towards your score.
 * @property {string} [track] - A very powerful property. Assigns a track to an object. You can animate a track so that all of the objects assigned to that track get animated as well at the same time.
 * @property {{
 *      position?: [][]
 *      localPosition?: [][]
 *      offsetPosition?: [][]
 *      definitePosition?: [][]
 *      rotation?: [][]
 *      localRotation?: [][]
 *      offsetWorldRotation?: [][]
 *      dissolve?: [][]
 *      dissolveArrow?: [][]
 *      scale?: [][]
 * }} [animation]
 */

/**
 * Animates a note | Recommended to use with a for loop
 * @param {number} beat - The beat the note is on that you want to animate
 * @param {noteAnimationProperties} properties - How should the note behave?
 */
export function animateNote(beat, properties) {
    if (diffJSON.colorNotes.forEach(note => {
        if (note.b == beat) {
            note.customData = properties
        }
    }));
}

/**
 * Animates a set of notes in between 2 beats(INCLUSIVE) using a for loop
 * @param {number} beat1 - The start beat
 * @param {number} beat2 - The end beat
 * @param {noteAnimationProperties} properties - How should the note behave?
 */
export function animateNoteInBetween(beat1, beat2, properties) {
    if (properties) {
        for (const note of diffJSON.colorNotes) {
            if (note.b >= beat1 && note.b <= beat2) {
                note.customData = properties
            }
        }
    }
}

// --- TRACKS ---

/**
 * @typedef {Object} animateTrackProperties
 * @property {string} track - What track should be animated?
 * @property {number} duration - How many beats should the track animation last?
 * @property {number} beat - On what beat should the animation start?
 * @property {number} [repeat] - How many times does this animation repeat?
 * @property {{
 *      position?: [][]
 *      localPosition?: [][]
 *      offsetPosition?: [][]
 *      definitePosition?: [][]
 *      rotation?: [][]
 *      localRotation?: [][]
 *      offsetWorldRotation?: [][]
 *      dissolve?: [][]
 *      dissolveArrow?: [][]
 *      scale?: [][]
 *      easing?: string
 * }} animation
 */

/**
 * Animates a track
 * @param {animateTrackProperties} properties
 */
export function animateTrack(properties) {
    if (diffJSON && properties) {
        const b = properties.beat
        const t = "AnimateTrack"
        const d = {
            track: properties.track,
            ...properties.animation,
            duration: properties.duration,
            easing: properties.animation.easing,
            repeat: properties.repeat
        }

        const newProperties = {
            b,
            t,
            d,
        }

        diffJSON.customData.customEvents.push(newProperties)
    }
}

// --- ENVIRONMENT ---

/**
 * @typedef {"Regex"|"Exact"|"Contains"|"StartsWith"|"EndsWith"} LookupMethod
 */

/**
 * @typedef {Object} modifyEnvironmentProperties
 * @property {string} id - Enter the id of the EnvironmentObject
 * @property {LookupMethod} lookupMethod - What method should be used to look up the object? Regex, Exact, Contains, StartsWith, EndsWith. Default = Regex
 * @property {number} [duplicate] - How many duplicates should be made of the object?
 * @property {boolean} [active] - Should the object activated? | true or false. Default = true
 * @property {any} [position] - Where should the object be positioned?
 * @property {any} [rotation] - How should the object be rotated?
 * @property {any} [scale] - How big should the object be?
 * @property {any} [localPosition] - Where should the object be positioned relitive to it's set position?
 * @property {any} [localRotation] - How should the object be rotated relative to it's set rotation??
 * @property {any} [track] - What track should be assigned to the object?
 * @property {{
 *      ILightWithId?: {
 *          lightID?: number
 *          type?: number
 *      }
 *      BloomFogEnvironment?: {
 *          attenuation?: number
 *          startY?: number
 *          height?: number
 *      }
 *      TubeBloomPrePassLight?: {
 *          colorAlphaMultiplier?: number
 *          bloomFogIntensityMultiplier?: number
 *      }
 * }} [components]
 */

/**
 * Used to modify(NOT ANIMATE) objects in the environment. It can be pretty complicated. For more information and guides go to the modmapper wiki(Doesn't exist yet)
 * @param {modifyEnvironmentProperties} properties
 */
export function modifyEnvironment(properties) {
    if (diffJSON && properties) {
        diffJSON.customData.environment.push(properties)
    }
}

// --- LIGHTS ---

/**
 * @typedef {Object} lightEventProperties
 * @property {number} [lightID] - What ID does the light event get?
 * @property {number} [brightness] - How bright should the light be? 1 is default brightness but can go way above or below.
 * @property {any} [color] - What color should the light be? You can set this is chromapper or manually do it here. Look at the wiki on how you should input colors.
 * @property {string} [easing] - What easing style should the light event have?
 * @property {string} [lerpType] - What lerping should the light even have? Either "RGB" or "HSV"
 */

/**
 * Used to edit a light event at a certain beat, recommended to use with a for loop.
 * @param {number} beat - At what beat should the light even take place?
 * @param {lightEventProperties} properties - What properties should the light event have?
 */
export function editLightEvent(beat, properties) {
    if (diffJSON && properties) {
        diffJSON.basicBeatmapEvents.forEach(event => {
            if (event.b == beat) {
                event.f = properties.brightness
                let newProperties = {
                    lightID: properties.lightID,
                    color: properties.color,
                    easing: properties.easing,
                    lerpType: properties.lerpType
                }
                event.customData = newProperties
            }
        })
    }
}

// --- WRITING TO FILE ---

/**
 * Writes the custom data to the file you have set with modmapper.setDifficulty
 */
export function writeToFile() {
    if (diffJSON) {
        console.log(colors.yellow, `[WARNING] writing to ${difficulty}...`, colors.reset)
        fs.writeFileSync(
            difficulty,
            JSON.stringify(diffJSON, null, 4)
        );
        console.log(colors.green, "[OK] Succesfully written to " + difficulty, colors.reset)
    }
    else {
        console.log(colors.red, `[ERROR] Error writing to ${difficulty}, did you set the correct difficulty name?`, colors.reset)
        return
    }
}