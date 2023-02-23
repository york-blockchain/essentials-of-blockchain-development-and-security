// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.19;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.8/contracts/token/ERC20/ERC20.sol";

contract YorkCoin is ERC20 {
    constructor(uint256 initialSupply) ERC20("YorkCoin", "YC") {
        _mint(msg.sender, initialSupply);
    }
    
    mapping (address => uint256) public balances;
  
    function myBalance() view public returns (uint256)  {
        return address(this).balance;
    }
    
    function store() payable public {
        balances[msg.sender] = msg.value;
    }
    
    function retrieve() payable public {
        uint256 val = balances[msg.sender];
        (bool success, ) = msg.sender.call{value:val}("");
        require(success,"failed");
        balances[msg.sender] = 0;
    }
    
    function getBalance() view public returns (uint256)  {
        return balances[msg.sender];
    }
}