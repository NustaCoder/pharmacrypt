pragma solidity ^0.5.0;

contract Marketplace{
    
    address payable public owner;
    string public name;
    address payable public left;
    address payable public right;
    uint256 public productCount = 0;
    uint256 public vendorCount = 0;
    mapping(uint256 => medicine) public products;
    mapping(uint256 => vendor) public vendors; 
    event doneTransfer(address payable _left, address payable _right, string _loc, uint256 _time, string _name);
    
    constructor () public{
        owner = msg.sender;
        left = owner;
        name = "shadow";
    }

    event medicineCreated(
        uint256 id,
        address mfg_owner,
        string med_name,
        string mfg_month,
        string exp_month,
        string batch_no,
        string mfg_location,
        uint256 med_price,
        uint256 med_amount,
        uint256 creation_time
    );
    
    struct medicine{
        uint256 _id;
        address mfg_owner;
        string med_name;
        string mfg_month;
        string exp_month;
        string batch_no;
        string mfg_location;
        uint256 med_price;
        uint256 med_amount;
        uint256 creation_time;
    }
    
    struct vendor{
        address ven_address;
        string location;
        uint256 _time;
        uint256 _id;
    }
    
    function createMedicine(
        address _mfg_owner,
        string memory _med_name,
        string memory _mfg_month,
        string memory _exp_month,
        string memory _batch_no,
        string memory _mfg_location,
        uint256 _med_price,
        uint256 _med_amount)
        public{
            
        productCount++;
        products[productCount] = medicine(productCount, _mfg_owner, _med_name, _mfg_month, _exp_month, _batch_no, _mfg_location, _med_price, _med_amount, block.timestamp);

        emit medicineCreated(productCount, _mfg_owner, _med_name, _mfg_month, _exp_month, _batch_no, _mfg_location, _med_price, _med_amount, block.timestamp);
        
    }
    
    function checkTransaction(address payable _ven_add, string memory _loc, uint256 _id) public{
        right = _ven_add;
        require(owner != right, 'error in address');
        vendorCount++;
        vendors[vendorCount] = vendor(_ven_add, _loc, block.timestamp, _id);
        emit doneTransfer(left, right, _loc, block.timestamp, products[_id].med_name);
        left = right;
    }
}