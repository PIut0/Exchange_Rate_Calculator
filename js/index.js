import { } from "./get_exchange.js";
import { getCurrencyData } from "./parseCurrencyData.js";

window.onload = async () => {

	let data = await getCurrencyData();

	console.log(data);
}
