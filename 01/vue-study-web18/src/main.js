import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import {create} from '@/utils/create'
import Notice from '@/components/Notice'

Vue.config.productionTip = false

class Bus {
  constructor(){
    /** todo
    这里是准备一个对象供监听方法on() 去保存需要回调的队列
    也就是callbacks的某个属性变为数组然后保存回调方法到这个属性离去  
    供emit去循环
    */
    this.callbacks = {}
  }
  $on(name, fn){
    //todo （订阅）监听需要emit的属性进行存放，
    this.callbacks[name] = this.callbacks[name] || []
    //? this.callbacks[name] = []  
    //todo 如果缺少this.callbacks[name]会缺少重名的调用
    this.callbacks[name].push(fn)
  }
  $emit(name, args){
    if(this.callbacks[name]){
      
      this.callbacks[name].forEach(cb => {
      //todo 此处的args为fn方法参数，触发事带参数一起使用
      return  cb(args)
      })
    }
} }
// main.js
Vue.prototype.$bus = new Bus()

// Vue.prototype.$bus.$emit('foo1')
// child1

Vue.prototype.$bus.$on('foo', function(value) {
  console.log(value); //sy-log
})
Vue.prototype.$bus.$emit('foo','你好')
// child2
// Vue.prototype.$bus.$on('foo', (a)=>console.log(a))
// child2

// Vue.prototype.$bus.$on('foo1', ()=>console.log(111))
// 事件总线
// Vue.prototype.$bus = new Vue()
Vue.prototype.$notice = (opts) => {
  const comp = create(Notice, opts)
  comp.show()
  return comp
}

//todo 兄弟组件之间的通讯，必须有借助同一个父类
// this.$parent.$emit('event-from-child2', 'some msg from child2')
// this.$parent.$on('event-from-child2', msg => {
//   console.log('Child1:', msg);
// });

/**
父组件可以通过$children访问子组件实现父子通信
他返回的是一个组件集合，如果你能清楚的知道子组件的顺序，你也可以使用下标来操作；
但是如果有异步组件则不能保证获取的顺序一致
 *  */ 
// this.$children[0].xx = "xxxx"
new Vue({
  render: h => h(App),
}).$mount('#app')
