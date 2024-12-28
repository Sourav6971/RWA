// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PropertyTemplate {
    string public name;
    uint256 public totalShares;
    address public owner;
    mapping(address => uint256) public balances;

    event SharesTransferred(address indexed from, address indexed to, uint256 shares);

    constructor(string memory _name, uint256 _totalShares) {
        name = _name;
        totalShares = _totalShares;
        owner = msg.sender;
        balances[owner] = _totalShares;
    }

    function transferShares(address to, uint256 shares) public {
        require(balances[msg.sender] >= shares, "Not enough shares");
        balances[msg.sender] -= shares;
        balances[to] += shares;
        emit SharesTransferred(msg.sender, to, shares);
    }

    function getBalance(address account) public view returns (uint256) {
        return balances[account];
    }
}
