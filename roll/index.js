﻿const core = require('@actions/core');
const github = require('@actions/github');

try {
    const title = core.getInput('title');
    console.log(`Hello ${title}!`);
} catch (error) {
    core.setFailed(error.message);
}
