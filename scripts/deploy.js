const main = async () => {
     const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.001"),
    });
    await waveContract.deployed();

    console.log("wave portal address : ", waveContract.address);

    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();

    console.log("contract deployed by : ", deployer.address);
    console.log("account balance :", accountBalance.toString());
}

const runMain = async () => {
    try{
       await  main();
        process.exit(0);
    } catch(error) {
        console.error(error);
        process.exit(1);
    }
   
}

runMain();