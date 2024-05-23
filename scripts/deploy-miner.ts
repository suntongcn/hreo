import "@nomiclabs/hardhat-ethers"
import { ethers } from "hardhat"

async function deploy() {
    const MinnerManager = await ethers.getContractFactory("MinnerManager");
    const minnerManager = await MinnerManager.deploy();
    await minnerManager.deployed();
    console.log(minnerManager.address)
    return minnerManager;
}

async function getContact() {
    return await ethers.getContractAt("MinnerManager", "0x459cE71bB451734C0f271fc39106Fc817D653328")
}

async function check(contract) {
   console.log("owner", await contract.owner())
   console.log("refCode", await contract.refCode())
   console.log("dragoncity", await contract.dragoncity())
   console.log("tokenAddr", await contract.tokenAddr())
   console.log("miners", await contract.getMiners())
}

async function init(contract){
    let tx = await contract.setDragonAddr("0xef64c03d5e757a5f6dc5284f3d627f3c255f09ab")
    await tx.wait()
    let tx1 = await contract.setToken("0xF0f942D563A6BaCf875d8cEe5AE663b12Ce62149")
    await tx1.wait()
    let tx2 = await contract.setRefCode(1132584)
    await tx2.wait() 
}

async function addAcc(contract) {
    let tx = await contract.addAcc(20)
    await tx.wait()
}

async function withdraw(contract) {
    let tx = await contract.withdraw()
    await tx.wait()
}

async function collect(contract) {
    let tx = await contract.collect()
    await tx.wait()
}

async function boost(contract) {
    let tx = await contract.boost()
    await tx.wait()
}

// deploy()

getContact()
// .then(init)
// .then(check)
// .then(addAcc)
.then(withdraw)
// .then(boost)
// .then(collect)