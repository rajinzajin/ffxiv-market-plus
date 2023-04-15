import axios from "axios";

let cachedWorlds;
export async function getWorlds() {
	if (cachedWorlds != null) {
		return cachedWorlds;
	}
	var res = await axios("https://universalis.app/api/v2/worlds");
	cachedWorlds = res.data;
	return cachedWorlds;
}
export function filterWorldsByIDs(worlds, ids) {
	return worlds.filter((world) => {
		return ids.includes(world["id"]);
	});
}
