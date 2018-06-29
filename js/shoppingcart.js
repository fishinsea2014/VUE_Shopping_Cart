window.onload = function(){
    new Vue({
        el: "#shoppingcart",
        data:{
            name: 'Jason',
            val: '',
            items:[
                {name:'Screen', state: false},                
                {name:'Cpu', state: false},
                {name:'Mouse', state: false},
                {name:'Hard disk', state: false}
            ],
            text:'',
            count:0
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
                this.items.push({name:this.val, state:false});                
                this.val = ''
            },

            deleteItem: function (index){
                this.items.splice(index,1)
            },

            updateItems: function () {
                var _this = this; 
                this.count = 0;     
                _this.count = this.items.filter(function(x){return !x.state}).length;    
                // _this.count = this.items.filter(function(x) {return !x.state}).length;
      
                // this.items.forEach(function(item,index) {
                //     if (!item.state) {
                //         _this.count++;
                //     }
                // });
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