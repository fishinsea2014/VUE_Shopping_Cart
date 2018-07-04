window.onload = function(){
    new Vue({
        el: "#shoppingcart",
        data:{
            name: 'Jason',
            curpage: 1 , // Current page number
            pagenum :1 , //Total number of pages
            length : 1,  //Total number of items
            val: '',
            items: [],  //Get items from server by method of getList()
            // items:[
            //     {name:'Screen', state: false},                
            //     {name:'Cpu', state: false},
            //     {name:'Mouse', state: false},
            //     {name:'Hard disk', state: false}
            // ],
            count:0
        },
        mounted: function(){
            this.getList();
        },

        methods: {
            test:function() {
                console.log('this is test');
                console.log('name',this.name,this.count);
            },

            addItem: function(){
                // console.log(this.items);
                // console.log(this.val);
                if (this.val == '') return;
                // this.items.push({name:this.val, state:false});                
                axios({
                    method : 'put',
                    url : 'http://localhost:3000/list/add' , 
                    data : {
                        cur : this.curpage,
                        name : this.val,
                        state : this.state
                    }
                }).then((res) => {
                    console.log(res);
                    if (res.data.code =="200"){
                        this.getList(this.curpage);
                        this.val = '';
                    }
                }).catch ((err) => {
                    console.log(err);
                })
                ;
                this.val = ''
            },

            deleteItem: function (index){
                // this.items.splice(index,1)
                axios({
                    method: 'DELETE',
                    url : 'http://localhost:3000/list/del',
                    data : {
                        cur : this.curpage,
                        index : index
                    }
                }).then((res) => {
                    console.log(res);
                    if (res.data.code == '200'){
                        this.getList(this.curpage);
                    }
                }).catch((err) => {
                    console.log(err);
                })
            },

            updateItems: function (state, index) {
                // var _this = this; 
                // this.count = 0;     
                // _this.count = this.items.filter(function(x){return !x.state}).length;    
                axios({
                    method: 'post',
                    url:'http://localhost:3000/list/checkbox' ,
                    data: {
                        cur: this.curpage,
                        index: index,
                        state: state
                    } 
                }).then( (res) => {
                    if (res.data.code == '200') {
                        this.getList(this.curpage);
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
            },

            getList: function(cur){
                this.curpage = cur || this.curpage;
                axios({
                    method : 'post',
                    url : 'http://localhost:3000/list/get',
                    data: {
                        cur: this.curpage
                    }
                }).then((res) =>{
                    this.items =res.data.arr;
                    this.pagenum = res.data.total;                    
                    this.length = res.data.length;
                    this.count =  this.items.filter(function(x){
                        return !x.state;
                    }).length;

                }).catch((err) =>{
                    console.log(err);
                });
                debugger;
            }

        },

        filters:{
            stateFilter: function(type){
                switch(type){
                    case true:
                        return 'Pruchased';
                    case false:
                        return 'Not pruchased';
                    default:
                        return 'Not purchased'
                }
            }
        }
    })
}