import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import contractInitials from "./ContractInitials";

import "./App.css";

class App extends Component {
	state = {
		storageValue: 0,
		web3: null,
		accounts: null,
		contract: null,
		manager: null,
	};

	componentDidMount = async () => {
		const [web3, accounts, instance] = await contractInitials();
		this.setState({ web3, accounts, contract: instance }, this.runExample);
	};

	runExample = async () => {
		const { contract } = this.state;

		const manager = await contract.methods.manager().call();

		this.setState({ manager: manager });
	};

	add = async () => {
		const { contract, accounts } = this.state;
		await contract.methods.set().send({ from: accounts[0], gas: "1000000" });
		const storageValue = await contract.methods.get().call();
		this.setState({ storageValue });
	};

	render() {
		if (!this.state.web3) {
			return <div>Loading Web3, accounts, and contract...</div>;
		}
		return (
			<div className="App">
				<div>The manager is: {this.state.manager}</div>
				<div>Storage value is {this.state.storageValue}</div>
				<button onClick={this.add}>add</button>
			</div>
		);
	}
}

export default App;
