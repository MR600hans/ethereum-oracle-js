pragma solidity ^0.4.19;


contract Oracle {
  address public owner;
  uint public btcPrice;

  event CallbackUpdateBTCPrice();
  event CallbackSendBTCPrice(uint price);

  function Oracle() public {
    owner = msg.sender;
  }

  function updateBTCPrice() public {
    CallbackUpdateBTCPrice();
  }

  function sendBTCPrice(uint _price) public {
    CallbackSendBTCPrice(_price);
  }

  function setBTCPrice(uint _price) public {
    require(msg.sender == owner);
    btcPrice = _price;
  }

  function getBTCPrice() public view returns (uint) {
    return btcPrice;
  }
}
