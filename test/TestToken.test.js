/* eslint-env node, mocha */
/* global artifacts, contract, it, assert */

/**
 * Here are some standard tests for our ERC20 token
 */

const TestToken = artifacts.require('TestToken');

let instance;

const tokenDecimals = 8;
const tokenTotalSupply = 21000000 * (10 ** tokenDecimals);

contract('TestToken', (accounts) => {
  it('Should deploy an instance of the TestToken contract', () => TestToken.deployed()
    .then((contractInstance) => {
      instance = contractInstance;
    }));

  it('Should check the name of the TestToken', () => instance.name()
    .then((name) => {
      assert.equal(name, 'TestToken', 'Name is wrong');
    }));

  it('Should check the symbol of the TestToken', () => instance.symbol()
    .then((symbol) => {
      assert.equal(symbol, 'TTK', 'Symbol is wrong');
    }));

  it('Should check the decimals of the TestToken', () => instance.decimals()
    .then((decimals) => {
      assert.equal(decimals.toNumber(), tokenDecimals, 'Decimals is wrong');
    }));

  it('Should check the total supply of the TestToken', () => instance.totalSupply()
    .then((totalSupply) => {
      assert.equal(totalSupply.toNumber(), tokenTotalSupply, 'Total supply is wrong');
    }));

  it('Should check the balance of accounts 0', () => instance.balanceOf(accounts[0])
    .then((balance) => {
      assert.equal(balance.toNumber(), tokenTotalSupply, 'Balance of account 0 is wrong');
    }));

  it('Should transfer some tokens', () => instance.transfer(accounts[1], 1 * (10 ** tokenDecimals)));

  it('Should check the balances of accounts 1', () => instance.balanceOf(accounts[1])
    .then((balance) => {
      assert.equal(balance.toNumber(), 1 * (10 ** tokenDecimals), 'Account 1 balance is wrong');
    }));
});
