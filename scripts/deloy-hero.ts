import "@nomiclabs/hardhat-ethers"
import { ethers } from "hardhat"

async function deploy() {
    const Hero = await ethers.getContractFactory("Hero");
    const hero = await Hero.deploy();
    await hero.deployed();

    return hero;
}

async function getContact() {
    return await ethers.getContractAt("Hero", "0x9a676e781a523b5d0c0e43731313a708cb607508")
}

let heroContract;
async function createHero(hero) {
    heroContract = hero
    // let tx = await hero.createHero(0, { value: ethers.utils.parseEther("0.05") })
    // await tx.wait()
    let heroValue = await hero.getHeroes()
    console.log(heroValue)

    for (let i = 0; i < heroValue.length; i++) {
        const element = heroValue[i];
        console.log("=============")
        await getStrength(element)
        await getHealth(element)
        await getIntellect(element)
        await getDexterity(element)
        await getMagic(element)
    }

    return heroValue[0]
}

async function getStrength(hero) {
    let strength = await heroContract.getStrength(hero);
    console.log("strength is ", strength)
    return hero;
}

async function getHealth(hero) {
    let health = await heroContract.getHealth(hero);
    console.log("health is ", health)
    return hero;
}
async function getDexterity(hero) {
    let dexterity = await heroContract.getDexterity(hero);
    console.log("dexterity is ", dexterity)
    return hero;
}
async function getIntellect(hero) {
    let intellect = await heroContract.getIntellect(hero);
    console.log("intellect is ", intellect)
    return hero;
}
async function getMagic(hero) {
    let magic = await heroContract.getMagic(hero);
    console.log("magic is ", magic)
    return hero;
}


async function generateRandom(hero) {
    let a = await hero.generateRandom()
    console.log(a)
    console.log(a.toString())
}



// deploy()
getContact()
    .then(createHero)
    .then(getStrength)
    .then(getHealth)
    .then(getIntellect)
    .then(getDexterity)
    .then(getMagic)