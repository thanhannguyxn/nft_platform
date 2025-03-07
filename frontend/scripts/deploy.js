//This function for getting the contract address
const hre = require('hardhat');

async function main() {
    // Ensure that `ethers` is loaded from the Hardhat environment
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const Contract = await hre.ethers.getContractFactory("NFTMarket");
    const contract = await Contract.deploy();

    console.log("Contract deployed to:", contract.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
