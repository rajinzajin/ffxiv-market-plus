import world_names from "../data/world_names.json" assert { type: "json" };

export function getWorlds() {
	return world_names;
}
export function getWorld(id) {
	var filteredWorld = world_names.filter((world) => world.id === id);
	return filteredWorld.length > 0 ? filteredWorld[0] : null;
}
export function filterWorldsByIDs(worlds, ids) {
	return worlds.filter((world) => {
		return ids.includes(world["id"]);
	});
}
export function getWorldNameFromMapping(world_mapping, id) {
	const id_key = "0";
	const name_key = "1";
	var filteredWorld = world_mapping.filter((world_map) => {
		return world_map[id_key] === String(id);
	});
	return filteredWorld.length > 0 ? filteredWorld[0][name_key] : "";
}
