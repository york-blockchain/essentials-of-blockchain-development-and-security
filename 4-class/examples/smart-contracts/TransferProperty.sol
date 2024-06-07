//SPDX-License-Identifier:MIT

pragma solidity ^0.8.10;

// We're making this use case for mimicking the real world property transfer
// Pre-requisite of this use case is that:
// A digital identity is in-place
// Govt agrees to put the land records on the public blockchain
// Each Development Authority (DA) becomes the defacto owner of the property that exist under their constituency/legislative body
// When all the above conditions are met, then DA(owner) can easily attach the respective property to their rightful owner after thorough verification.
// we shall be formulating the function around this set assumption.
// we're assuming that each DA shall deploy their own smart contract as per their rule and regulation. This whole smart contract is written by considering DA as the owner, who can allot property.
// A govt can become a layer on top of these DA. and the Govt can decide, which DA(address) becomes the owner of which contituency.
// We can extend this easily. But after going through this smart contract, you shall be able to figure out, how the things might work.
contract PropertyTransfer {
    address public DA; // DA shall be the owner, we shall be initializing this variable's value by the address of the user who's going to deploy it. e.g. let's say DA itself.

    uint256 public totalNoOfProperty; // total no of properties under a DA at any point of time. they should increase as per the allotment to their respective owner after verification.

    // Below is the constructor whose code is run only when the contract is created.
    constructor() {
        DA = msg.sender; // setting the owner of the contract as DA.
    } // modifier to check the tx is coming from the DA(owner) or not

    modifier onlyOwner() {
        require(msg.sender == DA);
        _;
    }
    // This structure is kept like this for storing a lot more information than just the name
    struct Property {
        string name; //keeping the map of the property against each address. we shall provide name to the property
        bool isSold; // we're keeping the count as well for each address
    }
    mapping(address => mapping(uint256 => Property)) public propertiesOwner; // we shall have the properties mapped against each address by its name and it's individual count.
    mapping(address => uint256) individualCountOfPropertyPerOwner; // how many property does a particular person hold

    event PropertyAlloted(
        address indexed _verifiedOwner,
        uint256 indexed _totalNoOfPropertyCurrently,
        string _nameOfProperty,
        string _msg
    );

    event PropertyTransferred(
        address indexed _from,
        address indexed _to,
        string _propertyName,
        string _msg
    );

    // this shall give us the exact property count which any address own at any point of time
    function getPropertyCountOfAnyAddress(address _ownerAddress)
        public
        view
        returns (uint256)
    {
        uint256 count = 0;
        for (
            uint256 i = 0;
            i < individualCountOfPropertyPerOwner[_ownerAddress];
            i++
        ) {
            if (propertiesOwner[_ownerAddress][i].isSold != true) count++;
        }
        return count;
    }

    // this function shall be called by DA only after verification
    function allotProperty(address _verifiedOwner, string memory _propertyName)
        external
        onlyOwner
    {
        propertiesOwner[_verifiedOwner][
            individualCountOfPropertyPerOwner[_verifiedOwner]++
        ].name = _propertyName;
        totalNoOfProperty++;
        emit PropertyAlloted(
            _verifiedOwner,
            individualCountOfPropertyPerOwner[_verifiedOwner],
            _propertyName,
            "property allotted successfully"
        );
    }

    // check whether the owner have the said property or not. if yes, return the index
    function isOwner(address _checkOwnerAddress, string memory _propertyName)
        public
        view
        returns (uint256)
    {
        uint256 i;
        bool flag;
        for (
            i = 0;
            i < individualCountOfPropertyPerOwner[_checkOwnerAddress];
            i++
        ) {
            if (propertiesOwner[_checkOwnerAddress][i].isSold == true) {
                break;
            }
            flag = stringsEqual(
                propertiesOwner[_checkOwnerAddress][i].name,
                _propertyName
            );
            if (flag == true) {
                break;
            }
        }
        if (flag == true) {
            return i;
        } else {
            return 999999999; // We're expecting that no individual shall be owning this much properties
        }
    }

    // functionality to check the equality of two strings in Solidity
    function stringsEqual(string memory a1, string memory a2)
        internal
        pure
        returns (bool)
    {
        return
            keccak256(abi.encodePacked(a1)) == keccak256(abi.encodePacked(a2));
    }

    // transfer the property to the new owner
    // todo : change from to msg.sender
    function transferProperty(address _to, string memory _propertyName)
        external
        returns (bool, uint256)
    {
        uint256 checkOwner = isOwner(msg.sender, _propertyName);
        bool flag;

        if (
            checkOwner != 999999999 &&
            propertiesOwner[msg.sender][checkOwner].isSold == false
        ) {
            // step 1 . remove the property from the current owner and decrase the counter.
            // step 2 . assign the property to the new owner and increase the counter
            propertiesOwner[msg.sender][checkOwner].isSold = true;
            propertiesOwner[msg.sender][checkOwner].name = "Sold"; // really nice finding. we can't put empty string
            propertiesOwner[_to][individualCountOfPropertyPerOwner[_to]++]
                .name = _propertyName;
            flag = true;
            emit PropertyTransferred(
                msg.sender,
                _to,
                _propertyName,
                "Owner has been changed."
            );
        } else {
            flag = false;
            emit PropertyTransferred(
                msg.sender,
                _to,
                _propertyName,
                "Owner doesn't own the property."
            );
        }
        return (flag, checkOwner);
    }
}
