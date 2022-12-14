import { ethers } from 'ethers';
import React, { useState }  from 'react';
import './App.css';

function App() {
let [account,setAccount]=useState("");
let [sellerpan,setSellerpan]=useState("");
let [buyerpan,setBuyerpan]=useState("");
let [amount,setAmount]=useState("");
let [date,setDate]=useState("");
let [searchid,setSearchid]=useState("");

function changeSeller (event) {
  setSellerpan(event.target.value);}

const changeBuyer = event => {
    setBuyerpan(event.target.value);}
    
const changeAmount = event => {
      setAmount(event.target.value);}
      
const changeDate = event => {
        setDate(event.target.value);}
const changeSearch=event=>{
  setSearchid(event.target.value);
}

 const{ethereum}=window;
 let contract;
 let tabledata;
let html;


const connectMetamask=async()=>{
  if(window.ethereum !== "undefined"){
    const accounts=await ethereum.request({method:"eth_requestAccounts"});
    setAccount(accounts[0]);
    const address="0x0e98F29c59678275f8E4881c0f7410cdCd5538e4";
    const ABI=[
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "previousOwner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_buyerPan",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_sellerPan",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "_amount",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "_date",
            "type": "string"
          }
        ],
        "name": "addTransaction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "buyerHistory",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "txID",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "buyerPan",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "sellerPan",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "date",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "paid",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "panid",
            "type": "string"
          }
        ],
        "name": "getBuyerHistory",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "txID",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "buyerPan",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "sellerPan",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "date",
                "type": "string"
              },
              {
                "internalType": "bool",
                "name": "paid",
                "type": "bool"
              }
            ],
            "internalType": "struct invoice.Transaction[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_txID",
            "type": "uint256"
          }
        ],
        "name": "showTransaction",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "txID",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "buyerPan",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "sellerPan",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "date",
                "type": "string"
              },
              {
                "internalType": "bool",
                "name": "paid",
                "type": "bool"
              }
            ],
            "internalType": "struct invoice.Transaction",
            "name": "",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "transactions",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "txID",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "buyerPan",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "sellerPan",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "date",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "paid",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ];
    const provider=new ethers.providers.Web3Provider(window.ethereum);
    const signer=provider.getSigner();
    contract=new ethers.Contract(address,ABI,signer);
    console.log(contract.address);
  }
}

const addInvoice=async(event)=>{
event.preventDefault();
const txresponse = await contract.addTransaction(buyerpan,sellerpan,amount,date);
const txreciept=await txresponse.wait();
console.log(txreciept);
 console.log(sellerpan,buyerpan,amount,date)
}

const showBuyerhistory=async(event1)=>{
  event1.preventDefault(); 
  tabledata=await contract.getBuyerHistory(searchid);
  html="<table><tr><th>ID</th><th>BUYER</th><th>SELLER</th><th>AMOUNT</th><th>DATE</th><th>PAID</th></tr>"
  for(let i=0;i<tabledata.length;i++){
    html+=`<tr><td>${tabledata[i][0]}</td> <td>${tabledata[i][1]}</td> <td>${tabledata[i][2]}</td> <td>${tabledata[i][3]}</td> <td>${tabledata[i][4]}</td> <td>${tabledata[i][5]}</td></tr>`
  }
  html+="</table>"
const tablediv=document.getElementById("table");
tablediv.innerHTML=html
}

const showTransaction=async(event2)=>{
  event2.preventDefault(); 
  let txdata=await contract.showTransaction(searchid);
  html="<table><tr><th>ID</th><th>BUYER</th><th>SELLER</th><th>AMOUNT</th><th>DATE</th><th>PAID</th></tr>"
  html+=`<tr><td>${txdata[0]}</td> <td>${txdata[1]}</td> <td>${txdata[2]}</td> <td>${txdata[3]}</td> <td>${txdata[4]}</td> <td>${txdata[5]}</td></tr>`
  html+="</table>"
const tablediv=document.getElementById("table");
tablediv.innerHTML=html
}




return (
    <div className="App">
      <header className="App-header">
        <h1>Invoice Ledger</h1> 
        <button className="connect" onClick={connectMetamask}>Connect Metamask</button>
        <div className="SearchField">
        <input className="SearchBar" type="text" placeholder="Enter PAN or TX ID" onChange={changeSearch}/>
        <button type="submit" onClick={showBuyerhistory}>SearchPAN</button>
        <button type="submit" onClick={showTransaction}>SearchID</button>
        </div>
        <div  id='table' >
        
        </div>
        <p>Account:{account}</p>
        <div className="form">
          <h2>ADD NEW INVOICE</h2>
          <form onSubmit={addInvoice}>
            <label>BUYER PAN ID</label>
            <input id='buyerpan' type="text" placeholder="Enter Buyer PAN" onChange={changeBuyer}></input>
            <br/>
            <label>SELLER PAN ID</label>
            <input id='sellerpan' type="text" placeholder="Enter Seller PAN" onChange={changeSeller}></input>
           <br/>
            <label>AMOUNT</label>
            <input id='amount' type="text" placeholder="Enter Amount" onChange={changeAmount}></input>
            <br/>
            <label>DATE</label>
            <input id='date' type="text" placeholder="Enter Date" onChange={changeDate}></input>
              <br />
            <button type="submit" >ADD</button>
          
          </form>
        </div>
       
      
      
      
      </header> 
    </div>
  );
}

export default App;
