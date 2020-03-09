import compressImg from '../lib/compressImg'


export default () => {
    // compressImg()
    let input = document.createElement('input')
    input.type = 'file'
    document.body.appendChild(input)
    input.addEventListener('change', async () => {
        let [ file ] = input.files
        console.log('未壓縮前的文件: ')
        console.log(file)
        // 壓縮
        console.log('壓縮後...')

        // 使用 promise
        let res = await compressImg({
            fileName: 'demo',
            file: file,
        })
        console.log(res)

        // 使用回調
        // compressImg({
        //     fileName: 'demo',
        //     file: file
        // }, (res) => {
        //     console.log(res)
        // })
    })
}