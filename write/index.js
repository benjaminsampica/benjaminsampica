const fs = require('fs');

const staticReadMeContent = 
    "# THIS REWROTE ROLL FOR INITIATIVE\n" +
    "\n" +
    "### CHOOSE YOUR CLASS\n" +
    "\n" +
    "    [Warrior | +1 To Roll](https://github.com/benjaminsampica/benjaminsampica/issues/new?title=roll%7Cwarrior&body=Just+click+%27Submit+new+issue%27.)\n" +
    "\n" +
    "    [Cleric | +1 To Roll](https://github.com/benjaminsampica/benjaminsampica/issues/new?title=roll%7Ccleric&body=Just+click+%27Submit+new+issue%27.)\n" +
    "\n" +
    "    [Rogue | +3 To Roll](https://github.com/benjaminsampica/benjaminsampica/issues/new?title=roll%7Crogue&body=Just+click+%27Submit+new+issue%27.)\n" +
    "\n" +
    "    [Wizard | -1 To Roll](https://github.com/benjaminsampica/benjaminsampica/issues/new?title=roll%7Cwizard&body=Just+click+%27Submit+new+issue%27.)\n" +
    "\n" +
    "![visitors](https://visitor-badge.glitch.me/badge?page_id=benjaminsampica)"

fs.writeFileSync('./README.md', staticReadMeContent);


