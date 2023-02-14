pragma solidity ^0.5.1;
// contract address is 0x09557807c515d758ecc5e1d1ace7d09aa5842f51
contract SimpleStorage{
    string ipfsHash;
    
    function set(string memory x) public {
        ipfsHash = x;
    }
    
    function get() public view returns(string memory){
        return ipfsHash;
    }
    
}