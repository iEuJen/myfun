import { FileHandler } from '../../common/fileHandler'

/**
 * 圖片壓縮函數, 壓縮完的圖片都爲jpeg格式
 * @param args, Args 配置參數
 * @param callback 回調, 用於接收處理結果, 如果不傳, 則返回 promise 對象
 */
interface Args {
    fileName: string, // 文件名
    src?: string, // 圖片路徑
    file?: File, // 圖片文件
    quality?: number // 壓縮的圖片質量, 取值範圍  0 到 1, 默認 0.1, 以實現最大程度壓縮圖片
}

export default function (args: Args, callback?: Function): Promise<object> | null {
     /* global Image */
    // 提取 參數
    let { fileName, src, file, quality = 0.1 } = args || {}
    // 判斷主要參數是否爲空
    if (!fileName) {
        console.error('參數 args.fileName 不能爲空')
        return null
    }
    // 用於處理文件的對象
    const fileHandler: FileHandler = new FileHandler()

    // 主邏輯函數
    async function main (response: Function) {
        try {
            if (!file && !src) return console.error('src 與 file 參數 不可都爲空')
            // 如果存在文件, 則將文件轉換爲 base64, 並賦值給 src
            if (file) {
                let result = await fileHandler.fileToBase64(file)
                src = result as string
            }
            // 根據 src 渲染圖像
            let img = new Image()
            img.src = src
            // 等待圖片加載完畢
            img.onload = () => {
                // 根據圖片, 繪製 canvas
                let canvas = document.createElement('canvas')
                let ctx = canvas.getContext('2d')
                canvas.width = img.width
                canvas.height = img.height
                ctx.fillStyle = '#fff'
                ctx.fillRect(0, 0, canvas.width, canvas.height)
                ctx.drawImage(img, 0, 0, img.width, img.height)
                // 進行壓縮, 獲取 base64
                let base64 = canvas.toDataURL('image/jpeg', quality)
                // 將 base64 轉爲 文件
                let file = fileHandler.base64ToFile(base64, fileName)
                // 響應結果
                response({
                    base64,
                    file
                })
            }
        } catch (err) {
            console.error(err)
        }
    }

    // 如果存在 callback 回到函數, 則 傳遞回調函數, 並終止函數, 否則, 則 返回 promise, 在 promise 中 執行 main 函數
    if (callback) {
        main(callback)
        return null
    } else {
        return new Promise(resolve => {
            main(resolve)
        })
    }
}