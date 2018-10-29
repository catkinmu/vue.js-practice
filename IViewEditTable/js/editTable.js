
// 根据数据中下拉的值找到对应的对象
function findObjectInOption(name) {
  return function(item){
    return  item.value === name;
  }
}

var editButton = function(vm, h, currentRow, index) {
  return h('Button', {
    props: {
      size: 'small',
      type: currentRow.editting ? 'success' : 'primary',
      loading: currentRow.saving
    },
    style: {
      margin: '0 5px'
    },
    on: {
      click: function() {
        var tempData = vm.handleBackdata(currentRow)
        if (!currentRow.editting) {
          currentRow.editting = true;
        } else {
          if (JSON.stringify(tempData) == JSON.stringify(vm.dataList[index])) {
            console.log('未更改');
            return currentRow.editting = false;
          }
          vm.saveData(currentRow, index)
          currentRow.saving = true;
          currentRow.editting = false;
        }
      }
    }
  }, currentRow.editting ? '保存' : '编辑');
};
//动态添加 删除 按钮
var deleteButton = function(vm, h, currentRow, index) {
  return h('Poptip', {
      props: {
        confirm: true,
        title: currentRow.WRAPDATASTATUS != '删除' ? '您确定要删除这条数据吗?' : '您确定要对条数据撤销删除吗?',
        transfer: true,
        placement: 'left'
      },
      on: {
        'on-ok': function() {
          vm.deleteData(currentRow, index)
        }
      }
    },
    [
      h('Button', {
        style: {
          color: '#ed3f14',
          fontSize: '18px',
          padding: '2px 7px 0',
          border: 'none',
          outline: 'none',
          focus: {
            '-webkit-box-shadow': 'none',
            'box-shadow': 'none'
          }
        },
        domProps: {
          title: '删除'
        },
        props: {
          size: 'small',
          type: 'ghost',
          icon: 'android-delete',
          placement: 'left'
        }
      })
    ]);
};
var vm = new Vue({
  el: '#editTableCtrl',
  data: function() {
    return {
      loading: true,
      //表格的数据源
      dataList: [],
      /**
       * @name columnsList (浏览器 渲染的列)  
       * @author ch
       * @see https://www.iviewui.com/components/table
       * @param 
       * { 
       *  titleHtml : 渲染带有html的表头 列: '资金<em class="blue" style="color:red">来源</em>'
       *  editable  : true,可编辑的列 必须有字段 
       *  option    : 渲染的下拉框列表
       *  date      : 渲染成data类型 ,可选参数: 
       *              date | daterange: yyyy-MM-dd (默认)
       *              datetime | datetimerange: yyyy-MM-dd HH:mm:ss
       *              year: yyyy
       *              month: yyyy-MM
       *  input     : 渲染input类型 ,可选参数为html5所有类型 (额外增加 textarea 属性), 默认text
       *  handle    : 数组类型, 渲染操作方式,目前只支持 'edit', 'delete'
       * }
       * @version 0.0.1
       */
      columnsList: [{
        width: 80,
        type: 'index',
        title: '序号',
        align: 'center'
      }, {
        align: 'center',
        title: '项目编号',
        key: 'PRJCODE'
      }, {
        align: 'center',
        title: '项目名称',
        titleHtml: '项目名称 <i class="ivu-icon ivu-icon-edit"></i>',
        key: 'PRJNAME',
        editable: true
      }, {
        align: 'center',
        title: '项目分类',
        titleHtml: '项目分类 <i class="ivu-icon ivu-icon-edit"></i>',
        key: 'PRJTYPE',
        option: ['产业项目', '基础设施', '民生项目', '住宅项目'],
        editable: true
      }, {
        align: 'center',
        title: '建设单位',
        titleHtml: '建设单位 <i class="ivu-icon ivu-icon-edit"></i>',
        key: 'JSUNIT',
        editable: true
      }, {
        align: 'center',
        title: '流程分类',
        titleHtml: '流程分类 <i class="ivu-icon ivu-icon-edit"></i>',
        key: 'FLOW_TYPE_CODE',
        option: [{
          value: 'A01',
          label: '建筑-出让'
        }, {
          value: 'A02',
          label: '建筑-划拨'
        }, {
          value: 'B01',
          label: '市政-绿化'
        }, {
          value: 'B02',
          label: '市政-管线'
        }],
        editable: true
      }, {
        align: 'center',
        title: '开工时间',
        titleHtml: '开工时间 <i class="ivu-icon ivu-icon-edit"></i>',
        key: 'DATE_START',
        date: 'month_yyyy-MM',
        editable: true
      }, {
        align: 'center',
        title: '竣工时间',
        titleHtml: '竣工时间 <i class="ivu-icon ivu-icon-edit"></i>',
        key: 'DATE_END',
        date: 'month_yyyy-MM',
        editable: true
      }, {
        align: 'center',
        title: '建设内容',
        titleHtml: '建设内容 <i class="ivu-icon ivu-icon-edit"></i>',
        key: 'CONTENT',
        input: 'textarea',
        editable: true
      }, {
        align: 'center',
        title: '总投资(万元)',
        titleHtml: '总投资<br />(万元) <i class="ivu-icon ivu-icon-edit"></i>',
        key: 'INVEST_ALL',
        input: 'number',
        editable: true
      }, {
        title: '操作',
        align: 'center',
        width: 150,
        key: 'handle',
        handle: ['edit', 'delete']
      }],
      // 增加编辑状态, 保存状态, 用于操作数据 避免干扰原数据渲染
      cloneDataList: []
    }
  },
  methods: {
    getData: function() {
      var self = this;
      self.loading = true;
      $http.get('json/editTable.txt').then(function(res) {
        // 给每行添加一个编辑状态 与 保存状态
        self.dataList = res.data.Items;
        self.cloneDataList = JSON.parse(JSON.stringify(self.dataList)).map(function(item) {
          item.editting = false;
          item.saving = false;
          return item;
        });
        self.init();
        self.loading = false;
      });
    },
    //初始化数据
    init: function() {
      console.log('init');
      var self = this;
      self.columnsList.forEach(function(item) {
        // 使用$set 可以触发视图更新
        // 如果含有titleHtml属性 将其值填入表头
        if (item.titleHtml) {
          self.$set(item, 'renderHeader', function(h, params) {
            return h('span', {
              domProps: {
                innerHTML: params.column.titleHtml
              }
            });
          });
        }
        // 如果含有操作属性 添加相应按钮
        if (item.handle) {
          item.render = function(h, param) {
            var currentRow = self.cloneDataList[param.index];
            var children = [];
            item.handle.forEach(function(item) {
              if (item === 'edit') {
                children.push(editButton(self, h, currentRow, param.index));
              } else if (item === 'delete') {
                children.push(deleteButton(self, h, currentRow, param.index));
              }
            });
            return h('div', children);
          };
        }
        if (item.editable) {
          item.render = function(h, params) {
            var currentRow = self.cloneDataList[params.index];
            if (!currentRow.editting) {
              // 日期类型单独 渲染
              if (item.date) {
                return h('span', self.utils.formatDate(currentRow[item.key], item.date.split('_')[1]))
              }
              // 下拉类型单独渲染
              if(item.option && self.utils.isArray(item.option)){
                if(typeof item.option[0]=='object'){
                  // console.log(item.option.find(findObjectInOption(currentRow[item.key])).label);
                  return h('span', item.option.find(findObjectInOption(currentRow[item.key])).label);
                }
              }
              return h('span', currentRow[item.key]);
            } else {
              if (item.option && self.utils.isArray(item.option)) {
                return h('Select', {
                  props: {
                    value: currentRow[params.column.key]
                  },
                  on: {
                    'on-change': function(value) {
                      self.$set(currentRow, params.column.key, value)
                      // self.$set(self.dataList[params.index], params.column.key, value)
                      // console.log(self.dataList[params.index][params.column.key]);
                      // currentRow[params.column.key] = value
                      // self.dataList[params.column.key] = value
                    }
                  }
                }, item.option.map(function(item) {
                  return h('Option', {
                    props: {
                      value: item.value || item,
                      label: item.label || item
                    }
                  }, item.label || item);
                }));
              } else if (item.date) {
                return h('DatePicker', {
                  props: {
                    type: item.date.split('_')[0] || 'date',
                    clearable: false,
                    value: currentRow[params.column.key]
                  },
                  on: {
                    'on-change': function(value) {
                      self.$set(currentRow, params.column.key, value)
                      // self.$set(self.dataList[params.index], params.column.key, value)
                    }
                  }
                });
              } else {
                return h('Input', {
                  props: {
                    type: item.input || 'text',
                    value: currentRow[params.column.key]
                  },
                  on: {
                    'on-change'(event) {
                      self.$set(currentRow, params.column.key, event.target.value)
                      // self.$set(self.dataList[params.index], params.column.key, event.target.value)
                      // currentRow[params.column.key] = value
                      // self.dataList[params.column.key] = value
                    }
                  }
                });
              }
            }
          };
        }
      });
    },
    // 保存数据
    saveData: function(currentRow, index) {
      var self = this;
      this.$set(this.dataList, index, this.handleBackdata(currentRow))
      // 需要保存的数据
      // ajax
      setTimeout(function() {
        currentRow.saving = false;
        self.$Message.success('保存完成');
        console.log(self.dataList);
        
      }, 1000)
    },
    // 删除数据
    deleteData: function(currentRow, index) {
      var self = this;
      console.log(currentRow.ID);
      setTimeout(function() {
        self.$delete(self.dataList, index)
        self.$delete(self.cloneDataList, index)
        vm.$Message.success('删除成功');
      }, 1000)
    },
    //还原数据
    handleBackdata: function(object) {
      var clonedData = JSON.parse(JSON.stringify(object));
      delete clonedData.editting;
      delete clonedData.saving;
      return clonedData;
    }
  },
  created: function() {
    this.getData();
  },
  mounted: function() {}
  // ,watch: {
  //   // dataList: function() {
  //   //   this.init();
  //   // }
  //   // 深度监听
  //   // dataList: {
  //   //   handler: function() {
  //   //     this.init();
  //   //   },
  //   //   deep: true
  //   // }
  // }
});