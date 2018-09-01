# ERC20Shop

The goal of this project is to create a smart contract based shop accepting a specific [ERC20](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md) token as payment.
A simple use case for this project is a virtual shop for a game, selling items to the players.

This project contains a basic [ERC20](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md) token called `TestToken`. This token is compliant to the [ERC20](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md) but has an additional function called `buyFromShop()`.

The `buyFromShop()` will call a `buy()` function inside the shop contract.

## Usage

*A complete example can be found in the `ERC20Shop.test.js` file in the `test` folder.*
