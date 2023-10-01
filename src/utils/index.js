import { surpriseMePrompts } from "../constants";
import FileSaver from 'file-saver'

// Function for the random prompt

export function getRandomPrompt(prompt) {
    const randomIndex  = Math.floor(Math.random()*surpriseMePrompts.length);
    const randomPrompt = surpriseMePrompts[randomIndex];
    if (randomPrompt === prompt) {
        return getRandomPrompt(prompt);
    }
    return randomPrompt;
}

// Function for the download the Image
export async function downloadImage(_id,photo){
    FileSaver.saveAs(photo,`download-${_id}.jpg`);
}

// Function for the download the Image on Creation Page
// generate random Id 

export async function downloadCreateImage(image){
    let id = "id" + Math.random().toString(16).slice(2);
    FileSaver.saveAs(image,`download-${id}.jpg`);
}