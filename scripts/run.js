const main = async () => {
    const [owner, johnDoe] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();
  
    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);
  
    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    console.log("Total Waves:", waveCount.toNumber());
    
    // lets send waves
    let waveTxn = await waveContract.wave("This is my wave mudafucker");
    await waveTxn.wait(); // wait for txn to be mined

    waveTxn = await waveContract.connect(johnDoe).wave("waving again from john doe");
    await waveTxn.wait(); // wait for txn to be mined

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