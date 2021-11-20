const main = async () => {
    const [owner, johnDoe] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
    const waveContract = await waveContractFactory.deploy({
      value: hre.ethers.utils.parseEther('0.1'),
    });
    await waveContract.deployed();
  
    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);

    // get contract balance
    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("contract Balance", hre.ethers.utils.formatEther(contractBalance));
  

    
    // lets send waves
    let waveTxn = await waveContract.wave("This is my wave mudafucker");
    await waveTxn.wait(); // wait for txn to be mined

    waveTxn = await waveContract.connect(johnDoe).wave("waving again from john doe");
    await waveTxn.wait(); // wait for txn to be mined

   

    // get contract balance to see what happend
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("contract Balance", hre.ethers.utils.formatEther(contractBalance));

    //allwaves
    waveCount = await waveContract.getAllWaves();
    console.log("Total Waves:", waveCount);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();