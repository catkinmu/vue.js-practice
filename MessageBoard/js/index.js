var app = new Vue({
    el: '#app',
    data: {
        username: '',
        message: '',
        list: [
            {
                name: 'aaa',
                message: 'aaa的留言'
            }
        ]
    },
    methods: {
        handleSend() {
            if (this.username === '') {
                alert('请输入昵称')
                return;
            }
            if (this.message === '') {
                alert('请输入留言内容')
                return;
            }
            this.list.push({
                name: this.username,
                message: this.message
            })
            this.message = ''
        },
        handleReply(index) {
            var name = this.list[index].name;
            this.message = '回复@' + name + '：';
            this.$refs.message.focus();
        }
    },
    mounted() {
        console.log(this.$refs);

    },
})
