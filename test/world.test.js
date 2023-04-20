import { describe } from "mocha";
import assert from "assert";
import { filterWorldsByIDs, getWorld } from "../src/utils/world_function.js";

describe("world test", function () {
	it("filter world by array of id", function () {
		const worlds = [
			{ id: 1, name: "World 1" },
			{ id: 2, name: "World 2" },
			{ id: 3, name: "World 3" },
		];
		assert.deepEqual(filterWorldsByIDs(worlds, [1]), [
			{ id: 1, name: "World 1" },
		]);
		assert.deepEqual(filterWorldsByIDs(worlds, [1, 3]), [
			{ id: 1, name: "World 1" },
			{ id: 3, name: "World 3" },
		]);
	});
	it("get world by id", function () {
		assert.deepEqual(getWorld(21), { id: 21, name: "Ravana" });
	});
});
