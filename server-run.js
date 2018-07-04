var connect = require('connect');  //Create connection
var bodyParser = require('body-parser');   //body parsing
var serveStatic = require('serve-static');   //static file access
var arr=[
	{name:'1memory',state:false},
	{name:'2cpu',state:false},
	{name:'3mouse',state:false},
	{name:'4screen',state:true},
	{name:'5keyboard',state:false},
	{name:'6box',state:false},
    {name:'7mainboard',state:true},	 
    {name:'8keyboard',state:false},
	{name:'9box',state:false},
    {name:'10mainboard',state:true},
    {name:'11keyboard',state:false},
	{name:'12box',state:false},
	{name:'13mainboard',state:true}
];
var size = 10; // Define 10 items a page.
var app = connect()
    .use(bodyParser.json())   //JSON parsing
    .use(bodyParser.urlencoded({extended: true}))
    .use(serveStatic(__dirname))
	
	.use(function (req, res, next) {
		
		// Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');  
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');  
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,X-Session-Token');   //允许任何类型
		res.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});    
		next();  
	})
	.use('/list/get', function(req, res, next) {
		var data = {"code":200,"msg":"success"};
		var i = req.body.cur -1; 		
		var length = arr.length;
		var total = Math.ceil(length/size);
		var arr2 =arr.slice(i*10,i*10+10);
		data.arr =arr2;
		data.length = length;
		data.total = total;
		data.num = arr.filter(function(item){
			return item.state;
        }).length;
        console.log(arr);
        res.end(JSON.stringify(data));
		next();
	})
	.use('/list/add', function(req, res, next) {
		var data = {"code":200,"msg":"success"};
		if(req.method=='PUT'){
			var obj = {};
			obj.name = req.body.name;
			obj.state = false;
			console.log(obj);
			arr.push(obj)
		}
		
        res.end(JSON.stringify(data));
		next();
	})
	.use('/list/del', function(req, res, next) {
		var data = {"code":200,"msg":"success"};
		if(req.method=="DELETE"){
			var index  = req.body.index ;
			var cur  = req.body.cur ;
			console.log(index,cur);
			index = (cur-1)* size + index;
			console.log(index , cur );
			arr.splice(index,1);
			console.log(arr);
		}
		
        res.end(JSON.stringify(data));
		next();
	})
	.use('/list/checkbox', function(req, res, next) {
		var data = {"code":200,"msg":"success"};
		if(req.method=="POST"){
			var index  = req.body.index ;
			var cur  = req.body.cur ;
			var state = req.body.state;
			index = (cur-1)* size + index;
			arr[index].state=state;
			console.log(arr);
		}
		
        res.end(JSON.stringify(data));
		next();
	})
    .listen(3000);
console.log('Server started on port 3000.');