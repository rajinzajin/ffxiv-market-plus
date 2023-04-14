export function convertToArray(jsonObjects) {
	var itemsArray = Object.entries(jsonObjects).map(([key, value]) => {
		return {
			id: key,
			...value,
		};
	});
  return itemsArray;
}