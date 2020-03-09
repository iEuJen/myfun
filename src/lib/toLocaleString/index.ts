
// 引入輔助模塊
import compatible from './compatible'
import zeroPadding from './zeroPadding'

/**
 * 
 * @param t 要轉化的時間, 符合 new Date() 構造函數參數的值, 可以爲 Date, 時間字符串 或者 時間戳
 * @param format 格式字符串, 包含 YYYY(年) | MM(月) | DD(日) | hh(時)  | mm(分) | ss(秒)
 * @param zeroPad 補零(日期時間值不滿10), 用於決定是否補零
 * 
 * - 應用場景
 *  - 需要對時間字符串作自定義格式
 */

export default function (t: Date | string | number, format: string = 'YYYY-MM-DD hh:mm:ss', zeroPad: boolean = true): string {
    // 如果 t 爲 字符串, 則判斷 是否包含 '-', 該符號在 ios 的 new Data() 中爲 非法, 需將其 轉爲 '/'
    if (typeof t === 'string' && t.includes('-')) {
        t = compatible(t)
    }
    // 根據 t 獲取 Date 類型的 時間
    let time = new Date(t)
    // 根據傳遞的時間 提取 年月日時分秒 數據
    let year = time.getFullYear().toString()
    let mounth = (time.getMonth() + 1).toString()
    let date = time.getDate().toString()
    let hours = time.getHours().toString()
    let minutes = time.getMinutes().toString()
    let second = time.getSeconds().toString()

    // 數字補零, 默認補零
    if (zeroPad) {
        mounth = zeroPadding(mounth)
        date = zeroPadding(date)
        hours = zeroPadding(hours)
        minutes = zeroPadding(minutes)
        second = zeroPadding(second)
    }

    //  格式標籤數組
    let formatList = ['YYYY', 'MM', 'DD', 'hh', 'mm', 'ss']
    let timeList = [year, mounth, date, hours, minutes, second]

    // 遍歷 formatList, 將對應規則, 一一轉化
    formatList.forEach( (item, i) => {
        if ( format.includes(item) ) {
            format = format.replace(item, timeList[i])
        }
    })

    return format
}