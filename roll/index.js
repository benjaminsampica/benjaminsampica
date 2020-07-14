const core = require('@actions/core');

let getRandomNumber = () => Math.floor((Math.random() * 20) + 1);
let getClassInitiativeBonus = chosenClass => {
    if(chosenClass === "warrior") return 1;
    if(chosenClass === "cleric") return 1;
    if(chosenClass === "rogue") return 3;
    if(chosenClass === "wizard") return -1;
};

const title = core.getInput('title') || "roll|warrior";
const titleArray = title.split(`|`);

let roll = getRandomNumber() + getClassInitiativeBonus(titleArray[1]);
console.log(roll);

return roll;



