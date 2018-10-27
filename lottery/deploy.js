const fs = require('fs');
const path = require('path');
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider( 
  'normal cube seminar weird infant sweet firm velvet silly wing pyramid during',
  'https://rinkeby.infura.io/v3/373ac1fa8ecf4e8f826021e681b18976'
);

const web3 = new Web3(provider);

fs.writeFile(path.join(__dirname, 'deploy_interface'), interface, 'utf8', (err) => {
  if (err) throw err;
});

(async () => {
  const accounts = await web3.eth.getAccounts();
  
  console.log('Attempting to deploy from account ', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  fs.writeFile(path.join(__dirname, 'deploy_address'), result.options.address, 'utf8', (err) => {
    if (err) throw err;
  });

  console.log('Contract deployed to ', result.options.address);
  console.log(`Interface: ${interface}`);
})();
