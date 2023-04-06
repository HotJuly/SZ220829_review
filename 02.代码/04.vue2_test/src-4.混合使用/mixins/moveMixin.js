export default {
  data(){
    return{
      pageX:0,
      pageY:0
    }
  },
  mounted(){
    /*
      需求:当用户的鼠标在页面上移动的时候,将鼠标坐标显示在页面上
      拆解:
        1.当用户的鼠标在页面上移动的时候
          通过绑定事件来监视用户鼠标的移动
          事件源:document
          事件名:mousemove

        2.如何获取到鼠标坐标?
          可以通过event获取到

        3.如何将数据显示在页面上?
          使用data将数据显示在template中
    
    */

    document.addEventListener('mousemove',this.moveHandler)
  },
  beforeDestroy(){
    document.removeEventListener('mousemove',this.moveHandler)
  },
  watch:{
    pageX(){
        console.log('pageX change')
    }
  },
  methods:{
    moveHandler({clientX,clientY}){
      // console.log(1,event)
      this.pageX = clientX;
      this.pageY = clientY;
    }
  }
}