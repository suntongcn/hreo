import "@nomiclabs/hardhat-ethers"
import { ethers } from "hardhat"

async function deploy() {
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();
    await counter.deployed();

    return counter;
}

async function count(counter) {
    console.log("Counter",await counter.count())   
    return counter
}

async function getCounter(counter) {
    console.log("Counter",await counter.getCounter())
}

deploy()
.then(count)
.then(getCounter) 