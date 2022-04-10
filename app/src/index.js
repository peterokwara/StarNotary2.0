import Web3 from "web3";
import "./styles.scss";
import starNotaryArtifact from "../../build/contracts/StarNotary.json";

const App = {
  web3: null,
  account: null,
  meta: null,

  start: async function () {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = starNotaryArtifact.networks[networkId];
      this.meta = new web3.eth.Contract(
        starNotaryArtifact.abi,
        deployedNetwork.address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];

    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },

  setStatus: function (message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  },

  createStar: async function () {
    // Get the loader
    const loader = document.getElementsByClassName("loader")[0];

    const { createStar } = this.meta.methods;
    const name = document.getElementById("starName").value;
    const id = document.getElementById("starId").value;

    // Activate loader
    loader.style.display = "block";

    try {
      await createStar(name, id).send({ from: this.account });

    } catch (error) {
      console.log(error);
      // Deactivate loader
      loader.style.display = "none";

    }


    // Deactivate loader
    loader.style.display = "none";

    App.setStatus("New star owner is " + this.account + ".");
  },

  lookUpStar: async function () {
    // Get the loader
    const loader = document.getElementsByClassName("loader")[0];

    const { lookupTokenIdToStarInfo } = this.meta.methods;

    const tokenId = document.getElementById("tokenId").value;

    // Activate loader
    loader.style.display = "block";
    let starName = await lookupTokenIdToStarInfo(tokenId).call();

    // Deactivate loader
    loader.style.display = "none";
    App.setStatus("The name of the star is " + starName + ".");
  }
};

window.App = App;

window.addEventListener("load", async function () {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    await window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:7545. You should remove this fallback when you deploy live",
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:7545"),
    );
  }

  App.start();
});
