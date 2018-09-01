/* eslint-env node, mocha */
/* global artifacts, contract, it, assert, web3 */

/**
 * Here are the tests for our shop contract
 */

const TestShop = artifacts.require('TestShop');

let instance;

contract('TestShop', (accounts) => {
  it('Should deploy an instance of the TestShop contract', () => TestShop.deployed()
    .then((contractInstance) => {
      instance = contractInstance;
    }));

  it('Should add a new item', () => instance.addNewItem(web3.fromUtf8('SWORD'), 100, 500));

  it('Should get the SWORD item', () => instance.getItem(web3.fromUtf8('SWORD'))
    .then((item) => {
      assert.equal(item[0].toNumber(), 100, 'Item stock is wrong');
      assert.equal(item[1].toNumber(), 500, 'Item price is wrong');
    }));

  it('Should update the price of the SWORD item', () => instance.updateItemPrice(web3.fromUtf8('SWORD'), 600));

  it('Should update the stock of the SWORD item', () => instance.updateItemStock(web3.fromUtf8('SWORD'), 125));

  it('Should get the SWORD item', () => instance.getItem(web3.fromUtf8('SWORD'))
    .then((item) => {
      assert.equal(item[0].toNumber(), 125, 'Item stock is wrong');
      assert.equal(item[1].toNumber(), 600, 'Item price is wrong');
    }));

  it('Should buy a new item for player 0', () => instance.buy(accounts[0], 100, web3.fromUtf8('hey'))
    .catch((error) => {
      assert.include(error.message, 'revert', 'Add player should throw a revert');
    }));

  it('Should get the items of player 0', () => instance.getPlayerItems(accounts[0])
    .then((items) => {
      assert.equal(items.length, 0, 'No item should be bought');
    }));
});
