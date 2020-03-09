/**
 * 不滿10數字補零函數
 * @param str 
 */
export default function (str: string): string {
    return str.length < 2 ? `0${str}` : str
}