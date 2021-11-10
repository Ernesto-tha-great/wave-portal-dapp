

const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();

    console.log("contract deployed by : ", deployer.address);
    console.log("account balance :", accountBalance.toString());


    const Token = await hre.ethers.getContractFactory("WavePortal");
    const Portal = await Token.deploy();
    await Portal.deployed();

    console.log("wave portal address : ", Portal.address);
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