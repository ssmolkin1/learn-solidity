pragma solidity ^0.4.18;


/**
 * @title Ownable
 * @dev The Ownable contract has an owner address, and provides basic authorization control
 * functions, this simplifies the implementation of "user permissions".
 * @author https://github.com/OpenZeppelin/zeppelin-solidity
 */
contract Ownable {
  address public owner;


  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);


  /**
   * @dev The Ownable constructor sets the original `owner` of the contract to the sender
   * account.
   */
  function Ownable() public {
    owner = msg.sender;
  }

  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  /**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param newOwner The address to transfer ownership to.
   */
  function transferOwnership(address newOwner) public onlyOwner {
    require(newOwner != address(0));
    OwnershipTransferred(owner, newOwner);
    owner = newOwner;
  }

}


contract Proxied is Ownable {
    address public target;
    mapping (address => bool) public initialized;
    
    event EventUpgrade(address indexed newTarget, address indexed oldTarget, address indexed admin);
    event EventInitialized(address indexed target);
    
    function upgradeTo(address _target) public;
}

contract Proxy is Proxied {
    constructor(address _target) public {
        upgradeTo(_target);
    }

    // onlyOwner moifier has been applied to function
    function upgradeTo(address _target) public onlyOwner {
        assert(target != _target);
        
        address oldTarget = target;
        target = _target;

        emit EventUpgrade(_target, oldTarget, msg.sender);
    }

    function () payable public {
        bytes memory data = msg.data;
        address impl = target;

        assembly {
            let result := delegatecall(gas, impl, add(data, 0x20), mload(data), 0, 0)
            let size := returndatasize

            let ptr := mload(0x40)
            returndatacopy(ptr, 0, size)

            switch result
            case 0 { revert(ptr, size) }
            default { return(ptr, size) }
        }
    }
}

contract Upgradeable is Proxied {

    /**
     * This function, as it is here, will never be executed. The function that will execute will be
     * Proxy.upgradeTo(address)
     */
    function upgradeTo(address) public {
        assert(false);
    }

    /**
     * This abstract function needs to be implemented in child contracts if the child contrat requires
     * variable initialization on creation. This is because, the contructor of the Proxy contract will not
     * initialize any of the upgradeable child contract's variables when the target is set
     */
    function initialize() public {
        if(initializeUpgradeable(target)) {
            // initialize contract variables here
        }
    }

    function initializeUpgradeable(address target) internal returns (bool) {
        if(!initialized[target]) {
            initialized[target] = true;
            emit EventInitialized(target);
            return true;
        }
        else return false;
    }
}
