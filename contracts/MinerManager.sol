// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() {
        _transferOwnership(_msgSender());
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if the sender is not the owner.
     */
    function _checkOwner() internal view virtual {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

interface IERC20 {
    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `to`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 amount) external returns (bool);
}

interface IDragon {
    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function activate( uint256 _refCode) external;
    function withdraw() external ;
    function boost() external ;
}

contract Miner is Ownable {
    constructor(address dragoncity, uint256 _refCode) payable {
        // (bool success, ) = dragoncity.call(
        //     abi.encodeWithSignature("activate(uint256)", _refCode)
        // );
        // require(success, "activate exeption");
        IDragon dragon = IDragon(dragoncity);
        dragon.activate(_refCode);
    }

    function withdraw(address dragoncity) public payable onlyOwner   {
        // (bool success, ) = dragoncity.call(
        //     abi.encodeWithSignature("withdraw()")
        // );
        // require(success, "false -----"); 
        
        // return (success);

        IDragon dragon = IDragon(dragoncity);
        dragon.withdraw();
    }

    function boost(address dragoncity) public payable onlyOwner {
        // (bool success, ) = dragoncity.call(abi.encodeWithSignature("boost()"));
        // return (success);
        
        IDragon dragon = IDragon(dragoncity);
        dragon.boost();
    }

    function transfer(address token,address to) public payable onlyOwner {
        IERC20 erc20 = IERC20(token);
        erc20.transfer(to, erc20.balanceOf(address(this)));
    }
}

contract MinnerManager is Ownable {
    address public dragoncity;
    address public tokenAddr;
    uint256 public refCode;
    Miner[] miners;

    constructor() {}

    function addAcc(uint256 count) public onlyOwner {
        while (count > 0) {
            Miner miner = new Miner(dragoncity, refCode);
            miners.push(miner);
            count--;
        }
    }

    function setRefCode(uint256 code) public onlyOwner {
        refCode = code;
    }

    function setDragonAddr(address _addr) public onlyOwner {
        dragoncity = _addr;
    }

     function setToken(address _addr) public onlyOwner {
        tokenAddr = _addr;
    }

    function withdraw() public onlyOwner {
        uint256 length = miners.length;
        for (uint256 i = 0; i < length; i++) {
            Miner miner = miners[i];
            miner.withdraw(dragoncity);
        }
    }
    function boost() public onlyOwner {
        uint256 length = miners.length;
        for (uint256 i = 0; i < length; i++) {
            Miner miner = miners[i];
            miner.boost(dragoncity);
        }
    }
    function collect() public onlyOwner {
        uint256 length = miners.length;
        for (uint256 i = 0; i < length; i++) {
            Miner miner = miners[i];
            miner.transfer(tokenAddr,msg.sender);
        }
    }
    function getMiners() public view returns (Miner[] memory) {
        return miners;
    }
}
