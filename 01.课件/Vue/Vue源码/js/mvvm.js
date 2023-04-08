function MVVM(options) {
  /*
    this->vm实例对象(组件实例对象)
    options->{
        el: "#app",
        data: {
          msg: "hello mvvm",
          person:{
            name:"xiaoming",
            msg:"123"
          }
        }
      }
  */

  this.$options = options;

  var data = this._data = this.$options.data;
  // var data = (this._data = this.$options.data);
  // this._data = this.$options.data;
  // var data = this.$options.data;

  var me = this;

  /*
    MVVM源码第一部分:数据代理

    代理:我想要找代理商买酒,代理商会找厂家拿货,代理商再将厂家给的酒转交给我们
      从我们的视角上来看,代理商是有东西,实际上他并没有东西,真正存有东西的是厂家

    目的:为了方便开发者书写代码,读取数据
      如果没有他,开发者只能vm._data.msg来读取数据
      如果有了他,开发者就可以vm.msg来读取数据
      他并不是响应式原理中,不可或缺的一部分

    次数:2次(代理的次数与data对象的直系属性名个数有关)

    流程:
      1.使用Object.keys方法,获取到了data对象中,所有的直系属性名组成的数组
      2.然后对该数组进行遍历,获取到每个属性名,然后调用_proxy方法
      3.在_proxy方法中,我们会使用Object.defineProperty方法,给vm对象上添加全新的属性名,
        这些属性名都是与data对象中的属性名同名的,这些属性都具有get/set方法
        -如果开发者读取这些属性的值,就会触发get方法,Vue就会自动找data对象读取同名属性值返回
        -如果开发者修改这些属性的值,就会触发set方法,Vue就会自动找到data对象中同名属性进行修改

    注意点:
      1.vm身上msg属性和data对象中的msg属性,不是同一个,他们只是刚好同名了
        vm.msg属性目前是一个访问描述符,他没有自己的数据,开发者找他要数据,他会找data对象读取同名属性值
        data对象中的msg属性目前是一个数据描述符,他有自己的数据
  
  */

  Object.keys(data).forEach(function (key) {
    me._proxy(key);
  });

  // ["msg","person"].forEach(function (key) {
  //   vm._proxy("msg");
  // });
  /*
    需求:当用户修改某个属性值的时候,页面要自动展示对应的结果
    拆解:
      1.当用户修改某个属性值的时候
        可以将一个属性变为访问描述符,那么用户修改他的属性值的时候,就会自动触发set方法
        那么我们就可以监视到用户的修改操作

        使用的语法:Object.defineProperty

      2.页面要自动展示对应的结果
        肯定使用到了DOM的CRUD方法
        找到对应的DOM节点,然后将最新的数据更新为他的文本内容
  
  */

  /*
    MVVM源码第二部分:数据劫持

    劫持:控制一个人的人身自由,强迫他做一些自己不想做的事情

    目的:
      直接目的:将data对象中,所有的属性都变成了访问描述符,让他们拥有get/set方法
      最终目的:通过访问描述符的set方法,可以监视用户对于属性值的修改,从而实现响应式效果

    次数:4次(劫持的次数与data对象中所有的属性名个数有关)
  
    流程:
      1.调用observe函数,开始准备数据劫持
      2.在observe函数中,会判断是否有传入实参,而且实参是否是个对象
        如果不是,后续代码不执行
        如果是就构造调用Observer函数
      3.构造调用Observer函数,调用walk方法
      4.walk方法中,
        -使用Object.keys方法获取到了data对象所有属性名组成的数组
        -然后遍历得到的数据,将内部每个属性名都进行数据劫持
      5.调用defineReactive方法,
        -创建一个全新的dep对象
          总结:每个响应式属性,都会创建一个对应的dep对象
        -将属性值传入observe,开始深度数据劫持
        -使用Object.defineProperty方法,将data中所有的属性都改写为访问描述符
          -如果开发者读取data对象的某个属性,就会执行get方法,返回闭包中缓存的原本的属性值
          -如果开发者修改data对象的某个属性,就会执行set方法,
            -判断新旧值是否相同,如果相同就什么都不做
            -将最新结果存入闭包中
            -将最新的数据传入observe,进行深度数据劫持
            -调用dep.notify方法,通知DOM进行更新
  */

  observe(data, this);
  // observe(data, vm);

  /*
    MVVM源码第三部分:模版解析
    目的:用于获取页面上的模版内容,并将内部的插值语法以及指令解析成对应的效果
    流程:
      1.构造调用new Compile方法,并传入目标元素和当前组件实例对象,开始准备解析模版
      2.在Compile函数中,
        -将目标元素中,所有的子节点全部转移到文档碎片中
        -调用init函数,开始解析模版
        -将解析完的文档碎片,插入到页面上,进行显示
      3.在init方法中,
        -会获取到当前文档碎片中,所有的子节点,并进行遍历处理
          如果遍历得到的节点,是元素节点,就开始获取他身上所有的标签属性,准备解析指令
          如果遍历得到的节点,是文本节点,而且它使用了插值语法,那么就开启解析插值语法
      4.在遍历插值语法的过程中,会调用到bind方法,
        -找到用于更新文本的文本更新器
        -获取到插值语法对应的结果值,然后传给更新器,用于更新对应的文本节点内容
        -会创建一个全新的watcher对象
          总结:每个插值语法都会产生一个对应的watcher对象
          回顾:data中每具有一个响应式属性,就会产生一个dep对象
  */
  this.$compile = new Compile(options.el || document.body, this);
  // this.$compile = new Compile("#app", this);
}

MVVM.prototype = {
  $watch: function (key, cb, options) {
    new Watcher(this, key, cb);
  },

  _proxy: function (key) {
    //   vm._proxy("msg");
    // this->vm,key->"msg"

    var me = this;

    Object.defineProperty(me, key, {
      configurable: false, //不能重复定义
      enumerable: true, //可以遍历
      get: function proxyGetter() {
        return me._data[key];
      },
      set: function proxySetter(newVal) {
        me._data[key] = newVal;
      },
    });

    /*
      在ES6之前,属性都是以key和value形式存储数据的,这种属性称为数据描述符
      在ES6之后,推出了一种全新的属性,他没有value值,只有get/set方法,这种属性称为访问描述符
        如果开发者读取该属性的值,就会触发get方法,执行内部代码,并将函数的return结果作为属性值
        如果开发者修改该属性的值,就会触发set方法,执行内部代码

      value值和get/set方法是互斥的
      常见的对象声明写法,都是数据描述符,如果想要添加访问描述符,必须使用Object.defineProperty
    */

    // 由于vm对象本身没有msg属性,所以此处是在新增属性
    // Object.defineProperty(vm, "msg", {
    //   configurable: false, //不能重复定义
    //   enumerable: true, //可以遍历
    //   get: function proxyGetter() {
    //     return vm._data["msg"];
    //   },
    //   set: function proxySetter(newVal) {
    //     vm._data["msg"] = newVal;
    //   },
    // });

  },
};
