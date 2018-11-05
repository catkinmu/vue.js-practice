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
        var tempData = vm.handleBackdata(currentRow);
        var key = 'ID_' + currentRow.PID
        if (!currentRow.editting) {
          currentRow.editting = true;
        } else {
          if (JSON.stringify(tempData) == JSON.stringify(vm.childData[key].data[index])) {
            console.log('未更改');
            return (currentRow.editting = false);
          }
          vm.saveData(currentRow, index);
          currentRow.saving = true;
        }
      }
    }
  }, currentRow.editting ? '保存' : '编辑');
};
new Vue({
  el: '#app',
  data: function() {
    var self = this;
    return {
      loading: false,
      // 父级表格数据
      parentData: [],
      parentColumn: [{
        align: 'center',
        title: '操作',
        type: 'expand',
        width: 40,
        render: function(h, params) {
          return h('Table', {
            props: {
              height: 208,
              loading: self.childData['ID_' + params.row.ID].loading,
              columns: self.childColumn,
              data: self.childData['ID_' + params.row.ID].data
            }
          });
        }
      }, {
        align: 'center',
        title: '序号',
        type: 'index',
        width: 40
      }, {
        align: 'center',
        title: '项目名称',
        key: 'PRJNAME'
      }, {
        align: 'center',
        title: self.utils.currentYear() + '年计划',
        key: 'CODE1'
      }, {
        align: 'center',
        title: '上报资金支付计划',
        key: 'CODE2'
      }, {
        align: 'center',
        title: '截止' + self.utils.currentMonth() + '月' + self.utils.currentYear() + '年累计支付额',
        key: 'CODE3'
      }, {
        align: 'center',
        title: '截止' + self.utils.currentYear() + '年' + self.utils.currentMonth() + '月累计支付额',
        key: 'CODE4'
      }],
      // 子表表头
      childColumn: [{
        title: '操作',
        width: 80,
        key: 'handle',
        handle: ['edit']
      }, {
        title: '序号',
        type: 'index',
        width: 50
      }, {
        title: '合同名称',
        key: 'CODE1'
      }, {
        title: '乙方单位名称',
        key: 'CODE2'
      }, {
        title: '目标投资总额',
        key: 'CODE4'
      }, {
        title: '截止本月末累计完成工程成本',
        key: 'CODE5'
      }, {
        title: '截止2017年累计支付额',
        key: 'CODE6'
      }, {
        title: '截止5月2018年累计支付额',
        key: 'CODE7'
      }, {
        title: '截止2018年5月累计支付额',
        key: 'CODE8'
      }, {
        title: '上报资金支付计划',
        titleHtml: '上报资金支付计划<i class="fa fa-pencil"></i>',
        key: 'CODE9',
        editable: true
      }, {
        title: '政府批复金额',
        key: 'CODE10'
      }, {
        title: '政府批复时间',
        key: 'CODE11'
      }, {
        title: '财务支付额',
        key: 'CODE12'
      }, {
        title: '财务支付时间',
        key: 'CODE13'
      }, {
        title: '合同约定应支付比例',
        key: 'CODE14'
      }, {
        title: '批复时间',
        key: 'CODE15'
      }, {
        title: '备注',
        key: 'CODE16'
      }],
      // 子级表格数据
      childData: {},
      // 子表克隆数据
      cloneChildData: {}
    };
  },
  methods: {
    getParentData: function() {
      var self = this;
      $http.get('json/index_parentData.txt').then(function(res) {
        self.parentData = res.data.Items;
        self.initChildData();
      });
    },
    // 初始化子表 参数
    initChildData: function() {
      var self = this;
      this.parentData.forEach(function(item, index) {
        self.$set(self.childData, 'ID_' + item.ID, {
          data: [],
          loading: true
        });
      });
    },
    // 展开表格
    expandTable: function(row, status) {
      if (!this.childData['ID_' + row.ID].data.length) {
        this.getChildData(row.ID)
      };
    },
    // 拉取子表数据 并 改造（添加editting，saving属性）
    getChildData: function(id) {
      var self = this;
      var key = 'ID_' + id;
      $http.get('json/index_childData_' + key + '.txt').then(function(res) {
        setTimeout(function() {
          self.$set(self.childData, key, {
            data: res.data.Items,
            loading: false
          });
          self.$set(self.cloneChildData, key, {
            data: JSON.parse(JSON.stringify(res.data.Items)).map(function(item) {
              item = Object.assign({}, item, {
                editting: false,
                saving: false
              });
              return item;
            }),
            loading: false
          })
        }, 300)
      });
    },
    //初始化数据
    init: function() {
      console.log('init');
      var self = this;
      self.childColumn.forEach(function(item) {
        item.align = "center"
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
          item.render = function(h, params) {
            var currentRow = self.cloneChildData['ID_' + params.row.PID].data[params.index];
            var children = [];
            item.handle.forEach(function(item) {
              if (item === 'edit') {
                children.push(editButton(self, h, currentRow, params.index));
              } else if (item === 'delete') {
                children.push(deleteButton(self, h, currentRow, params.index));
              }
            });
            return h('div', children);
          };
        }
        if (item.editable) {
          item.render = function(h, params) {
            var currentRow = self.cloneChildData['ID_' + params.row.PID].data[params.index];
            // console.log(currentRow);
            if (!currentRow.editting) {
              if (item.date) {
                return h('span', self.utils.formatDate(currentRow[item.key], item.date.split('_')[1]));
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
                      currentRow[params.column.key] = value
                      // self.$set(currentRow, params.column.key, value);
                    }
                  }
                }, item.option.map(function(item) {
                  return h('Option', {
                    props: {
                      value: item
                    }
                  }, item);
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
                      currentRow[params.column.key] = value
                      // self.$set(currentRow, params.column.key, value);
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
                      currentRow[params.column.key] = event.target.value
                      // self.$set(currentRow, params.column.key, event.target.value);
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
      // console.log(currentRow);
      this.$set(this.childData['ID_' + currentRow.PID].data, index, this.handleBackdata(currentRow));
      // 需要保存的数据
      // ajax
      setTimeout(function() {
        currentRow.saving = false;
        currentRow.editting = false;
        self.$Message.success('保存完成');
      }, 1000);
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
    this.getParentData();
    this.init();
  }
});