import { setRatio, calcValue } from "./get_exchange.js";
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
	await initSelectData();
	let from_dom = document.querySelector('#from_country');
	let to_dom = document.querySelector('#to_country');
	let input_dom = document.querySelector('.from_box input');
	await setRatio(from_dom);
	from_dom.addEventListener('change', setRatio);
	input_dom.addEventListener('change', calcValue);
	to_dom.addEventListener('change', calcValue);
}
