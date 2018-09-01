/* eslint-env node, mocha */
/* global artifacts, contract, it, assert, web3 */

/**
 * Here is the complete test
 */

const TestToken = artifacts.require('TestToken');
const TestShop = artifacts.require('TestShop');

let instance;
let testShopInstance;

contract('TestToken', (accounts) => {
  it('Should deploy an instance of the TestShop contract', () => TestShop.deployed()
    .then((contractInstance) => {
      testShopInstance = contractInstance;
    }));

  it('Should deploy an instance of the TestToken contract', () => TestToken.deployed()
    .then((contractInstance) => {
      instance = contractInstance;
    }));

  it('Should set the address of the TestShop', () => instance.setShopAddress(testShopInstance.address));

  it('Should set the address of the TestToken', () => testShopInstance.setTokenContractAddress(instance.address));

  it('Should add a new item', () => testShopInstance.addNewItem(web3.fromUtf8('COIN'), 100, 500));

  it('Should try to buy an item from the shop and pay with tokens', () => instance.buyFromShop(
    500,
    web3.fromUtf8('COIN'),
  ));

  it('Should get the items of player 0', () => testShopInstance.getPlayerItems(accounts[0])
    .then((items) => {
      assert.equal(web3.toUtf8(items[0]), 'COIN', 'Item is wrong');
    }));
});
