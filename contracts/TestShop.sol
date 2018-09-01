pragma solidity 0.4.24;

import "openzeppelin-solidity/contracts/ownership/ownable.sol";


/**
 * @title A shop accepting a specific ERC20 token as payment
 * @author clemlak https://github.com/clemlak
 * @dev This contract must be linked to a token
 */
contract TestShop is Ownable {
  mapping (bytes4 => uint) public itemsToStocks;
  mapping (bytes4 => uint) public itemsToPrices;
  mapping (address => bytes4[]) public playersToItems;

  address public tokenContratAddress;

  function setTokenContractAddress(address newTokenContratAddress) external onlyOwner() {
    require(isContract(newTokenContratAddress) == true, "The address is not a contract");

    tokenContratAddress = newTokenContratAddress;
  }

  function buy(address buyer, uint price, bytes4 data) external {
    require(msg.sender == tokenContratAddress, "Function must be calleed from the token contract");

    require(itemsToPrices[data] == price, "Price is to low to buy this item");
    require(itemsToStocks[data] > 0, "Item is sold out");

    addPlayerItem(buyer, data);
  }

  function updateItemStock(bytes4 item, uint newStock) external onlyOwner() {
    itemsToStocks[item] = newStock;
  }

  function updateItemPrice(bytes4 item, uint newPrice) external onlyOwner() {
    itemsToPrices[item] = newPrice;
  }

  function addNewItem(bytes4 item, uint stock, uint price) external onlyOwner() {
    itemsToPrices[item] = price;
    itemsToStocks[item] = stock;
  }

  function getItem(bytes4 item) external view returns (
    uint,
    uint
  ) {
    return (itemsToStocks[item], itemsToPrices[item]);
  }

  function getPlayerItems(address playerAddress) external view returns (bytes4[]) {
    return playersToItems[playerAddress];
  }

  function addPlayerItem(address playerAddress, bytes4 data) internal {
    playersToItems[playerAddress].push(data);
    itemsToStocks[data] -= 1;
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
