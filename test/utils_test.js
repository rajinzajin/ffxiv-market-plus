import {
	convertToArray,
	filterItemJsonObjects,
	getItemImageUrl,
	getItemNameByID,
	getLowestPriceItem,
} from "../src/utils/item_utils.js";
import assert from "assert";
import marketable_items from "../src/data/marketable_items.json" assert { type: "json" };

describe("item meta data", function () {
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
	it("get item image url", function () {
		assert.equal(
			getItemImageUrl(1),
			`https://rajinzajin.github.io/ffxiv-assets/icon2x/1.png`
		);
		assert.equal(
			getItemImageUrl(2),
			`https://rajinzajin.github.io/ffxiv-assets/icon2x/2.png`
		);
	});
});

describe("getLowestPriceOnMannequin", () => {
	it("should return null for an empty array", () => {
		const result = getLowestPriceItem([]);
		assert.strictEqual(result, null);
	});

	it("should return the object with the lowest pricePerUnit", () => {
		const purchases = [
			{
				hq: true,
				pricePerUnit: 100,
				quantity: 1,
				buyerName: "Bob",
				onMannequin: false,
			},
			{
				hq: false,
				pricePerUnit: 50,
				quantity: 2,
				buyerName: "Alice",
				onMannequin: true,
			},
			{
				hq: true,
				pricePerUnit: 75,
				quantity: 1,
				buyerName: "Charlie",
				onMannequin: true,
			},
			{
				hq: true,
				pricePerUnit: 80,
				quantity: 1,
				buyerName: "Dave",
				onMannequin: false,
			},
			{
				hq: true,
				pricePerUnit: 40,
				quantity: 3,
				buyerName: "Eve",
				onMannequin: true,
			},
		];
		const result = getLowestPriceItem(purchases);
		assert.deepStrictEqual(result, {
			hq: true,
			pricePerUnit: 40,
			quantity: 3,
			buyerName: "Eve",
			onMannequin: true,
		});
	});
});
