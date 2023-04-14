export function convertToArray(jsonObjects) {
	var itemsArray = Object.entries(jsonObjects).map(([key, value]) => {
		return {
			_id: key,
			...value,
		};
	});
  return itemsArray;
}

export function filterItemJsonObjects(items_json, item_name, max_result = -1){
	const filteredJson = {};
	var result_count = 0;
	Object.keys(items_json).forEach((key) => {
		if(max_result != -1 && result_count >= max_result) {
			return;
		}
		if (items_json[key].en.toLowerCase().includes(item_name.toLowerCase())) {
			filteredJson[key] = items_json[key];
			result_count++;
		}
	});

	return filteredJson
}