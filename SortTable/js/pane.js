Vue.component('pane',{
  template:`
  <div class="pane" v-show="show">        
      <slot></slot>
  </div>
  `,
  data:function(){
      return {
          show:true
      }
  },
  //props为来自父组件的变量，实现父组件与子组件通信
  props:{
      //设置pane的标识
      name:{
          type:String
      },
      //label是设置标题
      label:{
          type:String,
          default:''
      }
  },
  methods:{
      updateNav:function(){
          //$parent 父链，通知父组件（tabs）进行更新。
          //说明：在业务中尽可能不要使用$parent来操作父组件，$parent适合标签页这样的独立组件
          this.$parent.updateNav();
      }
  },
  //监听label
  watch:{
      label(){
          this.updateNav();
      }
  },
  
  mounted(){
      //初始化tabs
      this.updateNav();
  }
})