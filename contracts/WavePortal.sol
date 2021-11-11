// SPDX-License-Identifier:UNLICENSED
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
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

    constructor() {
        console.log("I do be a smart contract");
    }

    function wave(string memory _message) public {
        totalWaves += 1;

        console.log("%s has waves at you", msg.sender);

        // saving the wave in the array
        waves.push(Wave(msg.sender, _message, block.timestamp));

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