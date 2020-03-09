import resetArray from './resetArray'
import typeofObject from '../../common/typeofObject'

/**
 * 解構 object 格式的 數據
 * @param {*} formData 要存入的 formData | object(wx中) 對象 
 * @param {*} obj 要結構的 數據(對象格式)
 * @param {*} keyname 該對象在父元素對象中的鍵名
 */
function resetObject (formData: FormData | object, obj: object, keyname: string) {
    // 解構出 obj 所有的 鍵值對, 並遍歷
    Object.entries(obj).forEach( ( [key, value] ) => {
        let formKey: string = `${keyname}[${key}]`
        // 如果數據 為 object, 且 非數組 非 File 對象, 則調用 對象 處理函數, 否則 ,調用 數組處理函數
        if ( typeofObject(value) === 'object' ) {
            resetObject(formData, value, formKey)
            return false
        } else if ( typeofObject(value) === 'array' ) {
            resetArray(formData, value, formKey)
            return false
        }
        // 判斷 formData 的 數據類型
        formData instanceof FormData ? formData.append(formKey, value) : formData[formKey] = value
    })
}

export default resetObject