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
export function getWorldNameFromMapping(world_mapping, id){
	const id_key = "0"
	const name_key = "1"
	var filteredWorld = world_mapping.filter(world_map=>{
		return world_map[id_key] === String(id)
	})
	return filteredWorld.length > 0 ? filteredWorld[0][name_key] : ""
}