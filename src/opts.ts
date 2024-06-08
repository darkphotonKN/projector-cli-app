import cli from "command-line-args";

/**
 * Responsible for command line options
 **/

export type Opts = {
  args?: string[]; // arguments passed in to command line
  pwd?: string; // personal working directory - current or passed in
  config?: string; // extra configs
};

export function opts() {
  console.log("beginning opts");

  return cli([
    // take primary arguments
    {
      name: "args",
      defaultOption: true,
      // allow for multiple items to be passed into this command line argument
      multiple: true,
      type: String,
    },
    // take arguments under a certain flag
    {
      name: "config",
      alias: "c",
      type: String,
    },
    // take arguments under a certain flag
    {
      name: "pwd",
      alias: "p",
      type: String,
    },
  ]) as Opts;
}
