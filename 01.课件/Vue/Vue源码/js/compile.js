function Compile(el, vm) {
  // this.$compile = new Compile("#app", this);
//   this->com对象,el->"#app",vm->vm组件实例对象

    this.$vm = vm;

    this.$el = this.isElementNode(el) ? el : document.querySelector(el);

    if (this.$el) {

        // 经过这部操作,文档碎片中,会存放app元素中本来拥有的所有子节点
        this.$fragment = this.node2Fragment(this.$el);

        this.init();

        // 将文档碎片中的内容,插入到页面上
        // 这部就是挂载
        this.$el.appendChild(this.$fragment);

    }
}

Compile.prototype = {
    node2Fragment: function(el) {
        // el->app元素节点
        var fragment = document.createDocumentFragment(),
            child;

        // 一个节点如果插入到文档碎片中,那么该节点就会从页面上消失
        // 此处会循环获取app元素中第一个子节点,如果有子节点就放入文档碎片中,然后继续循环
        // 直到app元素中,没有任何子节点为止
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }

        return fragment;
    },

    init: function() {
        this.compileElement(this.$fragment);
    },

    compileElement: function(el) {
        // 第一次进入:el->文档碎片对象
        // 第一次进入的时候,childNodes->{0:text节点,1:p元素节点,2:text节点}

        // 第二次进入:el->p元素节点
        // 第二次进入的时候,childNodes->{0:text节点}
        var childNodes = el.childNodes,
            me = this;

        [].slice.call(childNodes).forEach(function(node) {
            var text = node.textContent;
            var reg = /\{\{(.*)\}\}/;

            if (me.isElementNode(node)) {
                me.compile(node);

            } else if (me.isTextNode(node) && reg.test(text)) {
                me.compileText(node, RegExp.$1);
            }

            if (node.childNodes && node.childNodes.length) {
                me.compileElement(node);
            }
        });

        // 第一次:[text文本节点,p元素节点,text文本节点].forEach(function(node) {
        // 第二次:[text文本节点].forEach(function(node) {
        //          text = "{{msg}}"
        //     var text = node.textContent;

        //      这个正则语法是用来捕获插值语法的
        //     var reg = /\{\{(.*)\}\}/;

        //     if (com.isElementNode(node)) {
        //         此处会获取到当前元素节点的所有的标签属性,然后判断有没有使用到vue的指令
        //         me.compile(node);

        //     } else if (me.isTextNode(node) && reg.test(text)) {
        //          此处发现当前文本节点,使用了插值语法.那么就要开始解析插值语法
        //         me.compileText(text节点, RegExp.$1);
        //     }

        //     if (node.childNodes && node.childNodes.length) {
        //         me.compileElement(node);
        //     }
        // });

    },

    compile: function(node) {
        var nodeAttrs = node.attributes,
            me = this;

        [].slice.call(nodeAttrs).forEach(function(attr) {
            var attrName = attr.name;
            if (me.isDirective(attrName)) {
                var exp = attr.value;
                var dir = attrName.substring(2);

                if (me.isEventDirective(dir)) {
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                } else {
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }

                node.removeAttribute(attrName);
            }
        });

    },

    compileText: function(node, exp) {
        //me.compileText(text节点, RegExp.$1);
        compileUtil.text(node, this.$vm, exp);

        // compileUtil.text(text节点, vm, "msg");
        
    },

    isDirective: function(attr) {
        return attr.indexOf('v-') == 0;
    },

    isEventDirective: function(dir) {
        return dir.indexOf('on') === 0;
    },

    isElementNode: function(node) {
        return node.nodeType == 1;
    },

    isTextNode: function(node) {
        return node.nodeType == 3;
    }
};

// 指令处理集合
var compileUtil = {
    text: function(node, vm, exp) {
        // compileUtil.text(text节点, vm, "msg");
        // this->compileUtil对象,
        this.bind(node, vm, exp, 'text');
        // this.bind(text节点, vm, "msg", 'text');
    },

    html: function(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },

    model: function(node, vm, exp) {
        this.bind(node, vm, exp, 'model');

        var me = this,
            val = this._getVMVal(vm, exp);
        node.addEventListener('input', function(e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }

            me._setVMVal(vm, exp, newValue);
            val = newValue;
        });
    },

    class: function(node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },

    bind: function(node, vm, exp, dir) {
        // this.bind(text节点, vm, exp, 'text');

        // 找到了更新文本的函数(文本更新器)
        var updaterFn = updater[dir + 'Updater'];
        // var updaterFn = updater['textUpdater'];


        updaterFn && updaterFn(node, this._getVMVal(vm, exp));
        // textUpdater && textUpdater(text节点, this._getVMVal(vm, "msg"));
        // textUpdater && textUpdater(text节点, "hello mvvm");

        // 每次执行bind方法,就会创建一个watcher对象
        // 总结:页面上,每具有一个插值语法,就会生成一个对应的watcher对象
        new Watcher(vm, exp, function(value, oldValue) {
            updaterFn && updaterFn(node, value, oldValue);
        });

    },

    // 事件处理
    eventHandler: function(node, vm, exp, dir) {
        var eventType = dir.split(':')[1],
            fn = vm.$options.methods && vm.$options.methods[exp];

        if (eventType && fn) {
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },

    _getVMVal: function(vm, exp) {
        // this._getVMVal(vm, "msg")
        // 
        var val = vm._data;

        // exp->["msg"]

        // 原本的exp->"person.name"
        // exp->["person","name"]
        exp = exp.split('.');

        exp.forEach(function(k) {
            val = val[k];
        });

        // ["person","name"].forEach(function(k) {
            // 此处会触发多次数据劫持的set/get,但是不会触发数据代理的set/get
        //     val = data["person"];
        //      val = person["name"]
        // });

        return val;
    },

    _setVMVal: function(vm, exp, value) {
        var val = vm._data;
        exp = exp.split('.');
        exp.forEach(function(k, i) {
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
};


var updater = {
    textUpdater: function(node, value) {
        // textUpdater(text节点, "hello mvvm")
        node.textContent = typeof value == 'undefined' ? '' : value;
    },

    htmlUpdater: function(node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },

    classUpdater: function(node, value, oldValue) {
        var className = node.className;
        className = className.replace(oldValue, '').replace(/\s$/, '');

        var space = className && String(value) ? ' ' : '';

        node.className = className + space + value;
    },

    modelUpdater: function(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};