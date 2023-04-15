import { writable } from "svelte/store";

export const main_dc = writable(null)
export const data_center_store = writable([]);

export const main_world = writable(null)
export const world_store = writable([])