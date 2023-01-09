// Quickly made this to send all 70 students 10 of each 3 erc-20 token instead of 
// manually doing it through metamask

const {readFileSync, promises: fsPromises} = require('fs');
const { ethers } = require('hardhat');


// FILE WITH STUDENT ADDRESSES
// make sure there is one address per line, with no empty lines or other characters
const filename = "student-addresses.txt";

// AMOUNT TO SEND EACH STUDENT
const amount = BigInt(10e18);

// ADDRESSES OF DEPLOYED TOKENS
const ASAaddress = "0x1A5Cf8a4611CA718B6F0218141aC0Bfa114AAf7D";
const HAWaddress = "0x42cD7B2c632E3F589933275095566DE6d8c1bfa5";
const KORaddress = "0x0B09AC43C6b788146fe0223159EcEa12b2EC6361";



async function main () {

  // read in file
  const contents = readFileSync(filename, 'utf-8');

  // split file at newline character into an array 
  const arr = contents.split(/\r?\n/);

  // trim whitespace off all elements
  const studentAddresses = arr.map(element => {
    return element.trim();
  });

  //console.log(studentAddresses); 

  // gets signer
  const signers = await ethers.getSigners();    
  const addresses = await Promise.all(signers.map(async signer => signer.getAddress()));
  const wallet = { provider: signers[0].provider, signer: signers[0], address: addresses[0] };
  console.log(`Sending tokens from: ${wallet.address} \n`);

  // gets the deployed contracts
  const ASA = await ethers.getContractAt("AsaToken", ASAaddress, wallet.signer);
  const HAW = await ethers.getContractAt("HawKoin", HAWaddress, wallet.signer);
  const KOR = await ethers.getContractAt("KorthCoin", KORaddress, wallet.signer);

  // Sends tokens to each student address
  for (const thisAddr of studentAddresses) {
    await ASA.transfer(thisAddr, amount);
    console.log("Sent ASA to %s", thisAddr);

    await HAW.transfer(thisAddr, amount);
    console.log("Sent HAW to %s", thisAddr);

    await KOR.transfer(thisAddr, amount);
    console.log("Sent KOR to %s", thisAddr);

    console.log("\n");
  }

  console.log("all done");
}

// Execute the script and catch errors.
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });