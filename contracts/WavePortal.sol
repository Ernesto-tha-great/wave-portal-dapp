// SPDX-License-Identifier:UNLICENSED
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    uint256 private seed;
    // events basically saves the arguement to the transaction log
    event NewWave(address indexed from, uint256 timestamp, string message);

    // a struct is a custom datatype where we can customize what we want to hold inside it
    struct Wave {
        address waver;   // the address of the user
        string message; //the message the user sent
        uint256 timestamp; // the time the user sent the message

    }
    // declare a variable waves that let you store an array of structs. here qwe hhold all the waves
    Wave[] waves;
    /*
     * This is an address => uint mapping, meaning I can associate an address with a number!
     * In this case, I'll be storing the address with the last time the user waved at us.
     */
    mapping(address => uint256) public lastWavedAt;

    constructor() payable {
        console.log("I do be a smart contract");
        // set the initial seed
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function wave(string memory _message) public {
        // make sure the current timestamp is atleast 15mins longer than the last time we waved
        require(lastWavedAt[msg.sender] + 30 seconds < block.timestamp, "Must wait 30 seconds before waving again.");
        // update the current timestamp for the user
        lastWavedAt[msg.sender] = block.timestamp;
        
        totalWaves += 1;

        console.log("%s has waved at you", msg.sender);

        // saving the wave in the array
        waves.push(Wave(msg.sender, _message, block.timestamp));

        // generate a new seed for the user that sends the wave and keeps it bet 0-100
        seed = (block.difficulty + block.timestamp + seed) % 100;

        // give a 50 percent chance of winning the price
        if (seed <= 50) {
            console.log("%s won!", msg.sender);

            // send ether to the user
        uint256 prizeAmount =  0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "You don't have enough ether to send"
            );

            //send the money to the user
            (bool success,) = (msg.sender).call{value: prizeAmount}("");
            // check if it was a success if not return message
            require(success, "Failed to send ether");
        }

        emit NewWave(msg.sender, block.timestamp, _message);
    }


    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }


    function getTotalWaves() public view returns (uint256) {
        console.log("we have had a total of %d view", totalWaves);

        return totalWaves;
    }
}