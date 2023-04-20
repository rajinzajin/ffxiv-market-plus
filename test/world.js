import { describe } from "mocha";
import assert from "assert";
import { getWorld } from "../src/utils/world_function.js";

describe("get world by id", function () {
	it("should return world object by id", function () {
		assert.deepEqual(getWorld(21), { id: 21, name: "Ravana" });
		assert.deepEqual(getWorld(22), { id: 22, name: "Bismarck" });
	});
});
