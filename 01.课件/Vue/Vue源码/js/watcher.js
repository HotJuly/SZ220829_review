function Watcher(vm, exp, cb) {
  // new Watcher(vm, "msg", function(value, oldValue) {
  //     textUpdater && textUpdater(text节点, value, oldValue);
  // });

  // this->watcher对象,

  this.cb = cb;
  this.vm = vm;
  this.exp = exp;

  this.depIds = {};

  this.value = this.get();
}

Watcher.prototype = {
  update: function () {
    this.run();
  },
  run: function () {
    // 获取到当前插值语法的最新结果
    var value = this.get();

    // 获取到上一次显示在页面上的旧值
    var oldVal = this.value;

    if (value !== oldVal) {
      this.value = value;
      this.cb.call(this.vm, value, oldVal);
    }
  },
  addDep: function (dep) {
    // watcher.addDep(dep);
    // this->watcher对象,dep->dep对象

    // a.hasOwnProperty(属性名)->检查a对象上,
    // 是否具有传入的属性名,如果有就返回true,没有就返回false
    if (!this.depIds.hasOwnProperty(dep.id)) {
      this.depIds[dep.id] = dep;

      dep.addSub(this);
    }
    // if (!{}.hasOwnProperty(0)) {
      // 此处watcher对象正在缓存与他相关的dep对象
    //   watcher.depIds[0] = dep;

    //   dep.addSub(watcher);
    // }
  },
  get: function () {
    // this.value = this.get();
    // this->watcher对象

    Dep.target = this;
    // Dep.target = watcher对象;

    var value = this.getVMVal();

    // 清空Dep.target
    Dep.target = null;
    return value;
  },

  getVMVal: function () {
    // 假设原本的exp->"person.name"
    // exp->["person","name"]
    var exp = this.exp.split(".");

    var val = this.vm._data;

    exp.forEach(function (k) {
      val = val[k];
    });

    // ["person","name"].forEach(function (k) {
    //   val = val[k];
    //   val = data["person"];
    //   val = person["name"];
    // });
    return val;
  },
};
