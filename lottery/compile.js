const path = require('path');
const fs = require('fs');
const solc = require ('solc');

const contractPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const source = fs.readFileSync(contractPath, 'utf8');

// The second arg of solc.compile() is the number of contracts being compiled
module.exports = solc.compile(source, 1).contracts[':Lottery'];