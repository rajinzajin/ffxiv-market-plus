import { describe } from "mocha";
import { filterArray } from "../src/utils/array_object.js";
import assert from "assert";
import { formatNumberToGilString } from "../src/utils/format_function.js";

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

    it("convert number to gil format string", function () {
        assert.deepEqual(formatNumberToGilString(1000000), "1,000,000")
        assert.deepEqual(formatNumberToGilString(9999), "9,999")
        assert.deepEqual(formatNumberToGilString(123456), "123,456")
	});
});
