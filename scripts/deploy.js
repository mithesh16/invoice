// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  
  
  const Invoice = await hre.ethers.getContractFactory("invoice");
  const invoice = await Invoice.deploy();

  await invoice.deployed();

  console.log("Contract deployed to", invoice.address);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
