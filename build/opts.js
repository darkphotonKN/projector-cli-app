"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.opts = void 0;
const command_line_args_1 = __importDefault(require("command-line-args"));
function opts() {
    console.log("beginning opts");
    return (0, command_line_args_1.default)([
        // take primary arguments
        {
            name: "args",
            defaultOption: true,
            // allow for multiple items
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
    ]);
}
exports.opts = opts;
