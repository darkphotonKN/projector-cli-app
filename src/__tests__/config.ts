import getConfig, { Operation } from "../config";

// Unit Tests
test("operation", () => {
  // create test object to simulate opts recieved from arguments
  const opts = { args: ["test"] };

  const newConfig = getConfig({});

  expect(newConfig.operation).toEqual(Operation.PRINT);
});

test("config path", () => {
  const opts = { args: ["test"] };

  const config = getConfig(opts);

  expect(config.config).toEqual(
    "/Users/kranti/.config/projector/.projector.json",
  );
});

test("add key value", () => {
  const opts = { args: ["add", "key", "test"] };

  const config = getConfig(opts);

  // operation should be "ADD"
  expect(config.operation).toEqual(Operation.ADD);

  // stored args should be "key", "test"
  expect(config.args).toEqual(["key", "test"]);
});

test("remove key", () => {
  const opts = { args: ["rm", "key"] };

  const config = getConfig(opts);

  // operation should be "ADD"
  expect(config.operation).toEqual(Operation.REMOVE);

  // stored args should be "key", "test"
  expect(config.args).toEqual(["key"]);
});
