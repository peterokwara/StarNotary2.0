pragma solidity >=0.4.24;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";

contract StarNotary is ERC721 {
    struct Star {
        string name;
    }

    string public constant name = 'Nyota';
    string public constant symbol  = 'NYT';

    mapping(uint256 => Star) public tokenIdToStarInfo;
    mapping(uint256 => uint256) public starsForSale;

    // Create Star using the Struct
    function createStar(string memory _name, uint256 _tokenId) public {
        // Passing the name and tokenId as parameters
        Star memory newStar = Star(_name); // Star is a struct so we are creating a new star
        tokenIdToStarInfo[_tokenId] = newStar; // Creating in memory the star -> tokenId mapping
        _mint(msg.sender, _tokenId); // _mint assign the star with _tokenId to the sender address (ownership)
    }

    // Putting a star for sale (Adding the star tokenId into the mapping starsForSale, first verify that the sender is the owner)
    function putStarUpForSale(uint256 _tokenId, uint256 _price) public {
        require(
            ownerOf(_tokenId) == msg.sender,
            "You can't sale the star that you didn't own"
        );
        starsForSale[_tokenId] = _price;
    }

    // Function that allows you to convert an address into a payable address
    function _make_payable(address x) internal pure returns (address payable) {
        return address(uint160(x));
    }

    // Function that allows you to buy a star
    function buyStar(uint256 _tokenId) public payable {
        require(starsForSale[_tokenId] > 0, "The star should be up for sale");
        uint256 starCost = starsForSale[_tokenId];
        address ownerAddress = ownerOf(_tokenId);
        require(msg.value > starCost, "You need to have enough ether");
        _transferFrom(ownerAddress, msg.sender, _tokenId); // We can't use _addTokenTo or _removeTokenFrom function, now we have to use _transerFrom
        address payable ownerAddressPayable = _make_payable(ownerAddress); // We need to make this conversion to be able to use transfer() function to transfer ethers
        ownerAddressPayable.transfer(starCost);
        if (msg.value > starCost) {
            msg.sender.transfer(msg.value - starCost);
        }
    }

    // Function that looks up the star using the token id and returns the name of the star
    function lookupTokenIdToStarInfo(uint _tokenId)
        public
        view
        returns (string memory)
    {
        return tokenIdToStarInfo[_tokenId].name;
    }

    // Function that allows the exchange of stars
    function exchangeStars(uint256 _tokenId1, uint256 _tokenId2) public {
        address owner1 = ownerOf(_tokenId1);
        address owner2 = ownerOf(_tokenId2);

        require(
            msg.sender == owner1 || msg.sender == owner2,
            "You must own the star to exchange it"
        );

        // use the transferFrom function to transfer the star
        _transferFrom(owner1, owner2, _tokenId1);
        _transferFrom(owner2, owner1, _tokenId2);
    }

    // Function that allows the transfer of stars
    function transferStar(address _to1, uint256 _tokenId) public {
        address from = ownerOf(_tokenId);
        require(from == msg.sender);
        _transferFrom(from, _to1, _tokenId);
    }
}
