
let dataSorting = (data) => {			// 데이터를 내림차순으로 정렬
	data.sort((a, b) => {
		if (a.code < b.code)
			return -1;
		else
			return 1;
	});
	return (data);
}

let getCurrencyData = async () => {		// 다양한 국가의 통화 정보를 파싱
	let res = await fetch("https://restcountries.eu/rest/v2/all");
	if (res.status === 200) {
		let data = await res.json();
		let result = new Array;
		data.forEach(ele => {
			ele.currencies.forEach(async cur => {
				let code = cur.code;
				let symbol = cur.symbol;
				if (!code || !symbol || code.length != 3)
				return ;
				for (let i = 0; i < result.length; i++) {
					if (result[i].code === code)
						return ;
				}
				result.push({
					"code": code,
					"symbol": symbol
				});
			})
		});
		result = dataSorting(result);
		return (result);
	} else {
		throw new Error("Error getCurrencyData");
	}
}

export { getCurrencyData };
