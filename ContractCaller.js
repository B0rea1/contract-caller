class ContractCaller {
    // Constructor for the ContractCaller class
      constructor({ contractAddress, abi, web3Provider, accountAddress, privateKey }) {
        // Create a new contract object based on the contract address and ABI
        this.contract = new web3Provider.eth.Contract(
          abi,
          contractAddress
        );
        this.accountAddress = accountAddress;
        this.privateKey = privateKey;
  
        // Assign the web3Provider as a field of the object
        this.web3Provider = web3Provider;
      }
  
      // Function to call any function from the contract
      async callFunction(functionName, functionArgs, nonce, value) {
        // Encode the ABI of the function we want to call
        const data = this.contract.methods[functionName](...functionArgs).encodeABI();
  
        // Create the transaction object
        const tx = {
          from: this.accountAddress,
          to: this.contract.options.address,
          nonce,
          data,
          gas: 1000000,
          gasPrice: 1000000000,
          value: value || 0
        };
  
        // Sign the transaction with the private key
        const signedTx = await this.web3Provider.eth.accounts.signTransaction(tx, this.privateKey);
  
        // Execute the transaction
        return this.web3Provider.eth.sendSignedTransaction(signedTx.rawTransaction);
      }
  }