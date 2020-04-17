import React, { Component } from "react";
import Web3 from "web3";
import "./App.css";
import Marketplace from "../abis/Marketplace.json";
import NavBar from "./NavBar";
import ProTransact from "./ProTransact";
import Main from "./Main";

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const networkId = await web3.eth.net.getId();
    const networkdata = Marketplace.networks[networkId];
    if (networkdata) {
      const myContract = web3.eth.Contract(
        Marketplace.abi,
        networkdata.address
      );
      const ab = await myContract.methods.owner().call();
      this.setState({ owner_acc: ab });
      this.setState({ myContract: myContract });
      const productCount = await myContract.methods.productCount().call();
      this.setState({ productCount: productCount });
      //load products
      for (var i = 3; i <= productCount; i++) {
        const product = await myContract.methods.products(i).call();
        this.setState({
          products: [...this.state.products, product]
        });
      }
    } else {
      window.alert("wrong network");
    }
  }

  handleClick = () => {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  };

  createProduct(
    mfg_owner,
    med_name,
    mfg_month,
    exp_month,
    batch_no,
    med_location,
    med_price,
    med_amount
  ) {
    this.state.myContract.methods
      .createMedicine(
        mfg_owner,
        med_name,
        mfg_month,
        exp_month,
        batch_no,
        med_location,
        med_price,
        med_amount
      )
      .send({ from: this.state.owner_acc });
    console.log("clicked");
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      vendors: [],
      owner_acc: "",
      productCount: 0,
      products: [],
      isToggleOn: true
    };
    this.handleClick = this.handleClick.bind(this);
    this.createProduct = this.createProduct.bind(this);
  }
  render() {
    return (
      <div>
        <NavBar account={this.state.owner_acc} />

        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              {/* {this.state.loading ? (
                <div id="loader" className="text-center">
                  <p className="text-center">Loading...</p>
                </div>
              ) : (
                <Main />
              )} */}
              <Main
                products={this.state.products}
                createProduct={this.createProduct}
                purchaseProduct={this.purchaseProduct}
              />
            </main>
            {/* <div>
              <button onClick={this.handleClick} className="btn btn-primary">
                redirect
              </button>
            </div>
            {this.state.ld ? <div></div> : <div></div>}
            */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
