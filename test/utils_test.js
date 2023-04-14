import { convertToArray } from "../src/utils/item_objects_to_array.js";
import assert from "assert";

describe("Utils", function () {
	const input = {
		3: {
			en: "Ice Shard",
			de: "Eisscherbe",
			ja: "アイスシャード",
			fr: "Éclat de glace",
		},
	};
	const output = [
		{
			_id: "3",
			en: "Ice Shard",
			de: "Eisscherbe",
			ja: "アイスシャード",
			fr: "Éclat de glace",
		},
	];
	
	it("convert item json objects to array", function () {
		const convertedInput = convertToArray(input)
		assert.equal(convertedInput.length, output.length)
		assert.equal(convertedInput[0]._id, output[0]._id)
		assert.equal(convertedInput[0].en, output[0].en)
		assert.equal(convertedInput[0].de, output[0].de)
		assert.equal(convertedInput[0].ja, output[0].ja)
		assert.equal(convertedInput[0].fr, output[0].fr)
	});
});
