const { expect } = require("chai");

describe("invoice", async function () {
    const testdata=['buyer','seller',10,'12.12.22']
    const Contract = await ethers.getContractFactory("invoice");
    const contract = await Contract.deploy();

   console.log(contract.address);
   
   it("Adding new invoice to the ledger and checking it",async function(){
      const txresponse=await contract.addTransaction(testdata[0],testdata[1],testdata[2],testdata[3]);
      txresponse.wait();
     const transaction=await contract.showTransaction(1);
      expect(transaction[1].to.equal(testdata[0]));
      expect(transaction[2].to.equal(testdata[1]));
      expect(transaction[3].to.equal(testdata[2]));
      expect(transaction[4].to.equal(testdata[3]));
    });
   
    it("Checks for buyer history",async function(){
      const txdata=await contract.getBuyerhistory('buyer');
      expect(txdata[0][1].to.equal(testdata[0]));
      expect(txdata[0][2].to.equal(testdata[1]));
      expect(txdata[0][3].to.equal(testdata[2]));
      expect(txdata[0][4].to.equal(testdata[3]));
    })

  });
