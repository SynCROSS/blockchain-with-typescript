"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/crypto-js");
class Block {
    constructor(index, hash, prevHash, data, timestamp) {
        this.getIndex = () => {
            return this.index;
        };
        this.getHash = () => {
            return this.hash;
        };
        this.getPrevHash = () => {
            return this.prevHash;
        };
        this.getData = () => {
            return this.data;
        };
        this.getTimestamp = () => {
            return this.timestamp;
        };
        this.index = index;
        this.hash = hash;
        this.prevHash = prevHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
Block.calcBlockHash = (index, prevHash, timestamp, data) => CryptoJS.SHA256(index + prevHash + timestamp + data).toString();
Block.validateStructure = (block) => typeof block.getIndex() === 'number' &&
    typeof block.getHash() === 'string' &&
    typeof block.getPrevHash() === 'string' &&
    typeof block.getTimestamp() === 'number' &&
    typeof block.getData() === 'string';
const genesisBlock = new Block(0, 'hash', '', 'data', Date.now());
let blockChain = [genesisBlock];
const getBlockChain = () => blockChain;
const getLatestBlock = () => blockChain[blockChain.length - 1];
const getNewTimestamp = () => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data) => {
    const prevBlock = getLatestBlock();
    const newIndex = prevBlock.getIndex() + 1;
    const newTimestamp = getNewTimestamp();
    const newHash = Block.calcBlockHash(newIndex, prevBlock.getHash(), newTimestamp, data);
    const newBlock = new Block(newIndex, newHash, prevBlock.getHash(), data, newTimestamp);
    addBlock(newBlock);
    return newBlock;
};
const getHashforBlock = (block) => Block.calcBlockHash(block.getIndex(), block.getPrevHash(), block.getTimestamp(), block.getData());
const isBlockValid = (candidateBlock, prevBlock) => {
    if (!Block.validateStructure(candidateBlock)) {
        return false;
    }
    else if (prevBlock.getIndex() + 1 !== candidateBlock.getIndex()) {
        return false;
    }
    else if (prevBlock.getHash() !== candidateBlock.getPrevHash()) {
        return false;
    }
    else if (candidateBlock.getHash() !== getHashforBlock(candidateBlock)) {
        return false;
    }
    else {
        return true;
    }
};
const addBlock = (candidateBlock) => {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockChain.push(candidateBlock);
    }
};
createNewBlock('data1');
createNewBlock('data2');
createNewBlock('data3');
console.log(blockChain);
//# sourceMappingURL=index.js.map