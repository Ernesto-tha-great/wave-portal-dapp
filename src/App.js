import React, {useEffect, useState} from 'react';
import './App.css';
import {ethers} from 'ethers';
import abi from "./../src/utils/WavePortal.json"

function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const contractAddress = "0xbaD75D2062F40874d32594ad1D933753eD4091ea"
  const contractABI = abi.abi;


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
        const waveTxn = await wavePortalContract.wave();
        console.log("Mining: ", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash)


         count = await wavePortalContract.getTotalWaves();
        console.log("retrieved total wave count...", count.toNumber());
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
      </div>
    </div>
  );
}

export default App;
