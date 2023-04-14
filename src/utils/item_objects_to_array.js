export function convertToArray(jsonObjects) {
	var itemsArray = Object.entries(jsonObjects).map(([key, value]) => {
		return {
			_id: key,
			...value,
		};
	});
  return itemsArray;
}