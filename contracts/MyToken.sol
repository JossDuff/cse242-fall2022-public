// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Token with faucet for testing purposes only
contract MyToken is ERC20 {

    constructor() ERC20("MyToken", "MYT") {
        _mint(msg.sender, 1000*1e18);
    }

    function mintMe(uint256 amount) external {
        _mint(msg.sender, amount*1e18);
    }
}