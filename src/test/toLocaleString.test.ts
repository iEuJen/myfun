import toLocaleString from '../lib/toLocaleString'

export default () => {
    let time: string = toLocaleString(new Date(), 'MM/DD/YYYY')
    console.log(time)
}