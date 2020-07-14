// Cobbled together on nights between cans of caffeine and a bottle of RumChata.
const core = require('@actions/core');
const fs = require('fs');

// -- Functions --
const getRandomNumber = () => Math.floor((Math.random() * 20) + 1);
const getClassInitiativeBonus = chosenClass => {
    if(chosenClass === "warrior") return 1;
    if(chosenClass === "cleric") return 1;
    if(chosenClass === "rogue") return 3;
    if(chosenClass === "wizard") return -1;
    return 0;
};
const getChosenClass = () => {
    const title = core.getInput('title') || "roll|warrior";
    const titleArray = title.split(`|`);
    return titleArray[1];
}
const getRoll = (chosenClass) => {
    let roll = getRandomNumber() + getClassInitiativeBonus(chosenClass);
    return Math.min(roll, 1);
}

const splitDatabaseText = (databaseText, textToFind) => {
    const array = databaseText.split(",");
    const foundTextArray = array.find(a => a.includes(textToFind));
    return foundTextArray.split("|");
}

const getDatabaseValue = (databaseText, textToFind) => {
    const foundTextArray = splitDatabaseText(databaseText, textToFind);
    return Number.parseInt(foundTextArray[1]);
}

const updateClassTableText = () => {
    readMeText += "|Classes|Count|\n" +
        "|-|-|\n" +
        "|Warrior|" + getDatabaseValue(classDatabaseText, "warrior") + "\n" +
        "|Cleric|" + getDatabaseValue(classDatabaseText, "cleric") + "\n" +
        "|Rogue|" + getDatabaseValue(classDatabaseText, "rogue") + "\n" +
        "|Wizard|" + getDatabaseValue(classDatabaseText, "wizard") + "\n";
}

const updateRollTableText = () => {
    readMeText += "|Roll|Count|\n" +
        "|-|-|\n";
    
    for(let i = 23; i > 0; i--)
    {
        readMeText += `|${i}|` + getDatabaseValue(rollDatabaseText, `${i}`) + "\n";
    }
}

const setDatabaseValue = (databaseText, textToFind, newValue) => {
    let textArray = splitDatabaseText(databaseText, textToFind);
    const key = textArray[0] + "|";
    const newText = key + newValue;
    const textToReplace = key + textArray[1];
    databaseText.replace(textToReplace, newText);
}

// -- End Functions --

// -- Main --

let rollDatabaseText = fs.readFileSync('./rollDatabase.txt', 'utf8');
let classDatabaseText = fs.readFileSync('./classDatabase.txt', 'utf8');

const usersClass = getChosenClass();
const newClassValue = getDatabaseValue(classDatabaseText, usersClass);
const roll = getRoll(usersClass);

console.log(classDatabaseText);
setDatabaseValue(classDatabaseText, usersClass, newClassValue);
setDatabaseValue(rollDatabaseText, roll.toString(), roll.toString());
console.log(classDatabaseText);

let readMeText =
    "# ROLL FOR INITIATIVE\n" +
    "### CHOOSE YOUR CLASS\n" +
    "\n[Warrior | +1 To Roll](https://github.com/benjaminsampica/benjaminsampica/issues/new?title=roll%7Cwarrior&body=Just+click+%27Submit+new+issue%27.)\n" +
    "\n[Cleric | +1 To Roll](https://github.com/benjaminsampica/benjaminsampica/issues/new?title=roll%7Ccleric&body=Just+click+%27Submit+new+issue%27.)\n" +
    "\n[Rogue | +3 To Roll](https://github.com/benjaminsampica/benjaminsampica/issues/new?title=roll%7Crogue&body=Just+click+%27Submit+new+issue%27.)\n" +
    "\n[Wizard | -1 To Roll](https://github.com/benjaminsampica/benjaminsampica/issues/new?title=roll%7Cwizard&body=Just+click+%27Submit+new+issue%27.)\n" +
    "### LAST ROLL BY\n" +
    core.getInput('user') + 
    "\n\n";

updateClassTableText();
updateRollTableText();

readMeText += "\n![visitors](https://visitor-badge.glitch.me/badge?page_id=benjaminsampica)";
fs.writeFileSync('./README.md', readMeText);
fs.writeFileSync('./rollDatabase.txt', rollDatabaseText);
fs.writeFileSync('./classDatabase.txt', classDatabaseText);


