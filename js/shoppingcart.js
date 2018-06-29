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
                console.log(this.items);
                console.log(this.val);
                if (this.val == '') return;
                this.items.push({name:this.val, state:false});
                // this.items.push({name:'ello', state:false});
                // this.items.push({action:text,state:false});

                this.val = ''
            },

            deleteItem:function (index){
                this.items.splice(index,1)
            }

        }
    })
}