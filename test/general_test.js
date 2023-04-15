import { describe } from "mocha";
import { filterArray } from "../src/utils/array_object.js";
import assert from "assert";

describe("general test", function () {
	it("filter array with parameters", function () {
		const people = [
			{ name: "Alice", age: 30, city: "New York" },
			{ name: "Bob", age: 25, city: "Boston" },
			{ name: "Charlie", age: 35, city: "Chicago" },
			{ name: "David", age: 40, city: "New York" },
		];

		const filteredPeople = filterArray(people, { city: "New York", age: 30 });
		assert.deepEqual(filteredPeople, [
			{ name: "Alice", age: 30, city: "New York" },
		]);
	});
});
