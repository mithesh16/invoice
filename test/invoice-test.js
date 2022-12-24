const {expect}=require('chai');

describe("Invoice testing",function(){
  let contract;
  let accounts;
  const sellerpan="123"
  const buyerpan="456"
  const amt=10
  const date="24.12.22"

  const sellerpan2="1234"
  const amt2=12
  const date2="25.12.22"



  const testdata=[[buyerpan,sellerpan,amt,date],[buyerpan,sellerpan2,amt2,date2]]


  this.beforeAll(async function(){
    accounts=await ethers.getSigners()
    const owner=accounts[0]
    const account=accounts[1]
      const Contract=await hre.ethers.getContractFactory("invoice")
      contract=await Contract.deploy();
      await contract.deployed();
  })
  it("Should add a transaction",async function(){
        
        const tx=await contract.addTransaction(buyerpan,sellerpan,amt,date);
        const result=await contract.showTransaction(0);
        let _buyerpan=result[1]
        let _sellerpan=result[2]
        let _amt=result[3].toString()
        let _date=result[4]

        expect(buyerpan).to.equal(_buyerpan);
        expect(sellerpan).to.equal(_sellerpan)
        expect(amt.toString()).to.equal(_amt)
        expect(date).to.equal(_date)   
  })
  it("Should return the buyer history",async function(){
    const tx=await contract.addTransaction(buyerpan,sellerpan,amt,date);
    const tx2=await contract.addTransaction(buyerpan,sellerpan2,amt2,date2);
    const result=await contract.getBuyerHistory(buyerpan);
   
      let _buyerpan=result[0][1]
        let _sellerpan=result[0][2]
        let _amt=result[0][3].toString()
        let _date=result[0][4]
        
        expect(buyerpan).to.equal(_buyerpan);
        expect(sellerpan).to.equal(_sellerpan)
        expect(amt.toString()).to.equal(_amt)
        expect(date).to.equal(_date)  

         _buyerpan=result[2][1]
         _sellerpan=result[2][2]
         _amt=result[2][3].toString()
        _date=result[2][4]
        
        expect(buyerpan).to.equal(_buyerpan);
        expect(sellerpan2).to.equal(_sellerpan)
        expect(amt2.toString()).to.equal(_amt)
        expect(date2).to.equal(_date)  
    
  })
})

