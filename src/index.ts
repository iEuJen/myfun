import toFormData from './lib/toFormData'
import cookie from './lib/cookie'
import toLocaleString from './lib/toLocaleString'
import compressImg from './lib/compressImg'

import { fileHandler } from './common/index'

// 測試文件
import test from './test/index.test'
test()

export {
    toFormData,
    cookie,
    toLocaleString,
    compressImg,
    fileHandler
}