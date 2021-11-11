import React, {useEffect, useState} from 'react';
import './App.css';
import {ethers} from 'ethers';
import abi from "./../src/utils/WavePortal.json"

function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [allWaves, setAllWaves] = useState([]);
  const contractAddress = "0x23f0B55f4928AdB1Aef32E6c7e0594E99aE51101"
  const contractABI = abi.abi;

  const getAllWaves = async () => {
      try{
        const {ethereum} = window;
        if(ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

          // calling thwe getAllWaves function from the contract
          const waves = await wavePortalContract.getAllWaves();

          // we only need address, timestamp and message in the ui

          let wavesRefactored = [];
          waves.forEach(wave => {
            wavesRefactored.push({
              address: wave.waver,
              timestamp: new Date(wave.timestamp * 1000),
              message: wave.message
            })
          })

          setAllWaves(wavesRefactored);
        }else {
          console.log("connect metamask wallet")
        }
      } catch(error){
          console.log(error)
      }
  }

  const checkIfWalletIsConnected = async () => {
    
    try {
     
          /*
          * First make sure we have access to window.ethereum
          */
          const { ethereum } = window;
          if (!ethereum) {
            console.log("Make sure you have metamask!");
            return;
          } else {
            console.log("We have the ethereum object", ethereum);
          }
       


      // checking if we are authorized to acccess the user's accounts
      const accounts = await ethereum.request({method:"eth_accounts"});
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("found an authorized account:  ", account);  
        setCurrentAccount(account);
      } else {
        console.log("no authorized accounts found");
      }
    } catch (error) {
      console.log("error", error);
    }
  }

   // connect wallet button
   const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]); 
    } catch (error) {
      console.log(error)
    }

  }

  // wave

  const wave = async () => {
    try{
      const {ethereum} = window;
      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await wavePortalContract.getTotalWaves();
        console.log("retrieved total wave count...", count.toNumber());

        //  actual wave
        const waveTxn = await wavePortalContract.wave("This is an expensive message");
        console.log("Mining: ", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash)


         count = await getAllWaves();
        
      }else {
        console.log("No ethereum");
      }
    } catch(error){
      console.log(error);
    }
  }
 
  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
  <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
        👋 Hey there!!
        </div>

        <div className="bio">
          I know this is really  basic but the idea is to get react work with solidity. cool right? Connect your Ethereum wallet and wave at me!
        </div>

        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>

         {/* If there is no currentAccount render this button */}
        {!currentAccount && (
          <button onClick={connectWallet} className="waveButton">
            Connect Wallet
          </button>
        )}

        {
          allWaves.map((wave, index )=> (
            <div key={index} style={{ backgroundColor: "oldLace", marginTop: "16px", padding: "8px" }}>
            <div> Address: {wave.address} </div>
            <div>Time stamp : {wave.timestamp.toString()} </div>
            <div> Message: {wave.message}  </div>

            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
