import resetObject from './resetObject'
import typeofObject from '../../common/typeofObject'

/**
 * 結構 數組
 * @param {*} formData 要存入的 formData 對象
 * @param {*} array 要結構的 數據(數組格式)
 * @param {*} keyname 該對象在父元素對象中的鍵名
 */
function resetArray (formData: FormData | object, array: Array<any>, keyname: string) {
    // 遍歷數組
    array.forEach( (item, index) => {
        // 記錄 鍵值 以及 鍵名
        let key = `${keyname}[${index}]`
        let value = item
        // 如果數組元素爲 對象 且 非數組, 則調用 對象的 處理方式, 否則, 若爲 數組, 則 遞歸調用
        if ( typeofObject(value) === 'object' ) {
            resetObject(formData, value, key)
            return false
        } else if ( typeofObject(value) === 'array' ) {
            resetArray(formData, value, key)
            return false
        }
        // 將 數據, 以鍵值對 的 形式 保存到 formData 中
        formData instanceof FormData ? formData.append(key, value) : formData[key] = value
    })
}

export default resetArray