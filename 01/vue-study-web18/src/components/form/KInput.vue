<template>
  <div>
    <!-- 管理数据：实现双绑 -->
    <!-- :value, @input -->
    <input :type="type" :value="value" @input="onInput"
      v-bind="$attrs">
  </div>
</template>

<script>
import emitter from '@/mixins/emitter';
  export default {
    inheritAttrs: false , // 关闭特性继承
    mixins:[emitter],
    props: {
      value: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'text'

      }
    },
    methods: {
      
      onInput(e) {
       
        this.$emit('input', e.target.value)
        //! this指向本组件实例，$el指向当前组件的DOM元素。
        // 值发生变化的时候就是需要校验的时候
        // 使用$parent处理访问父类实例边界问题
        // 此处这样写会存在一个问题，
        //如果KInput的直接父类不是KFormItem，则派发验证失效
         let a = [1,5,6,7]
        this.dispatch("KFormItem",'validate',a)
      }
    },
  }
</script>

<style scoped>

</style>