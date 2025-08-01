export function formatToKoreanUnits(num: number) {
	if (typeof num !== 'number' || num < 0) return '';

	const EOK = 100000000;
	const MAN = 10000;

	const eok = Math.floor(num / EOK);
	const manWithDecimal = (num % EOK) / MAN;

	const result = [];
	if (eok > 0) result.push(`${eok.toLocaleString()}억`);
	if (manWithDecimal >= 1) {
		// 소수 둘째 자리까지 표시, 필요하면 소수점 자리 조절 가능
		const manStr = manWithDecimal.toLocaleString(undefined, {
			minimumFractionDigits: 0,
			maximumFractionDigits: 2,
		});
		result.push(`${manStr}만`);
	}

	return result.join(' ') || '0';
}
