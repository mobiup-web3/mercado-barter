<div align="center">
	<img src="https://barter-32420.web.app/assets/logo-5be8a8e9.png" alt="">
</div>

MercadoBarter is an innovative digital platform aimed at revolutionizing the agricultural sector by providing comprehensive solutions for farmers and investors.

# Technical requirements
- Node >= 18

## Execution

- Access the barter directory
- Open your Command Prompt in the barter directory
- Run npm install (To install required libraries)
- Run the npm run dev project
```bash
cd barter
npm install
npm run dev
```

## Smart Contracts

- In the contracts directory, you will find all the source codes used for this project.
- Using asset tokenization solutions, interoperability of these assets, and using the DREX network with Real Digital, simulating a financial institution.
- We use the concept of SmartWallets to avoid the friction of using external services by the end user, considering that a relay will be used to execute the gas in each transaction.

## Networks Used
- Goerli(Simulating the DREX Hyperledger BESU network)
  - REAL DIGITAL - https://goerli.etherscan.io/address/0x4E719E4a41fb9BAdb354081EcAD236Adc7959E42#code
  - BRIDGE - https://goerli.etherscan.io/address/0xB304033Afb3139E75E3D0E6aeBb40103f3450D35#code
  - CPR MILHO(Rural Product Certificate) - https://goerli.etherscan.io/address/0xC9C2f164bB221583aA163C4437064808dCd9D965#code
- Mumbai(Public EVM)
  - BRIDGE - https://mumbai.polygonscan.com/address/0xA7eCA58D64c23d89d7C8Fb09bb8665237b253d83#code
  - UREIA(Fertilizante) - https://mumbai.polygonscan.com/address/0x2F72A13005f5E181Fc12565fe99B9bF88442B391#code
- LaChain(EVM for Tokens that interoperate with DREX network)
  - CPR MILHO(Rural Product Certificate) - https://explorer.lachain.network/address/0x4E719E4a41fb9BAdb354081EcAD236Adc7959E42/contracts#address-tabs
  - UREIA(Fertilizante) - https://explorer.lachain.network/address/0x1225033EbB3B455a637c60Eb3c1FEb336f99e48A/contracts#address-tabs
  - BRIDGE - https://explorer.lachain.network/address/0x0F716dB95D09c4fe30e071a66623ad92A5F2D708/contracts#address-tabs

## ICP HTTP CALL Usage
- We use the IPC service, along with HTTP CALL, to obtain real-time quotes, updating the prices of tokenized assets in a more efficient manne
<div align="center">
	<img src="https://mobiup.io/print-icp-call-http-price.png" alt="">
</div>
