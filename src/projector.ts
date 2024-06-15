// take in a config and create a projector
// walk the tree

import * as fs from "fs";
import { Config } from "./config";

type Data = {
  projector: {
    [key: string]: {
      [key: string]: string;
    };
  };
};

// handles creating an instance of a Projector
const defaultData = {
  projector: {},
};

class Projector {
  constructor(
    private config: Config,
    private data: Data,
  ) {}

  static fromConfig(config: Config): Projector {
    // check file exists
    if (fs.existsSync(config.config)) {
      let data: Data;
      try {
        // fetch config file
        data = JSON.parse(fs.readFileSync(config.config).toString());
      } catch (err) {
        // load default config
        data = defaultData;
      }
      return new Projector(config, data);
    }

    return new Projector(config, defaultData);
  }
}

export default Projector;
