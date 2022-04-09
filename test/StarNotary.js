const StarNotary = artifacts.require("StarNotary");

var accounts;
var owner;

contract("StarNotary", (accs) => {
  accounts = accs;
  owner = accounts[0];
});

describe("The Star Notary v2 contract", () => {
  it("should be able to create a star", async () => {
    let tokenId = 1;
    let instance = await StarNotary.deployed();
    await instance.createStar("Awesome star!", tokenId, { from: accounts[0] });
    assert.equal(
      await instance.tokenIdToStarInfo.call(tokenId),
      "Awesome star!"
    );
  });

  it("should let user1 be able to put up a star for sale", async () => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let starId = 2;
    let starPrice = web3.utils.toWei(".01", "ether");
    await instance.createStar("Awesome star!", starId, { from: user1 });
    await instance.putStarUpForSale(starId, starPrice, { from: user1 });
    assert.equal(await instance.starsForSale.call(starId), starPrice);
  });

  it("should let user1 be able to get the funds after the sale", async () => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 3;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei("0.5", "ether");
    await instance.createStar("Awesome star", starId, { from: user1 });
    await instance.putStarUpForSale(starId, starPrice, { from: user1 });
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user1);
    await instance.buyStar(starId, { from: user2, value: balance });
    let balanceOfUser1AfterTransaction = await web3.eth.getBalance(user1);
    let value1 = Number(balanceOfUser1BeforeTransaction) + Number(starPrice);
    let value2 = Number(balanceOfUser1AfterTransaction);
    assert.equal(value1, value2);
  });

  it("should let user2 buy a star, if it is put up for sale", async () => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 4;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createStar("Awesome star", starId, { from: user1 });
    await instance.putStarUpForSale(starId, starPrice, { from: user1 });
    await instance.buyStar(starId, { from: user2, value: balance });
    assert.equal(await instance.ownerOf.call(starId), user2);
  });

  it("should let user2 buy a star and decrease its balance in ether", async () => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 5;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createStar("awesome star", starId, { from: user1 });
    await instance.putStarUpForSale(starId, starPrice, { from: user1 });
    const balanceOfUser2BeforeTransaction = web3.utils.toBN(
      await web3.eth.getBalance(user2)
    );
    const txInfo = await instance.buyStar(starId, {
      from: user2,
      value: balance,
    });
    const balanceAfterUser2BuysStar = web3.utils.toBN(
      await web3.eth.getBalance(user2)
    );

    // Important! Note that because these are big numbers (more than Number.MAX_SAFE_INTEGER), we
    // need to use the BN operations, instead of regular operations, which cause mathematical errors.
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
    // console.log("Ok  = " + (balanceOfUser2BeforeTransaction.sub(balanceAfterUser2BuysStar)).toString());
    // console.log("Bad = " + (balanceOfUser2BeforeTransaction - balanceAfterUser2BuysStar).toString());

    // calculate the gas fee
    const tx = await web3.eth.getTransaction(txInfo.tx);
    const gasPrice = web3.utils.toBN(tx.gasPrice);
    const gasUsed = web3.utils.toBN(txInfo.receipt.gasUsed);
    const txGasCost = gasPrice.mul(gasUsed);

    // make sure that [final_balance == initial_balance - star_price - gas_fee]
    const starPriceBN = web3.utils.toBN(starPrice); // from string
    const expectedFinalBalance = balanceOfUser2BeforeTransaction
      .sub(starPriceBN)
      .sub(txGasCost);
    assert.equal(
      expectedFinalBalance.toString(),
      balanceAfterUser2BuysStar.toString()
    );
  });

  it('should add the token name and token symbol properly ', async () => {
    let instance = await StarNotary.deployed();

    // Create id
    let starId = 10;

    // Create a new star
    await instance.createStar('Crux', starId, { from: accounts[0] });

    // Check if the star name matches the star we just created
    assert.equal(await instance.tokenIdToStarInfo.call(starId), 'Crux');

    // check the name and symbol
    assert.equal(await instance.name(), "Nyota");
    assert.equal(await instance.symbol(), "NYT");
  });

  it('should enable two users to exchange their stars', async () => {
    let instance = await StarNotary.deployed();

    // Two accounts
    let user1 = accounts[0];
    let user2 = accounts[1];

    // Two id's
    let starId1 = 7;
    let starId2 = 8;


    // Create the first star and second star
    await instance.createStar("Cancer", starId1, { from: user1 });
    await instance.createStar("Leo", starId2, { from: user2 });

    // Users exchange stars
    await instance.exchangeStars(starId1, starId2);

    // Check if stars have truly been exchanged
    assert.equal(await instance.ownerOf(starId1), user2);
    assert.equal(await instance.ownerOf(starId2), user1);

  });

  it('should enable star tokens to be transferable from one person to another', async () => {
    let instance = await StarNotary.deployed();

    // create two accounts
    let user1 = accounts[0];
    let user2 = accounts[1];

    // Set star id
    let starId = 9;

    // Create a star
    await instance.createStar("Lyra", starId, { from: user1 });

    // Transfer the star to another account
    await instance.transferStar(user2, starId);

    // Check if the stars have truly been transfered to the second user
    assert.equal(await instance.ownerOf(starId), user2);
  });
});
