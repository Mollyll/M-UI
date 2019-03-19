const path = require('path') // 根路径
const createVueloaderOptions = require('./vue-loader.config');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const MarkdownItContainer = require('markdown-it-container')
const striptags = require('./script-tag')

const isDev = process.env.NODE_ENV === 'development';

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

const vueMarkdown = {
    preprocess: (MarkdownIt, source) => {
        MarkdownIt.renderer.rules.table_open = function () {
            return '<table class="table">'
        }
        MarkdownIt.renderer.rules.fence = utils.wrapCustomClass(MarkdownIt.renderer.rules.fence)

        // ```code`` 给这种样式加个class code_inline
        const code_inline = MarkdownIt.renderer.rules.code_inline
        MarkdownIt.renderer.rules.code_inline = function (...args) {
            args[0][args[1]].attrJoin('class', 'code_inline')
            return code_inline(...args)
        }
        return source
    },
    use: [
        [MarkdownItContainer, 'demo', {
            validate: params => params.trim().match(/^demo\s*(.*)$/),
            render: function (tokens, idx) {

                var m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)

                if (tokens[idx].nesting === 1) {
                    var desc = tokens[idx + 4].content
                    const html = utils.convertHtml(striptags(tokens[idx + 4].content, 'script'))
                    // 移除描述，防止被添加到代码块
                    tokens[idx + 4].children = []

                    return `<demo-block>
                        <div slot="desc">${html}</div>
                        <div slot="highlight">`
                }
                return '</div></demo-block>\n'
            }
        }]
    ]
}

const config = {
    mode: process.env.NODE_ENV || "production", // webpack4 只接收两个参数
    target: 'web', // target是浏览器端
    entry: path.join(__dirname, '../examples/index.js'), // 入口文件
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, '../dist') // 打包后的输出路径
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: createVueloaderOptions(isDev)
        }, {
            test: /\.jsx$/,
            loader: 'babel-loader'
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            include: [resolve('examples'), resolve('packages'), resolve('node_modules/webpack-dev-server/client')]
        }, {
            test: /\.(gif|jpg|jpeg|png|svg)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name: '[name]-aaa.[ext]'
                }
            }]
        }, {
            test:/\.(woff|woff2|ttf|eot)$/,
            use: [{
                loader:'url-loader',
                options: {
                    limit: 100000
                }
            }]
        }, {
            test: /\.md$/,
            use: [
                {
                    loader: 'vue-loader',
                    options: {
                        compilerOptions: {
                            preserveWhitespace: false
                        }
                    }
                },
                {
                    loader: path.resolve(__dirname, './md-loader/index.js')
                }
            ]
        }/*, {
            test: /\.md$/,
            loader: 'vue-markdown-loader',
            options: vueMarkdown
        }*/]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}

module.exports = config