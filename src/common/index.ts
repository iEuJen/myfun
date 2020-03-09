/**
 * 這裡將暴露 common 中 一部分 實用的 模塊 給予 外部
 */
import { FileHandler } from './fileHandler'

// 實例化 文件操作對象, 這裡只暴露單個實例給外部使用
let fileHandler = new FileHandler()

export { 
    fileHandler
}