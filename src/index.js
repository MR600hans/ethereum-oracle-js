import OracleContract from './../build/contracts/Oracle.json'
import Web3 from 'web3'
import contract from 'truffle-contract'

class ClientToOracleService {
  constructor() {
    this.web3 = this.setWeb3()
    this.contract = this.setContract()

    this.getBTCPrice()
  }

  getBTCPrice() {
    this.web3.eth.getAccounts((err, [account]) => {
      this.contract.deployed()
        .then(async (instance) => {
          const update = await instance.updateBTCPrice({from: account})
          const price = await instance.getBTCPrice({from: account})
          console.log('BTC current price:', parseFloat(price.c[0] / 100))
        })
        .catch(err => console.log)
    })
  }

  setContract() {
    const oracleContract = contract(OracleContract)
    oracleContract.setProvider(this.web3.currentProvider)

    return oracleContract
  }

  setWeb3() {
    return new Web3(new Web3.providers.HttpProvider('http://localhost:9545'))
  }
}

const client = new ClientToOracleService()
