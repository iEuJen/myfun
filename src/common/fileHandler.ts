/**
 * 文件處理對象
 */

class FileHandler {
    /**
     * 文件轉base64字符串
     * @param file 文件對象, 返回一個 promise, 當 解析成功, 返回 base64 字符串
     */
    public fileToBase64 (file: File): Promise<ArrayBuffer | string> {
        /* global FileReader */
        // 創建 FileReader 解析爲 base64 格式
        let fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        return new Promise( (resolve, reject) => {
            // 解析成功
            fileReader.onload = function () {
                resolve(fileReader.result)
            }
            // 發生錯誤
            fileReader.onerror = function () {
                reject('error: 文件讀取發生錯誤')
            }
        })
    }

    /**
     * base64字符串 轉 文件
     * @param dataurl base64 字符串
     * @param fileName 文件名
     */
    public base64ToFile (dataurl: string, fileName: string) {
         /* global atob Uint8Array File */
        let arr = dataurl.split(',')
        let imgType = arr[0].match(/:(.*?);/)[1]
        let bstr = atob(arr[1])
        let n = bstr.length
        let u8arr = new Uint8Array(n)
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
        }
        return new File([u8arr], fileName, { type: imgType })
    }
}

export { FileHandler }