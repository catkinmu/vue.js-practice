Vue.component('vTable', {
    props: {
        columns: {
            type: Array,
            default: function () {
                return [];
            }
        },
        data: {
            type: Array,
            default: function () {
                return [];
            }
        }
    },
    data: function () {
        return {
            currentColumns: [],
            currentData: []
        }
    },
    render: function (h) {
        var _this = this;
        var ths = [];
        this.currentColumns.forEach(function (col, index) {
            if (col.sortable) {
                ths.push(h('th', [
                    h('span', col.title),
                    h('a', {
                        class: {
                            on: col._sortType === 'asc'
                        },
                        on: {
                            click: function () {
                                _this.handleSortByAsc(index)
                            }
                        }
                    }, '↑'),
                    h('a', {
                        class: {
                            on: col._sortType === 'desc'
                        },
                        on: {
                            click: function () {
                                _this.handleSortByDesc(index)
                            }
                        }
                    }, '↓')
                ]))
            } else {
                ths.push(h('th', col.title))
            }
        });

        var trs = [];
        this.currentData.forEach(function (row) {
            var tds = [];
            _this.currentColumns.forEach(function (cell) {
                tds.push(h('td', row[cell.key]))
            });
            trs.push(h('tr', tds))
        });
        return h('table', [
            h('thead', [
                h('tr', ths)
            ]),
            h('tbody', trs)
        ])
    },
    methods: {
        makeColumns() {
            //初始化表头 给每一列表头增加_sortType 和_index属性 用来判断是否排序 及 如何排序
            this.currentColumns = this.columns.map(function (col, index) {
                col._sortType = 'normal';
                col._index = index;
                return col;
            })

        },
        makeData() {
            //初始化表头 给每一行数据增加_index属性
            this.currentData = this.data.map(function (row, index) {
                row._index = index;
                return row;
            })
        },
        handleSortByAsc(index) {
            //重置其它的排序效果
            var key = this.currentColumns[index].key;
            this.currentColumns.forEach(function (col) {
                col._sortType = 'normal';
            })
            //给当前点击列 增加排序
            this.currentColumns[index]._sortType = 'asc';
            this.currentData.sort(function (a, b) {
                return a[key] > b[key] ? 1 : -1;
            })
        },
        handleSortByDesc(index) {
            var key = this.currentColumns[index].key;
            this.currentColumns.forEach(function (col) {
                col._sortType = 'normal';
            })
            this.currentColumns[index]._sortType = 'desc';
            this.currentData.sort(function (a, b) {
                return a[key] < b[key] ? 1 : -1;
            })
        }
    },
    watch: {
        data: function () {
            this.makeData();
            var sortedColumn = this.currentColumns.filter(function (col) {
                return col._sortType !== 'normal'
            });
            if (sortedColumn.length > 0) {
                if (sortedColumn[0]._sortType === 'asc') {
                    this.handleSortByAsc(sortedColumn[0]._index);
                } else {
                    this.handleSortByDesc(sortedColumn[0]._index)
                }
            }
        }
    },
    mounted: function () {
        this.makeColumns();
        this.makeData()
    }
})
