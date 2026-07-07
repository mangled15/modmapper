// I GOT A LOT OF USEFUL INFORMATION FROM https://heck.aeroluna.dev/ THEY HELPED ME A TON!!!

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
 * @param {any} diffJSON - JSON data of the difficulty
 * @param {number} beat - The beat the note is on that you want to animate
 * @param {noteAnimationProperties} properties - How should the note behave?
 */
export function animateNote(diffJSON, beat, properties) {
    if (diffJSON.colorNotes.forEach(note => {
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
 * @param {any} diffJSON - JSON data of the difficulty
 * @param {number} beat1 - The start beat
 * @param {number} beat2 - The end beat
 * @param {noteAnimationProperties} properties - How should the note behave?
 */
export function animateNoteInBetween(diffJSON, beat1, beat2, properties) {
    if (properties) {
        for (const note of diffJSON.colorNotes) {
            if (note.b >= beat1 && note.b <= beat2){
                note.customData = properties
            }
        }
    }
}

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
export function animateTrack(diffJSON, properties) {
    if (diffJSON && properties) {
        diffJSON.customData = {}
        diffJSON.customData.customEvents = []
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