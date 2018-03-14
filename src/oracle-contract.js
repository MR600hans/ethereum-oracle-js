import OracleABI from './../build/contracts/Oracle.json'
import Web3 from 'web3'
import contract from 'truffle-contract'

export default class OracleContract {
  // Load Contract / Truffle
  setContract(web3) {
    const oracleContract = contract(OracleABI)
    oracleContract.setProvider(web3.currentProvider)

    return oracleContract
  }

  // Return new Web3 with Provider set
  setWeb3() {
    return new Web3(new Web3.providers.HttpProvider('http://localhost:9545'))
  }
}
