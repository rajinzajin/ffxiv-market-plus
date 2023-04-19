import { describe, it } from "mocha";
import { getDataCenter } from "../src/utils/data_center_function.js";
import assert from "assert";

describe("get data center function test", () => {
	const data_centers = [
		{ name: "Elemental" },
		{ name: "Materia" },
		{ name: "Gaia" },
		{ name: "Mana" },
	];
	it("get data center from array list by name", () => {
		assert.deepEqual(getDataCenter(data_centers, "Elemental"), {
			name: "Elemental",
		});
		assert.deepEqual(getDataCenter(data_centers, "Materia"), {
			name: "Materia",
		});
	});
	it("return null when not found", () => {
		assert.deepEqual(getDataCenter(data_centers, "Aether"), null);
	});
	it("return null if data centers empty", () => {
		assert.deepEqual(getDataCenter([], "Materia"), null);
	});
});
