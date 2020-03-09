/**
 * 將字符串 以 某一个字符串 爲標記, 切割 爲两部分
 * @param target 要切割的字符串
 * @param separator 切割標記
 * 
 * 應用場景
 *  - string.split 函數, 會將一個字符串根據某個 separator 切割成多個部分, 而我們只需要以第一個爲標誌, 切割爲兩個部分
 *  - 例: 部分 cookie 的值中存在 '='
 */
function splitOnce (target: string, separator: string): Array<string> {
    // 獲取 切割標記 在 target 字符串中, 首次出現的 索引
    let separatorIndex = target.indexOf(separator)
    if (separatorIndex === -1) return []
    let first = target.substring(0, separatorIndex)
    let last = target.substring(separatorIndex + 1)
    return [ first, last ]
}

export default splitOnce