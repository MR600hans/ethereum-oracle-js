import OracleContract from './oracle-contract.js'

class ClientToOracleService extends OracleContract {
  constructor() {
    super()

    this.web3 = this.setWeb3()
    this.contract = this.setContract(this.web3)

    this.getBTCPrice()
  }

  // Request BTC price
  getBTCPrice() {
    this.web3.eth.getAccounts((err, [account]) => {
      this.contract.deployed()
        .then(async (instance) => {
          const update = await instance.updateBTCPrice({ from: account })
          const watcher = instance.CallbackSendBTCPrice().watch(async (err, event) => {
            console.log('BTC current price:', parseFloat(event.args.price.toNumber() / 100))
            watcher.stopWatching()
          })
        })
        .catch(err => console.log)
    })
  }
}

const client = new ClientToOracleService()
