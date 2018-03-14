import OracleContract from './oracle-contract.js'
import axios from 'axios'

class OracleService extends OracleContract {
  constructor() {
    super()

    this.web3 = this.setWeb3()
    this.contract = this.setContract(this.web3)

    this.price = {
      btc: 0
    }

    this.oracleWatcher()
  }

  // Load Watcher
  oracleWatcher() {
    this.web3.eth.getAccounts((err, [account]) => {
      this.contract.deployed()
        .then((instance) => {
          instance.CallbackUpdateBTCPrice().watch(async (err, event) => {
            // Get Price from API
            const data = await this.getBTCPrice()

            // Oracle Cache
            this.price.btc = (data.length > 0) ? data[0].price_usd*100 : this.price.btc

            // Comment out line below if you don't want to store
            // the data on the smart contract (Save storage cost on Oracle point)
            await instance.setBTCPrice(this.price.btc, { from: account })

            // Send API though event
            await instance.sendBTCPrice(this.price.btc, { from: account })
            console.log('BTC price update requested:', this.price.btc/100)
          })
        })
        .catch(err => console.log)
    })
  }

  // Get BTC price from API
  getBTCPrice() {
    return axios.get('https://api.coinmarketcap.com/v1/ticker/bitcoin/').then((res) => res.data)
  }
}

const oracle = new OracleService()
console.log('Oracle started!')
