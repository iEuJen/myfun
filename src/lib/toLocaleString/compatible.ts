/**
 * 時間兼容
 * @param str, 符合時間格式的字符串
 */
export default function (str: string): string {
    return str.replace(/-/g, '/')
}