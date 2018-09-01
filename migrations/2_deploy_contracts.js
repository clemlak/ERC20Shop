/* eslint-env node */
/* global artifacts */

const TestShop = artifacts.require('TestShop');
const TestToken = artifacts.require('TestToken');

function deployContracts(deployer) {
  deployer.deploy(TestShop);
  deployer.deploy(TestToken);
}

module.exports = deployContracts;
