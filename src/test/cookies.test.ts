import cookie from '../lib/cookie/index'

const test = (action: string) => {
    switch (action) {
        case 'set':
            cookie.timeUnit = cookie.units.minute // 設置時間單位
            cookie.set('demo_cookies', 'wahaha_is_cookie_test', 10)
            break;

        case 'get':
            console.log(cookie.get('demo_cookies'))
            break;

        case 'delete':
            if (cookie.get('demo_cookies')) {
                cookie.delete('demo_cookies')
                window.location.reload()
            }
            break;

        case 'getAll':
            console.log(cookie.getAll())
            break;
        
        default:
            break;
    }
}

export default () => {
    test('set')
}