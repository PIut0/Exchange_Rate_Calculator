import { } from "./get_exchange.js";
import { getCurrencyData } from "./parseCurrencyData.js";

let addSelectBox = (currencyData, selectId, defaultCurrency) => {
	let selectBox = document.querySelector(selectId);
	console.log(selectBox);
	for (let i = 0; i < currencyData.length; i++) {
		let element = document.createElement("option");
		let text = currencyData[i].code + " (" + currencyData[i].symbol + ")";
		let textNode = document.createTextNode(text);
		element.appendChild(textNode);
		if (currencyData[i].code === defaultCurrency)
			element.selected = true;
		element.value = currencyData[i].code;
		selectBox.appendChild(element);
	}
}

let initSelectData = async () => {
	let currencyData = await getCurrencyData();
	addSelectBox(currencyData, '#from_country', 'USD');
	addSelectBox(currencyData, '#to_country', 'KRW');
}

window.onload = async () => {
	initSelectData();
}
