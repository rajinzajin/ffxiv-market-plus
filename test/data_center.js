import { describe, it } from "mocha";
import { getDataCenter } from "../src/utils/data_center_function.js";
import assert from "assert";

describe("get data center function test", () => {

	it("get data center from array list by name", () => {
		assert.equal(getDataCenter("Elemental").name, "Elemental");
		assert.equal(getDataCenter("Materia").name, "Materia");
	});
	it("return null when not found", () => {
		assert.equal(getDataCenter("Not A Datacenter"), null);
	});
});
