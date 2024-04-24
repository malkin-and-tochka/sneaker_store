export const searchProducts = (products, substring = '') => products.filter(product => product.name.includes(substring))
export const sortByOrder = (products, ascending = true) => {
    if (ascending) return products.sort((a, b) => a.price - b.price)
    return products.sort((a, b) => b.price - a.price)
}
export const filterProducts = (products, minPrice = Number.NEGATIVE_INFINITY, maxPrice = Number.POSITIVE_INFINITY, minSize = Number.NEGATIVE_INFINITY, maxSize = Number.POSITIVE_INFINITY) => {
    if (maxSize === 0 ) maxSize = Number.POSITIVE_INFINITY
    if (maxPrice === 0) maxPrice = Number.POSITIVE_INFINITY
    if (minPrice === 0) minPrice = Number.NEGATIVE_INFINITY
    if (minSize === 0) minSize = Number.NEGATIVE_INFINITY
    return products.filter(product => {
        const priceInRange = product.price >= minPrice && product.price <= maxPrice;
        const hasRequiredSize = product.sizes.some(size => size >= minSize && size <= maxSize)
        return priceInRange && hasRequiredSize;
    });
}
