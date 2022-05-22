import SHA256 from 'crypto-js/sha256';

class Block {
  private readonly index: number;
  private readonly hash: string;
  private readonly prevHash: string;
  private readonly data: string;
  private readonly timestamp: number;

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

  static calcBlockHash = (
      index: number,
      prevHash: string,
      timestamp: number,
      data: string,
  ): string => (
      SHA256(index + prevHash + timestamp + data)
          .toString()
  );

  static validateStructure = (block: Block): boolean =>
      typeof block.getIndex() === 'number' &&
      typeof block.getTimestamp() === 'number' &&
      typeof block.getHash() === 'string' &&
      typeof block.getPrevHash() === 'string' &&
      typeof block.getData() === 'string';

  public getIndex() {
    return this.index;
  };

  public getHash() {
    return this.hash;
  };

  public getPrevHash() {
    return this.prevHash;
  };

  public getData() {
    return this.data;
  };

  public getTimestamp() {
    return this.timestamp;
  };

}

const now = Date.now();
const genesisBlock: Block = new Block(0, 'hash', '', 'data', now);

let blockChain: Block[] = [genesisBlock];
const getBlockChain = (): Block[] => blockChain;

const getLatestBlock = (): Block => blockChain[blockChain.length - 1];

const today = new Date;
const time = today.getTime();
const getNewTimestamp = (): number => Math.round(time / 1000);

const createNewBlock = (data: string): Block => {
  const prevBlock: Block = getLatestBlock();
  const prevHash = prevBlock.getHash();

  const newIndex: number = prevBlock.getIndex() + 1;
  const newTimestamp: number = getNewTimestamp();
  const newHash: string = Block.calcBlockHash(
      newIndex,
      prevHash,
      newTimestamp,
      data,
  );
  const newBlock: Block = new Block(
      newIndex,
      newHash,
      prevHash,
      data,
      newTimestamp,
  );

  addBlock(newBlock);
  return newBlock;
};

const getHashForBlock = (block: Block): string => {
  const index = block?.getIndex() ?? 0;
  const prevHash = block?.getPrevHash() ?? '';
  const timestamp = block?.getTimestamp() ?? 0;
  const data = block?.getData() ?? '';

  return Block.calcBlockHash(
      index,
      prevHash,
      timestamp,
      data,
  );
};

const isBlockValid = (candidateBlock: Block, prevBlock: Block): boolean => {
  if (!Block.validateStructure(candidateBlock)) {
    return false;
  }

  if (prevBlock.getIndex() + 1 !== candidateBlock.getIndex()) {
    return false;
  }

  if (prevBlock.getHash() !== candidateBlock.getPrevHash()) {
    return false;
  }

  return candidateBlock.getHash() === getHashForBlock(candidateBlock);
};

const addBlock = (candidateBlock: Block): void => {
  const latestBlock = getLatestBlock();

  if (isBlockValid(candidateBlock, latestBlock)) {
    blockChain = [...blockChain, candidateBlock];
  }
};

createNewBlock('data1');
createNewBlock('data2');
createNewBlock('data3');

console.log(blockChain);

export {}; // * export on TS
