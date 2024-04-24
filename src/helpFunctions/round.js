export function roundNumber(num) {
    if (Number.isInteger(num)) {
        return num;
    } else {
        return Math.round((num + Number.EPSILON) * 100) / 100;
    }
}
