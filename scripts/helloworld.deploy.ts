import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

async function deploy() {
    const HelloWorld  = await ethers.getContractFactory("HelloWorld");
    const hello = await HelloWorld.deploy();
    await (await hello).deployed();

    return hello;
}


async function sayHello() {
    const hello = await deploy()

    console.log(await hello.hello())
    
}

sayHello()