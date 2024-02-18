// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "erc721a/contracts/ERC721A.sol";

contract DRB is ERC721A {
    address public owner;
    string public prompt="Robot in Interstellar with a Diesel Power Source fueling";
    uint256 public maxQuantity = 5;
    string baseUrl="https://moccasin-causal-slug-220.mypinata.cloud/ipfs/QmQ7EELqAys5jfUNZAvbDLSS6wvdg9HgT7pXCwJNa5x4L5";


    function promptDescription() external view returns (string memory) {
        return prompt;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseUrl;
    }

    constructor() ERC721A("DieselRobot", "DRB") {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only Owner");
        _;
    }

    function mint(uint256 quantity) external payable onlyOwner {
        require(
            totalSupply() + quantity <= maxQuantity,
            "You can not mint more than 5 NFTs"
        );
        _mint(msg.sender, quantity);
    }

    function getBalance(address _owner) external view returns (uint256) {
        return balanceOf(_owner);
    }

}
