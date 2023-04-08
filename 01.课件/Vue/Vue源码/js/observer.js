function Observer(data) {
    // this->ob对象,data->data对象
    this.data = data;

    this.walk(data);//走起
}

Observer.prototype = {
    walk: function(data) {
        // this.walk(data);
        // this->ob对象
        var me = this; 

        Object.keys(data).forEach(function(key) {
            me.convert(key, data[key]);
        });

        // ["msg,"person"].forEach(function(key) {
        //     ob.convert("msg", data["msg"]);
        //     ob.convert("msg", "hello mvvm");
        // });
    },
    convert: function(key, val) { 
        // ob.convert("msg", "hello mvvm");
        this.defineReactive(this.data, key, val); 
    },

    defineReactive: function(data, key, val) { 
        // this.defineReactive(data, "msg", "hello mvvm"); 

        // 每次执行defineReactive都会创建一个全新的dep对象
        // 目前观察到的结果是,data对象中,每具有一个直系属性名,就会产生一个dep对象
        // 总结:只要是data中出现过的属性,都会产生一个对应的dep对象
        var dep = new Dep();  

        // 在将data对象中,出现过的所有属性名,全部进行数据劫持
        // 将当前属性的属性值,传入observe,如果是个对象,就进行深度数据劫持
        var childObj = observe(val);

        
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define

            get: function() {
              
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            },
            set: function(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;

                childObj = observe(newVal);
                
                dep.notify();
            }
        });


        //在没执行这行代码之前,data对象其实是有msg属性的
        // 所以此处不是在新增msg属性,而是在重写msg属性,将原本是数据描述符的msg,改成访问描述符
        // 由于msg属性变成了访问描述符,所以他原本value值会丢失
        // 此处巧妙的写法,它使用了闭包的形式,将原本应该丢失的value值用闭包缓存起来了
        // 从而实现了,msg数据既有set/get方法,还具有value值

        // Object.defineProperty(data, "msg", {
        //     enumerable: true, // 可枚举
        //     configurable: false, // 不能再define

        //     get: function() {
              
        //         if (Dep.target) {
        //             dep.depend();
        //         }
        //         return val;
        //     },
        //     set: function(newVal) {
        //         如果新值等于旧值,那么页面不会更新,该函数后续代码不会执行
        //          所以以后书写代码,就可以放心修改数据,只有数据发生了变化,才有可能导致页面重新渲染
        //         if (newVal === val) {
        //             return;
        //         }

        //          将新值存入闭包中,将旧值丢弃
        //         val = newVal;

        //          此处就是数据劫持的第二个时机,用户更新一个响应式属性,就会对属性值进行深度数据劫持
        //         childObj = observe(newVal);
                
        //          此处就是在通知DOM更新
        //         dep.notify();
        //     }
        // });

    }
    
};


function observe(value, vm) {
    // observe(data, vm);
    // 此处在判断value是否有值,如果没值就不执行任何代码
    // 还判断如果有值,value是不是一个对象,如果不是对象,那么也不执行任何代码
    if (!value || typeof value !== 'object') {
        return;
    }

    return new Observer(value);
};


var uid = 0;

function Dep() {
    this.id = uid++;
    this.subs = [];
}

Dep.prototype = {
    addSub: function(sub) {
        //  dep.addSub(watcher);

        // 此处dep对象使用subs数组,收集到了与自身相关的watcher对象
        // 响应式属性,使用subs数组,收集到了与自身相关的插值语法
        this.subs.push(sub);
        // this.subs.push(watcher)
    },

    depend: function() {
        // this->dep对象
        Dep.target.addDep(this);
        // watcher.addDep(dep);
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function() {
        // subs数据类型数组,内部存的是使用到当前响应式属性的watcher对象
        this.subs.forEach(function(sub) {
            sub.update();
        });
        // this.subs.forEach(function(sub) {
        //     watcher.update();
        // });
    }
};

Dep.target = null;