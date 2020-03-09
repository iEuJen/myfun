## 安裝
`npm i myfun`
## 文件結構

- src 源碼目錄
  - common 一些項目內部使用的模塊
    - index.ts 這個文件, 由於 部分 內部模塊的 實用性較高, 因此, 在這裡統一定義對外暴露
  - lib 對外暴露的函數庫, 所有可用函數的源碼所在
  - test 測試文件
- dist 生產版本代碼目錄
  - myfun.min.js 經過壓縮的項目代碼


## 文檔

- toFormData (data: object = {}): FormData
  - JSON 轉 FormData 的 函數
  - 接受一個 object 對象, 返回一個 FormData 對象
  - 將 JSON 轉爲 FormData 格式的 數據
    - 用於 AJAX 請求發送數據 爲 \[object, object\] (封裝的函數沒有進行深拷貝複製, 微信小程序便是如此), 
    - 亦或者 後端程序員 不懂得(─.─||) 如何處理 JSON 字符串 的 情況
  - 參數
    - data, 必填, 一個 JSON 格式的 對象
  - 返回值
    - 一個 formData 對象
  - `toFormData.wx(data: object = {}): object`
    - 微信小程序沒有 FormData 對象, 
    - 調用 toFormData 的 靜態方法 wx, 便可用於 微信小程序
    - 參數
      - data, 必填, 一個 JSON 格式的 對象
    - 返回值
      - object, 一個經過深拷貝處理, 可以被微信小程序解析爲一般 formData 的 object 對象

- cookie
  - 對象實例
    - 提供一系列方法, 對 cookie 進行操作
  - units
    - readonly(只讀屬性), [ object, TimeUnit { day: 1440, hour: 60,minute: 1 } ]
    - 值爲一個 { day: 1440, hour: 60, minute: 1 } 對象, 用於設置 timeUnit 屬性
  - timeUnit
    - 屬性, [number, enum TimeUnit { day = 1440, hour = 60,minute = 1 }]
    - 值爲 number 類型, 爲 day = 1440, hour = 60,minute = 1, 三者其中之一, 
    - 建議通過 units 屬性 進行設置
    - 用於定義 set() 方法 的 deadline 參數
  - set (key: string, value: string, deadline: number = 1440, path: string = '/')
    - 設置 cookie 的方法
    - key, 必填, cookie 的 名
    - value, 必填, cookie 的 值
    - deadline, 可選, cookie 的 期限時間, 默認單位爲-天 , 默認值爲 1天, 
      - 單位可以 timeUnit 屬性進行修改設置
    - path, 可選, cookie 生效的頁面路径, 默認爲 '/'
  - get (key: string): string | null
    - 獲取 cookie 的方法
    - 獲取 對應 名字 的 cookie 值, 返回一個字符串, 獲取不到便返回 null
    - key, 必填, cookie 的 名
  - delete (key: string)
    - 刪除對應 鍵名 的 cookie
    - key, 必填, 要移除的 cookie 名
  - getAll (): object
    - 獲取 所有的 cookie, 返回一個 對象類型的 數據

- toLocaleString(t: Date | string | number, format: string = 'YYYY-MM-DD hh:mm:ss', zeroPad: boolean = true): string
  - 格式化時間的函數
  - 參數
    - t, 必填, 一個符合 new Date() 構造函數規範 的 參數, 可以是 Date 類型, 日期字符串, 或者 時間戳
    - format, 可選, 時間的格式, 可包含 YYYY(年) | MM(月) | DD(日) | hh(時)  | mm(分) | ss(秒), 
    - zeroPad, 可選, 補零(日期時間值不滿10), 用於決定是否補零
  - 返回值
    - 一個格式化了的日期字符串

- compressImg (args: Args, callback?: Function): Promise< object > | null
  - 圖片壓縮函數
  - 參數
    - args, 
      - fileName: string, 必填, 壓縮後的文件名
      - src?: string, 和 file 二選一, 圖片路徑
      - file?: File, 和 src 二選一, 圖片文件
      - quality?: 可選, number 壓縮的圖片質量, 取值範圍  0 到 1, 默認 0.1, 以實現最大程度壓縮圖片
    - callback
      - 可選, 回調函數, 接受處理完的結果
      - 如果不傳, 則默認返回 promise 對象, 後續 通過 then 函數 或者 async/await 取得處理完的結果
    - 返回值
      - callback 參數存在, 即 返回 null
      - 否則, 返回 promise 對象

- fileHandler
  - 對象實例
    - 提供處理文件的一些方法
    - 注: `該模塊, 最好在支持 Promise 對象 的 環境中 使用`
  - fileToBase64 (file: File): Promise< string >
    - 文件 轉 base64 的方法
    - 參數
      - file, 必填 文件對象
    - 返回值
      - 一個 promise 對象, 響應處理結果(一個 base64 字符串)
  - base64ToFile (dataurl: string, fileName: string)
    - base64 轉 文件 的方法
    - 參數
      - dataurl, 必填, 要轉譯的 base64 字符串
      - fileName, 必填, 轉譯完的文件名

## 源碼倉庫
- [MYFun](https://gitee.com/eujen/myfun)
