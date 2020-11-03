import * as CryptoJS from 'C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/crypto-js';

class Block {
  private index: number;
  private hash: string;
  private prevHash: string;
  private data: string;
  private timestamp: number;

  static calcBlockHash = (
    index: number,
    prevHash: string,
    timestamp: number,
    data: string,
  ): string => CryptoJS.SHA256(index + prevHash + timestamp + data).toString();

  static validateStructure = (block: Block): boolean =>
    typeof block.getIndex() === 'number' &&
    typeof block.getHash() === 'string' &&
    typeof block.getPrevHash() === 'string' &&
    typeof block.getTimestamp() === 'number' &&
    typeof block.getData() === 'string';

  constructor(
    index: number,
    hash: string,
    prevHash: string,
    data: string,
    timestamp: number,
  ) {
    this.index = index;
    this.hash = hash;
    this.prevHash = prevHash;
    this.data = data;
    this.timestamp = timestamp;
  }

  public getIndex = () => {
    return this.index;
  };
  public getHash = () => {
    return this.hash;
  };
  public getPrevHash = () => {
    return this.prevHash;
  };
  public getData = () => {
    return this.data;
  };
  public getTimestamp = () => {
    return this.timestamp;
  };
}

const genesisBlock: Block = new Block(0, 'hash', '', 'data', Date.now());

let blockChain: Block[] = [genesisBlock];
const getBlockChain = (): Block[] => blockChain;

const getLatestBlock = (): Block => blockChain[blockChain.length - 1];

const getNewTimestamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
  const prevBlock: Block = getLatestBlock();
  const newIndex: number = prevBlock.getIndex() + 1;
  const newTimestamp: number = getNewTimestamp();
  const newHash: string = Block.calcBlockHash(
    newIndex,
    prevBlock.getHash(),
    newTimestamp,
    data,
  );
  const newBlock: Block = new Block(
    newIndex,
    newHash,
    prevBlock.getHash(),
    data,
    newTimestamp,
  );

  return newBlock;
};

const getHashforBlock = (block: Block): string =>
  Block.calcBlockHash(
    block.getIndex(),
    block.getPrevHash(),
    block.getTimestamp(),
    block.getData(),
  );

const isBlockValid = (candidateBlock: Block, prevBlock: Block): boolean => {
  if (!Block.validateStructure(candidateBlock)) {
    return false;
  } else if (prevBlock.getIndex() + 1 !== candidateBlock.getIndex()) {
    return false;
  } else if (prevBlock.getHash() !== candidateBlock.getPrevHash()) {
    return false;
  } else if (candidateBlock.getHash() !== getHashforBlock(candidateBlock)) {
    return false;
  } else {
    return true;
  }
};

const addBlock = (candidateBlock: Block): void => {
  if (isBlockValid(candidateBlock, getLatestBlock())) {
    blockChain.push(candidateBlock);
  }
};
console.log(createNewBlock('data1'), createNewBlock('data2'));

export {}; // * export on TS
