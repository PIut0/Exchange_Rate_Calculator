
const apiKey = '2ebc5f37baf4b0b136ea1236';
//const apiKey = '109d27894ba50e6511b9ec62';
let exchangeRatio;

let exchangeDataErr = () => {
	alert("환율정보를 찾을 수 없습니다.");
}

let calcValue = async () => {
	let code = document.querySelector('#to_country').value;
	let ratio = exchangeRatio[code];
	let input = document.querySelector('.from_box input').value;
	let value = input * ratio;
	document.querySelector('.to_box input').value = value;
}

let setRatio = async () => {
	let baseCode = document.querySelector('#from_country').value;
	let url = 'https://v6.exchangerate-api.com/v6/' + apiKey + "/latest/" + baseCode;
	let res = await fetch(url);
	if (res.status === 200) {
		let data = await res.json();
		console.log(data);
		if (data.result === "success") {
			exchangeRatio = data.conversion_rates;
			calcValue();
		} else {
			exchangeDataErr();
		}
	} else {
		throw new Error("Error get exchange data");
	}
}

export { setRatio, calcValue }
