pragma solidity ^0.4.19;


contract Oracle {
  address public owner;
  uint public btcPrice;

  event CallbackUpdateBTCPrice();
  event CallbackPriceUpdated();

  function Oracle() public {
    owner = msg.sender;
  }

  function updateBTCPrice() public {
    CallbackUpdateBTCPrice();
  }

  function priceUpdated() public {
    CallbackPriceUpdated();
  }

  function setBTCPrice(uint _price) public {
    require(msg.sender == owner);
    btcPrice = _price;
  }

  function getBTCPrice() public view returns (uint) {
    return btcPrice;
  }
}
