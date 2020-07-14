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
    const foundText = array.find((value) => value.contains(textToFind));
    return foundText.split("|");
}

const getDatabaseValue = (databaseText, textToFind) => {
    const foundTextArray = splitDatabaseText(databaseText, textToFind);
    return Number.parseInt(foundTextArray[1]);
}

const updateClassTableText = () => {
    readMeText += "|Classes|Count|\n" +
        "|-|-|" +
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

const setDatabaseValue = (databaseText, textToFind) => {
    let textArray = splitDatabaseText(databaseText, textToFind);
    const newText = textArray[0] + "|" + newClassValue;
    const textToReplace = textArray[0] + textArray[1];
    databaseText.replace(textToReplace, newText);
}

// -- End Functions --

// -- Main --

let rollDatabaseText = fs.readFileSync('./rollDatabase.txt', 'utf8');
let classDatabaseText = fs.readFileSync('./classDatabase.txt', 'utf8');

const usersClass = getChosenClass();
const newClassValue = getDatabaseValue(classDatabaseText, usersClass);
const roll = getRoll(usersClass);

setDatabaseValue(classDatabaseText, usersClass);
setDatabaseValue(rollDatabaseText, roll.toString());

let readMeText =
    "# ROLL FOR INITIATIVE\n" +
    "### CHOOSE YOUR CLASS\n" +
    "[Warrior | +1 To Roll](https://github.com/benjaminsampica/benjaminsampica/issues/new?title=roll%7Cwarrior&body=Just+click+%27Submit+new+issue%27.)\n" +
    "[Cleric | +1 To Roll](https://github.com/benjaminsampica/benjaminsampica/issues/new?title=roll%7Ccleric&body=Just+click+%27Submit+new+issue%27.)\n" +
    "[Rogue | +3 To Roll](https://github.com/benjaminsampica/benjaminsampica/issues/new?title=roll%7Crogue&body=Just+click+%27Submit+new+issue%27.)\n" +
    "[Wizard | -1 To Roll](https://github.com/benjaminsampica/benjaminsampica/issues/new?title=roll%7Cwizard&body=Just+click+%27Submit+new+issue%27.)\n" +
    "### LAST ROLL BY\n";

updateClassTableText();
updateRollTableText();

readMeText += "![visitors](https://visitor-badge.glitch.me/badge?page_id=benjaminsampica)";
fs.writeFileSync('./README.md', readMeText);
fs.writeFileSync('./rollDatabase.txt', rollDatabaseText);
fs.writeFileSync('./classDatabase.txt', classDatabaseText);


