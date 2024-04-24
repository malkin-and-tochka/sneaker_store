const FormData = global.FormData
export const prepareImg = (image, productCode) => {
    const formImageData = new FormData()
    formImageData.append(`multipartFile`, {
        uri: image.uri,
        type: image.mimeType,
        name: 'testFile'
    })
    formImageData.append('isPrime', true)
    formImageData.append('id', productCode)
    const config = {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'multipart/form-data',
        }
    }
    return [formImageData, config]
}
