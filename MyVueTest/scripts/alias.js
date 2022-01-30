const path = require('path')

// __dirname是当前文件夹的位置，然后../表示向上走一级，然后再拼接p
const resolve = p => path.resolve(__dirname, '../', p)

module.exports = {
	 // 得到一个完整路径
	web: resolve('src/platforms/web'),
}
