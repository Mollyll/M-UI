/**
 * @author molly
 * Date: 19/03/12
 */
import MButton from './button/index.js';
import MRow from './row/index.js';
import MCol from './col/index.js';
import MetaInfo from './meta-info/index.js'

const components = [
    MButton,
    MRow,
    MCol
]

const install = function(Vue) {
    if (install.installed) return
    components.map(component => Vue.component(component.name, component))
    MetaInfo.install(Vue)
    // Vue.prototype.$loading = WLoadingBar
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install,
    MButton,
    MRow,
    MCol
}