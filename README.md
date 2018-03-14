# Ethereum Oracle

---

An oracle is a service which provides data from external sources that scripts and smart contracts within the blockchain ecosystem that cannot be reached otherwise.

---

In this demo, BTC price will be fetched from Node, routed through a Smart Contract, saved in the smart contract (if line not commented out), and back to a client app.

## Quick Start

[Main Terminal] Clone & `cd` to repo directory.

[Main Terminal] Install dependencies with `npm install`.

[Terminal #2] Open new terminal tab and `npm run rpc` to start ethereum testrpc from truffle.

[Main Terminal] In main terminal, `npm run migrate` to compile contracts and deploy to testrpc.

[Terminal #3] Open another terminal tab and `npm run oracle` to run the oracle service.

[Main Terminal] In main terminal, `npm start` to run client request. (Run for each request!)

## Notes

- Any updates to the contract will require you to migrate and restart the oracle service (In that order).
