export function convertToArray(jsonObjects) {
	var itemsArray = Object.entries(jsonObjects).map(([key, value]) => {
		return {
			_id: key,
			...value,
		};
	});
  return itemsArray;
}

export function filterItemJsonObjects(items_json, item_name){
	const filteredJson = {};

	Object.keys(items_json).forEach((key) => {
		if (items_json[key].en.toLowerCase().includes(item_name.toLowerCase())) {
			filteredJson[key] = items_json[key];
		}
	});

	return filteredJson
}