import typeofObject from '../../common/typeofObject'

// 設置 I18N 類 的 只讀屬性 和 private 屬性
const readonlyProps: Array<string> = ['langStrings', 'langs', 'strings']
const privateProps: Array<string> = ['setProxy', 'checkLangStrings', 'extractStrings']

class I18N {
    // 當前的語言
    public lang: string
    // 外部傳入的語言版本字符串對象
    public readonly langStrings: object
    // 所有語言數組, 通過計算 langStrings 獲取
    public readonly langs: Array<string> = []
    // 語言翻譯的字段名
    public readonly strings: any = {}
    
    /**
     * 構造函數
     * @param langStrings 必填, 定義的多語言版本字符串對象
     * @param lang 可選, 默認的語言, 不填則默認將 langStrings 首個屬性
     */
    constructor (langStrings: object, lang?: string) {
        this.checkLangStrings(langStrings)
        this.langStrings = langStrings
        this.langs.push(...Object.keys(langStrings))
        this.lang = lang || this.langs[0]
        this.extractStrings()
        return this.setProxy()
    }

    /**
     * 通過此函數, 獲取 對應值在當前語言中定義的文本
     * @param key 對應字段的字段名
     */
    public getText (key: string): string {
        // 判斷傳入的值是否有效
        if (!this.strings[key]) {
            throw new Error(`${key} is invalid value`)
        }
        return this.langStrings[this.lang][key]
    }

    // 檢查傳入的 langStrings 是否 符合規範 - 不同語言定義的字段數量必須一致
    private checkLangStrings (langStrings: object) {
        let number = 0 // 各語言定義的字段數量
        // 語言字段名合併字符串數組, 用於判斷字段名定義是否完全一致
        let langkeyStrings: Array<string> = []
        // 判斷 不同語言定義的 字段數量 是否一致
        Object.values(langStrings).forEach( value => {
            if ( typeofObject(value) === '!object' ) {
                throw new Error('語言對象不是一個 object 對象')
            }
            let langkeys = Object.keys(value)
            let keyString = ''
            if (number === 0) {
                number = langkeys.length
            } else if (number !== langkeys.length) {
                throw new Error('不同語言定義的字段數量不一致, 請檢查語言對象的字段數量')
            }
            // 拼接並保存每一種語言的字段名
            langkeys.forEach( key => {
                keyString += key
            })
            langkeyStrings.push(keyString)
        })
        // 判斷 不同語言定義的字段名, 是否完全一致
        let langKey: string = ''
        langkeyStrings.forEach( item => {
            if (langKey === '') {
                langKey = item
            } else if (langKey !== item) {
                throw new Error('不同語言定義的字段名不一致, 請檢查語言對象的字段名')
            }
        })
    }

    // 提取字段名
    private extractStrings () {
        let keys = Object.keys( this.langStrings[this.lang] )
        keys.forEach( key => {
            this.strings[key] = key
        })
    }

    // 代理 this, 並返回 Proxy 對象, 自定義 I18N類 的讀寫規則
    private setProxy () {
        // 只讀屬性名數組, 用於限制修改
        return new Proxy(this, {
            get: function (target, key: string) {
                if (privateProps.includes(key)) {
                    throw new Error(`property ${key} is private and can not accessible`)
                }
                // 返回值
                return target[key]
                // return Reflect.get(target, key)
            },
            set: function (target, key: string, value) {
                // 只讀屬性判斷
                if ( readonlyProps.includes(key) ) {
                    throw new Error(`${key} is readonly`)
                }
                // 不允許被覆蓋的函數
                if (target[key] instanceof Function) {
                    throw new Error(`不能重寫 ${key} 方法`)
                }
                if (key in target) {
                    // 重赋值
                    return target[key] = value
                    // return Reflect.set(target, key, value, receiver)
                } else {
                    throw new ReferenceError("不能给obj对象赋值新属性")
                }
            }
        })
    }
}

export default I18N