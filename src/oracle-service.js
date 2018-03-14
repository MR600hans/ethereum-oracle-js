import OracleContract from './../build/contracts/Oracle.json'
import Web3 from 'web3'
import axios from 'axios'
import contract from 'truffle-contract'

class OracleService {
  constructor() {
    this.web3 = this.setWeb3()
    this.contract = this.setContract()

    this.price = {
      btc: 0
    }

    this.oracleWatcher()
  }

  oracleWatcher() {
    this.web3.eth.getAccounts((err, [account]) => {
      this.contract.deployed()
        .then((instance) => {
          instance.CallbackUpdateBTCPrice().watch(async (err, event) => {
            const data = await this.getBTCPrice()
            this.price.btc = (data.length > 0) ? data[0].price_usd*100 : this.price.btc

            await instance.setBTCPrice(this.price.btc, { from: account })
            await instance.priceUpdated({from: account})
            
            console.log('BTC price update requested:', this.price.btc/100)
          })
        })
        .catch(err => console.log)
    })
  }

  getBTCPrice() {
    return axios.get('https://api.coinmarketcap.com/v1/ticker/bitcoin/').then((res) => res.data)
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

const oracle = new OracleService()
oracle.getBTCPrice()
