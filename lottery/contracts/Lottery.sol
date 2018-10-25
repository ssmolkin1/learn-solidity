pragma solidity ^0.4.24;

contract Lottery {
    address public manager;
    address[] public players;

    constructor() public {
        manager = msg.sender;
    }

    modifier restricted() {
        require(msg.sender == manager, "Only the manager can run this function.");
        _;
    }
    
    function enter() public payable {
        require(msg.value > 0.01 ether, "Must deposit >0.01 ether to play.");
        players.push(msg.sender);
    }

    function getPlayers() public view returns (address[]) {
        return players;
    }

    function pickWinner() public restricted {
        uint256 index = random() % players.length;
        players[index].transfer(address(this).balance);
        players = new address[](0);
    }

    function random() private view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.difficulty, now, players)));
    }
}