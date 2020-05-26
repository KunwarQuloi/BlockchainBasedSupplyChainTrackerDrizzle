import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

const contractInitials = async () => {
	// Get network provider and web3 instance.
	const web3 = await getWeb3();

	// Use web3 to get the user's accounts.
	const accounts = await web3.eth.getAccounts();

	// Get the contract instance.
	const networkId = await web3.eth.net.getId();
	const deployedNetwork = SimpleStorageContract.networks[networkId];
	const instance = new web3.eth.Contract(
		SimpleStorageContract.abi,
		deployedNetwork && deployedNetwork.address
	);
	return [web3, accounts, instance];
};

export default contractInitials;
