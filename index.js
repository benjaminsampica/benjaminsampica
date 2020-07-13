const core = require('@actions/core');
const github = require('@actions/github');

try {
    const chosenClass = core.getInput('class');
    console.log(`Hello ${chosenClass}!`);
} catch (error) {
    core.setFailed(error.message);
}
