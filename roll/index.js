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
}
const getChosenClass = () => {
    const title = core.getInput('title') || "roll|warrior";
    const titleArray = title.split(`|`);
    return titleArray[1];
}
const getRoll = (chosenClass) => {
    let roll = getRandomNumber() + getClassInitiativeBonus(chosenClass);
    return Math.max(roll, 1);
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
const updateClassTableText = (databaseText) => {
    readMeText += "|Class|Count|\n" +
        "|-|-|\n" +
        "|Warrior|" + getDatabaseValue(databaseText, "warrior") + "|\n" +
        "|Cleric|" + getDatabaseValue(databaseText, "cleric") + "|\n" +
        "|Rogue|" + getDatabaseValue(databaseText, "rogue") + "|\n" +
        "|Wizard|" + getDatabaseValue(databaseText, "wizard") + "|\n";
}
const createClassLink = (chosenClass) => {
    return `https://github.com/benjaminsampica/benjaminsampica/issues/new?title=roll%7C${chosenClass}&body=Just+click+%27Submit+new+issue%27.`;
}
const updateRollTableText = (databaseText) => {
    readMeText += "|Roll|Count|\n" +
        "|-|-|\n";
    
    for(let i = 23; i >= 0; i--)
        readMeText += `|${i}|` + getDatabaseValue(databaseText, `-${i}-`) + "\n";
}
const setDatabaseValue = (databaseText, textToFind, newValue) => {
    let textArray = splitDatabaseText(databaseText, textToFind);
    const key = textArray[0] + "|";
    const newText = key + newValue;
    const textToReplace = key + textArray[1];

    return databaseText.replace(textToReplace, newText);
}

// -- End Functions --

// -- Main --

let rollDatabaseText = fs.readFileSync('./rollDatabase.txt', 'utf8');
let classDatabaseText = fs.readFileSync('./classDatabase.txt', 'utf8');

const usersClass = getChosenClass();
const newClassValue = getDatabaseValue(classDatabaseText, usersClass) + 1;
const roll = getRoll(usersClass);
const newRollValue = getDatabaseValue(rollDatabaseText, `-${roll}-`) + 1;

console.log(roll);
classDatabaseText = setDatabaseValue(classDatabaseText, usersClass, newClassValue);
rollDatabaseText = setDatabaseValue(rollDatabaseText, `-${roll}-`, newRollValue);

const user = core.getInput('user');
let readMeText =
    "# ROLL FOR INITIATIVE\n" +
    "### CHOOSE YOUR CLASS\n" +
    `\n[Warrior | +1 To Roll](${createClassLink("warrior")})\n` +
    `\n[Cleric | +1 To Roll](${createClassLink("cleric")})\n` +
    `\n[Rogue | +3 To Roll](${createClassLink("rogue")})\n` +
    `\n[Wizard | -1 To Roll](${createClassLink("wizard")})\n` +
    "### LAST ROLL BY\n" +
    `[${user}](https://www.github.com/${user}) - as a ${usersClass} rolled a ${roll}!` +
    "\n\n";

updateClassTableText(classDatabaseText);
readMeText += "\n";
updateRollTableText(rollDatabaseText);

fs.writeFileSync('./README.md', readMeText);
fs.writeFileSync('./rollDatabase.txt', rollDatabaseText);
fs.writeFileSync('./classDatabase.txt', classDatabaseText);


