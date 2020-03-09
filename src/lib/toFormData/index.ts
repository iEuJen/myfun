// 引入其他輔助函數
import resetObject from './resetObject'
import resetArray from './resetArray'
import typeofObject from '../../common/typeofObject'

/**
 * 此函數用於將 JSON 數據, 深拷貝並轉換爲 formData 數據
 * @param {*} data 接受傳入的 JSON 數據
 * 
 * 應用場景
 *  - 當php程序員 只會處理表單數據 的時候
 */

function toFormData (data: object = {}): FormData {
    let formData = new FormData()
    // 將 JSON 拆解爲 [key, value] 組成的 二維數組, 並遍歷
    Object.entries(data).forEach( ( [key, value] ) => {
        // 如果數據 為 object, 且 非數組 非 File 對象, 則調用 對象 處理函數, 否則 ,調用 數組處理函數
        if ( typeofObject(value) === 'object' ) {
            resetObject(formData, value, key)
            return false
        } else if ( typeofObject(value) === 'array' ) {
            resetArray(formData, value, key)
            return false
        }
        formData.append(key, value)
    })
    return formData
}

// 靜態方法
toFormData.wx = function (data: object = {}): object {
    // 創建 FormData 表單數據類型
    let formatted = {}
    // 遍歷 json 數據, 添加到 formatted 中
    Object.entries(data).forEach( ( [key, value] ) => {
        // 如果 數據 為 對象, 且 非 數組, 則調用 對象 處理函數, 否則 ,調用 數組處理函數
        if ( typeofObject(value) === 'object' ) {
            resetObject(formatted, value, key)
            return false
        } else if ( typeofObject(value) === 'array' ) {
            resetArray(formatted, value, key)
            return false
        }
        formatted[key] = value
    })
    return formatted
}
export default toFormData