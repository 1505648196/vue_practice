
function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    var name = child.$options.componentName;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat(params));
    }
  });
}
export default {
  methods: {
    dispatch(componentName, eventName, params) {
      var parent = this.$parent;
      var name = parent.$options.componentName; //拿到老爹的组件名称
    
     //sy-log
     console.log(parent && (!name || name !== componentName)); //sy-log
      while (parent && (!name || name !== componentName)) {
    
        //找爹 不停的找爹，直到找完爹为止
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }

      }
      if (parent) {
          
        //* 第一种写法
        // parent.$emit(eventName,eventName);

        //* 第二种写法
        //? 这里为什么用apply 而不是用第一种？
        //! apply后再把后面的数组参数返回，就可以传入数组参数

        parent.$emit.apply(parent, [eventName].concat(params));
        console.log([eventName].concat(params)); //sy-log
        //todo 看看这个 ES6代替上面concat也可以这样写 [eventName,...params]
      
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
};
