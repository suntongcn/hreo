import "@nomiclabs/hardhat-ethers"
import { ethers } from "hardhat"
import { expect } from "chai"


describe("Hero",function(){
    async function createHero(){
        const Hero = await ethers.getContractFactory("Hero");
        const hero = await Hero.deploy()
        await hero.deployed();
        
        return hero;
    }

    let hero;

    before(async function() {
        hero = await createHero()
    })

    it("should be get a zero hero array",async function(){
        let result = await hero.getHeroes();
        console.log(result)
        expect(result).to.deep.equal([]);
    })

    it("should fail at creating hero cause of payment",async function(){
        let e;

        try{
            await hero.createHero(0,{
                value: ethers.utils.parseEther("0.04999")
            })
        }catch(err){
            e = err;
        }

        expect(e.message.includes("Please send maor money")).to.equal(true)
    })
})