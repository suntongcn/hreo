import "@nomiclabs/hardhat-ethers"
import { ethers } from "hardhat"
import { expect } from "chai"


describe("hello world",function(){
    it("should say it",async function(){

        // 创建合约工厂
        const HelloWorld = await ethers.getContractFactory("HelloWorld");

        // 发布
        const hello = await HelloWorld.deploy();

        // 等待发布
        await hello.deployed();

        expect(await hello.hello()).to.equal("hello world")
    })
})