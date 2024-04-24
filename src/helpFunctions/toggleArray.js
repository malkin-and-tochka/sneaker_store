export function updateArray(array, element) {
    const index = array.indexOf(element);
    if (index !== -1) {
        array.splice(index, 1);
    } else {
        array.push(element);
    }
    return array;
}
