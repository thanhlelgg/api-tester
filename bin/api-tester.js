#!/usr/bin/env node
const spawn = require('cross-spawn');
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv
var parallel = '--no-parallel';
var jobCount = '4';
var timeout = 30000;

if (!argv.testFiles) {
  console.error('No test files set');
  return;
}

if (argv.jobCount) {
  jobCount = argv.jobCount;
}

if (argv.parallel) {
  console.log(`Running on Parallel mode with ${jobCount} jobs...`);
  parallel = '--parallel';
}

if (argv.timeout) {
  timeout = argv.timeout;
}

var output = spawn.sync('./node_modules/.bin/mocha', ['-t', timeout, '-r', 'ts-node/register', argv.testFiles, '--reporter', 'mochawesome', parallel, '--jobs', jobCount], { stdio: 'inherit' });
process.exitCode = output.status;
