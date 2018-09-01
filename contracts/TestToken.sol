pragma solidity 0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "openzeppelin-solidity/contracts/ownership/ownable.sol";


/* This is the interface of our shop */
contract ShopInterface {
  function buy(address buyer, uint price, bytes4 data) external;
}


/**
 * @title An ERC20 token linked to a shop
 * @author clemlak https://github.com/clemlak
 * @dev This token should be linked to a shop
 */
contract TestToken is StandardToken, Ownable {
  string public name = "TestToken";
  string public symbol = "TTK";
  uint public decimals = 8;
  uint public totalSupply = 21000000 * (10 ** decimals);

  ShopInterface public shop;

  constructor() public {
    totalSupply_ = totalSupply;
    balances[msg.sender] = totalSupply;
  }

  function setShopAddress(address shopAddress) external onlyOwner() {
    require(isContract(shopAddress) == true, "The receiver must be a contract");

    shop = ShopInterface(shopAddress);
  }

  function buyFromShop(uint price, bytes4 data) external {
    if (transfer(address(shop), price) == true) {
      shop.buy(msg.sender, price, data);
    }
  }

  function isContract(address to) private view returns (bool) {
    uint32 size;

    /* solhint-disable-next-line */
    assembly {
      size := extcodesize(to)
    }

    return (size > 0);
  }
}
