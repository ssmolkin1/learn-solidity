const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
const { interface, bytecode } = require('../compile');

let accounts;
let lottery;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy the contract
  lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: '1000000' })
});

describe('Lottery', () => {
  it('deploys a contract', () => {
    assert.ok(lottery.options.address);
  });

//  it('has a default message', async () => {
//    const message = await lottery.methods.message().call();
//    assert.equal(message, INITIAL_STRING);
//  });
//
//  it('can change the message', async () => {
//    await lottery.methods.setMessage(SECOND_STRING).send({ from: accounts[0] });
//    const message = await lottery.methods.message().call();
//    assert.equal(message, SECOND_STRING);
//  });
});