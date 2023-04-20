import { browser } from "$app/environment";
import { writable } from "svelte/store";

export const data_center_store = writable([]);

export const main_world = writable(null);
export const world_store = writable([]);

export const main_dc = writable(
	(browser && localStorage.getItem("main_dc")) || "Elemental"
);
main_dc.subscribe((val) => {
	browser && localStorage.setItem("main_dc", val);
});
