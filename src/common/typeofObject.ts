/**
 * 判斷一個對象的具體類型
 * @param obj 要判斷 的 Object 對象
 * 
 * 應用場景
 *  - typeof Array File FormData 都是 object 的時候
 */
function typeofObject (obj: object): string {
    if (typeof obj !== 'object') return '!object'
    if (obj instanceof Array) {
        return 'array'
    } else if (obj instanceof File) {
        return 'file'
    } else if (obj instanceof FormData) {
        return 'formData'
    } else {
        return 'object'
    }
}

export default typeofObject