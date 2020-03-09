import splitOnce from '../../common/splitOnce'

enum TimeUnit {
    day = 1440,
    hour = 60,
    minute = 1,
}
/**
 * 操作 cookie 的對象
 */
class Cookie {
    // 對外暴露的的單位對象, 用於設置 timeUnit
    public readonly units = TimeUnit
    // 設置 set 方法, 傳入的 deadline 參數, 的單位, 默認爲 天
    public timeUnit: TimeUnit = this.units.day
    /**
     * 設置 cookie 的 方法
     * @param key cookie 的 名
     * @param value cookie 的 值
     * @param deadline cookie 的 期限時間, 默認單位爲-天 , 默認值爲 一天
     * @param path cookie 生效的頁面路径, 默認爲 '/'
     */
    public set (key: string, value: string, deadline: number = 1, path: string = '/') {
        // 計算 cookie 期限時間
        deadline = this.timeUnit * deadline * 60 * 1000
        // 當 key-value 都存在時
        if (key && value) {
            // 设置名称为name,值为value的Cookie
            const expdate: Date = new Date() // 初始化时间
            expdate.setTime(expdate.getTime() + deadline) // 时间单位毫秒
            document.cookie = `${key}=${value};expires=${expdate.toUTCString()};path=${path}`
        } else {
            console.warn('Cookies.set 需要傳入 key 以及 value 作爲 參數')
        }
    }
    
    /**
     * 獲取 對應 key 的 cookie
     * @param key 想要獲取的 cookie 名
     */
    public get (key: string): string | null {
        let arr: RegExpMatchArray
        let reg = new RegExp(`(^| )${key}=([^;]*)(;|$)`) // 匹配字段
        arr = document.cookie.match(reg)
        if (arr) {
            return unescape(arr[2])
        } else {
            return null
        }
    }

    /**
     * 刪除 對應 key 的 cookie
     * @param key 
     */
    public delete (key: string) {
        if (key) {
            // 设置名称为name,值为value的Cookie
            const expdate: Date = new Date('1970') // 設置時間爲 1970
            document.cookie = `${key}=;expires=${expdate.toUTCString()};path=/`
        } else {
            console.warn('Cookies.delete 需要傳入 key 作爲 參數')
        }
    }

    /**
     * 獲取所有的 cookie
     */
    public getAll (): object {
        let cookieObj: object = {}
        let cookieList: Array<any> = document.cookie.split(';')
        cookieList = cookieList.map( str => str.replace(/\s*/g,""))
        cookieList.forEach( item => {
            let [key, value] = splitOnce(item, '=')
            if (!key) return false
            cookieObj[key] = value
        })
        return cookieObj
    }
}

export default new Cookie()