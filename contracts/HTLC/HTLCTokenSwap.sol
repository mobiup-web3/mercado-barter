// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract HTLCTokenSwap {

    uint256 public swapIndex;
    mapping(uint256 => TokenSwapDef) public swaps;

    struct TokenSwapDef {
        address payable recipient;
        address payable sender;
        IERC20 token; // Agora, o token e uma instancia de IERC20
        uint256 amount;
        uint256 timelock;
        bytes32 hashlock;
        string secret;
        bool refunded;
        bool claimed;
    }

    event SwapCreated(uint256 swapId, address payable recipient, address payable sender, address tokenAddress, uint256 amount, bytes32 hashlock, uint256 timelock);
    event SwapFinalized(uint256 swapId, string secret);
    event SwapCanceled(uint256 swapId);

    modifier existing(uint256 _swapId) {
        require(isRegistered(_swapId), "Contract does not exist");
        _;
    }

    modifier unlockableHL(uint256 _swapId, string memory _secret) {
        require(bytes(_secret).length <= 32, "Secret length over 32");
        require(swaps[_swapId].hashlock == keccak256(abi.encodePacked(_secret)), "Wrong secret");
        _;
    }

    modifier unlockableTL(uint256 _swapId) {
        require(swaps[_swapId].timelock <= block.timestamp, "The timelock is active");
        _;
    }

    modifier refundable(uint256 _swapId) {
        require(swaps[_swapId].sender == msg.sender, "Only the sender of this coin can refund");
        require(swaps[_swapId].refunded == false, "Already refunded");
        require(swaps[_swapId].claimed == false, "Already claimed");
        require(swaps[_swapId].timelock <= block.timestamp, "Timelock not yet passed");
        _;
    }

    modifier claimable(uint256 _swapId) {
        require(swaps[_swapId].recipient == msg.sender, "Only the recipient of this coin can claim");
        require(swaps[_swapId].refunded == false, "Already refunded");
        require(swaps[_swapId].claimed == false, "Already claimed");
        _;
    }

    constructor() {
        swapIndex = 0;
    }

    function isRegistered(uint256 _swapId) internal view returns (bool registered) {
        registered = (swaps[_swapId].sender != address(0));
    }

    function HashSecret(string memory _secret) public pure returns (bytes32 _hash) {
        _hash = keccak256(abi.encodePacked(_secret));
    }

    function newSwap(address payable _recipient, IERC20 _token, bytes32 _hashlock, uint256 _delay, uint256 _amount) public payable returns (uint256) {
        uint256 _timelock = block.timestamp + _delay;

        require(_token.transferFrom(msg.sender, address(this), _amount), "Transfer failed");

        swapIndex += 1;

        swaps[swapIndex] = TokenSwapDef({
            recipient: _recipient,
            sender: payable(msg.sender),
            token: _token,
            amount: _amount,
            timelock: _timelock,
            hashlock: _hashlock,
            secret: "",
            refunded: false,
            claimed: false
        });

        emit SwapCreated(swapIndex, payable(_recipient), payable(msg.sender), address(_token), _amount, _hashlock, _timelock);
        return swapIndex;
    }

    function cancelSwap(uint256 _swapId) external existing(_swapId) refundable(_swapId) unlockableTL(_swapId) returns (bool) {
        TokenSwapDef storage s = swaps[_swapId];
        s.refunded = true;
        require(s.token.transfer(s.sender, s.amount), "Transfer failed");
        emit SwapCanceled(_swapId);
        return true;
    }

    function finalizeSwap(uint256 _swapId, string memory _secret) public payable existing(_swapId) claimable(_swapId) unlockableHL(_swapId, _secret) returns (bool) {
        TokenSwapDef storage s = swaps[_swapId];
        s.secret = _secret;
        s.claimed = true;
        require(s.token.transfer(s.recipient, s.amount), "Transfer failed");
        emit SwapFinalized(_swapId, _secret);
        return true;
    }
}
