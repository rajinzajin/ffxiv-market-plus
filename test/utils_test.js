import {
	convertToArray,
	filterItemJsonObjects,
	getItemNameByID,
} from "../src/utils/item_utils.js";
import assert from "assert";
import marketable_items from "../src/data/marketable_items.json" assert { type: "json" };

describe("Utils", function () {
	const json_objects = {
		3: {
			en: "Ice Shard",
			de: "Eisscherbe",
			ja: "アイスシャード",
			fr: "Éclat de glace",
		},
		9: {
			en: "Ice Crystal",
			de: "Eiskristall",
			ja: "アイスクリスタル",
			fr: "Cristal de glace",
		},
	};
	const convertArrayOutput = [
		{
			_id: "3",
			en: "Ice Shard",
			de: "Eisscherbe",
			ja: "アイスシャード",
			fr: "Éclat de glace",
		},
		{
			_id: "9",
			en: "Ice Crystal",
			de: "Eiskristall",
			ja: "アイスクリスタル",
			fr: "Cristal de glace",
		},
	];

	it("convert item json objects to array", function () {
		const convertedInput = convertToArray(json_objects);
		assert.equal(convertedInput.length, convertArrayOutput.length);
		assert.equal(convertedInput[0]._id, convertArrayOutput[0]._id);
		assert.equal(convertedInput[0].en, convertArrayOutput[0].en);
		assert.equal(convertedInput[0].de, convertArrayOutput[0].de);
		assert.equal(convertedInput[0].ja, convertArrayOutput[0].ja);
		assert.equal(convertedInput[0].fr, convertArrayOutput[0].fr);
	});

	it("filter item json objects", function () {
		assert.equal(
			convertToArray(filterItemJsonObjects(json_objects, "Ice Shard")).length,
			1
		);
		assert.equal(
			convertToArray(filterItemJsonObjects(json_objects, "None")).length,
			0
		);
		assert.equal(
			convertToArray(filterItemJsonObjects(json_objects, "Ice Crystal")).length,
			1
		);
		assert.equal(
			convertToArray(filterItemJsonObjects(json_objects, "Ice", 1)).length,
			1
		);
		assert.equal(
			convertToArray(filterItemJsonObjects(json_objects, "Ice", 0)).length,
			0
		);
	});

	it("get item name by id", function () {
		assert.equal(getItemNameByID(marketable_items, 3), "Ice Shard");
		assert.equal(getItemNameByID(marketable_items, -1), "");
	});
});
