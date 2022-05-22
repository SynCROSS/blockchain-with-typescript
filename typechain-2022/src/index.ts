import { createHash } from "crypto";

type Hash = string;
type Height = number;
type Data = string;

type GenerateHashParams = {
  readonly prevHash: Hash,
  readonly height: Height,
  readonly data: Data
}

class Block {
  private readonly _hash: Hash;

  constructor(
      private readonly _prevHash: Hash,
      private readonly _height: Height,
      private readonly _data: Data
  ) {
    this._hash = Block.generateHash({
                                      prevHash: this._prevHash,
                                      height:   this._height,
                                      data:     this._data
                                    });
  }


  get hash(): Hash {
    return this._hash;
  }

  get prevHash(): Hash {
    return this._prevHash;
  }

  get height(): Height {
    return this._height;
  }

  get data(): Data {
    return this._data;
  }

  private static generateHash<T extends GenerateHashParams>({
                                                              prevHash,
                                                              height,
                                                              data
                                                            }: T) {
    return createHash("sha256")
        .update(`${prevHash}${height}${data}`)
        .digest("hex");
  }
}

class BlockChain {
  constructor() {
    this._blocks = [];
  }

  private _blocks: Block[];

  get blocks(): readonly Block[] {
    if (!Array.isArray(this._blocks)) {
      return [];
    }

    return [...this._blocks];
  }

  public addBlockWithData(data: Data) {
    const newBlock = new Block(this.getPrevHash(), this._blocks.length, data);
    this._blocks = [...this._blocks, newBlock];
    return this;
  }

  private getPrevHash(): Hash {
    if (!Array.isArray(this._blocks) || !this?._blocks?.length) {
      return '';
    }

    return this?._blocks?.at(-1)?.hash ?? '';
  }
}

const blockChain = new BlockChain().addBlockWithData('First')
                                   .addBlockWithData('Second');

console.log(blockChain.blocks);