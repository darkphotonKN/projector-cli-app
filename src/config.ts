import { Opts } from "./opts";
import * as path from "path";

/**
 * Creates a Config
 */

// for constraining operation types
export enum Operation {
  PRINT,
  ADD,
  REMOVE,
}

export type Config = {
  args: string[];
  operation: Operation;
  config: string;
  pwd: string;
};

// return current working directory info, unless provided
function getPwd(opts: Opts): string {
  if (opts.pwd) {
    return opts.pwd;
  }

  // return their current work directory as their personal work directory
  return process.cwd();
}

function getConfig(opts: Opts): string {
  // default config folder location (MacOS)
  const homePath = process.env["HOME"];

  console.log("homePath:", homePath);
  if (homePath) {
    const configPath = path.join(homePath, ".config");
    console.log(configPath);
    // return projector config location
    return path.join(configPath, "projector", ".projector.json");
  }
  return "/";
}

// different action depending on the argument passed in
function getOperation(opts: Opts): Operation {
  if (!opts.args || opts.args.length == 0) {
    return Operation.PRINT;
  }

  if (opts.args[0] === "add") {
    return Operation.ADD;
  }

  if (opts.args[0] === "rm") {
    return Operation.REMOVE;
  }

  // exception case just expect print
  return Operation.PRINT;
}

// determine how many args was passed in before taking action
function getArgs(opts: Opts) {
  if (!opts.args || opts.args.length == 0) {
    return []; // return empty array since no args were passed
  }

  const operation = getOperation(opts);

  // when dealing with a PRINT operation
  if (operation === Operation.PRINT) {
    if (opts.args.length > 1) {
      throw Error(
        `Expected 0 or 1 arguments but instead got ${opts.args.length}.`,
      );
    }
    return opts.args;
  }

  // dealing with an ADD operation, expect "add" keyword + key value pair
  if (operation === Operation.ADD) {
    if (opts.args.length !== 3) {
      throw Error(
        `Expected 2 arguments but instead got ${opts.args.length - 1}.`,
      );
    }

    // dont include the first argument "add"
    return opts.args.slice(1);
  }

  // dealing with an REMOVE operation, expect "rm" keyword + key
  if (opts.args.length !== 2) {
    throw Error(
      `Expected 1 arguments but instead got ${opts.args.length - 1}.`,
    );
  }

  return opts.args.slice(1);
}

export default function config(opts: Opts): Config {
  return {
    pwd: getPwd(opts),
    config: getConfig(opts),
    args: getArgs(opts),
    operation: getOperation(opts),
  };
}
