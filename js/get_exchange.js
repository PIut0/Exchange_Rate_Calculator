
//const apiKey = '2ebc5f37baf4b0b136ea1236';
const apiKey = '109d27894ba50e6511b9ec62';

let exchangeRatio;				// 기준통화를 기준으로 다른 통화들과의 환율 정보를 저장

// API 호출 횟수가 다 되었거나, API에 특정 통화의 기준이 없는 경우
let exchangeDataErr = () => {
	alert("환율정보를 찾을 수 없습니다.");
}

// 기준 통화의 값과 환율정보를 가져와서 결과창에 값을 입력
let calcValue = async () => {
	let code = document.querySelector('#to_country').value;
	let ratio = exchangeRatio[code];
	let input = document.querySelector('.from_box input').value;
	let value = input * ratio;
	value = Math.round(value);
	document.querySelector('.to_box input').value = value;
}

// 기준통화를 기준으로 다른 통화들의 환율 정보를 받아온 후 저장
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
