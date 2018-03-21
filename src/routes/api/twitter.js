const express = require('express');
const router = express.Router();
///
var output1 = '';
	var array_test = [];
	var i = 0;
	var pom = '';
	var pom2='';
var kafka = require('kafka-node'),
    Consumer = kafka.Consumer,
    client = new kafka.Client("127.0.0.1:2181/"),
    consumer = new Consumer(
        client,
        [
            { topic: 'twitterFeeds', partition: 0 }
        ],
        {
            autoCommit: false
        }
    );
	const inMemoryTodoDB = [];
	var output2 = consumer.on('message', function (message) {
     //console.log(message);
	 obj = JSON.stringify(message);
	 pom = message;
	output1 =   output1 + obj + ",";
	array_test[0] = pom;
	
	inMemoryTodoDB[i] = pom;
	i = i + 1;
 	});
	///
	var dusan = '';
		dusan = dusan + output1;
	var trim = output1.replace(/,\s*$/, "");
	console.log('dusan');
	

//  {offset:0,name:'Part I',description:'Write Part I', done:true},
  //{offset:1,name:'Part II',description:'Write Part II', done:false}
///];

router.get('/',(req,res)=>{
  res.status(200)
	.json(inMemoryTodoDB)
	
});

router.get('/:offset',(req,res)=>{
  
  const { offset } = req.params;
  
  const todoItem = inMemoryTodoDB.filter((todo)=> todo.offset==offset)[0];
  
  if(!todoItem){
    res.sendStatus(404);
  }
  else{
    res.status(200).json(todoItem);
  }
});





module.exports = router;