pragma solidity >=0.4.21 <0.7.0;


contract SimpleStorage {
    uint256 storedData;
    address public manager = msg.sender;

    function set() public {
        storedData++;
    }

    function get() public view returns (uint256) {
        return storedData;
    }
}
