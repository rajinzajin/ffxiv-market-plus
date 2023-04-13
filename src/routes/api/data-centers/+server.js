import { error } from "@sveltejs/kit";
import axios from "axios";

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	var res = await axios("https://universalis.app/api/v2/data-centers")
	return new Response(JSON.stringify(res.data));
}
