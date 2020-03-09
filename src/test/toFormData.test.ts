import toFormData from '../lib/toFormData/index'


let testObj = {
    a: 233,
    list: [1, 2, 3],
    objList: [
        {
            a: 1
        },
        {
            a: 2
        },
    ],
    object: {
        list: [1, 2, 3],
        a: 1,
        b: {
            c: 3
        }
    }
}

export default function () {
    let fromData = toFormData(testObj)
    let obj = toFormData.wx(testObj)
    console.log(...fromData.entries())
    console.log(obj)
}