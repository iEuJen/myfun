import I18N from '../lib/i18n/index'
// 语言字段
let langStrings = {
    cn: {
        "哇哈哈": '哇哈哈',
        "请输入链接": '请输入链接',
    },
    en: {
        "哇哈哈": 'wahaha',
        "请输入链接": 'place input url',
    },
}
export default () => {
    let i18n = new I18N(langStrings)
    i18n.lang = 'en'
    console.log(i18n)
    console.log(i18n.getText(i18n.strings.请输入链接))
}