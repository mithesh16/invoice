// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "@openzeppelin/contracts/access/Ownable.sol";
contract invoice is Ownable{
    struct Transaction{
        uint txID;
        string buyerPan;
        string sellerPan;
        uint amount;
        string date;
        bool paid;
    }
    mapping(string=>Transaction[]) public buyerHistory;
    Transaction[] public transactions;

    function addTransaction(string memory _buyerPan,string memory _sellerPan,uint _amount,string memory _date)public onlyOwner{
            uint _index=transactions.length;
            transactions.push(Transaction({
                txID:_index,
                buyerPan:_buyerPan,
                sellerPan:_sellerPan,
                amount:_amount,
                date:_date,
                paid:false
            }));
            buyerHistory[_buyerPan].push(transactions[_index]);
    }

    function showTransaction(uint _txID) public view returns(Transaction memory){
       Transaction memory _transaction=transactions[_txID];
        return(_transaction);
    }

    function getBuyerHistory(string memory panid) public view returns (Transaction[]memory){
        Transaction[] memory buyerhistory= buyerHistory[panid];
        return(buyerhistory);
    }
}
