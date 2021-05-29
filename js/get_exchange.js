
const apiKey = '109d27894ba50e6511b9ec62';
let exchangeRatio;

let setRatio = async (baseCode) => {
	let url = 'https://v6.exchangerate-api.com/v6/' + apiKey + "/" + baseCode;
	let res = await fetch(url);
	if (res.status === 200) {
		let data = await res.json();
		exchangeRatio = data.conversion_rates;
	}
}

let calcValue = (code) => {
	let ratio = exchangeRatio[code];
	let input = document.querySelector('.from_box input').value;
	let value = input * ratio;
	document.querySelector('./to_box input').value = value;
}

export { setRatio, calcValue }
