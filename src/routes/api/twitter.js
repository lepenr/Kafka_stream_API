const express = require('express');
const router = express.Router();
///
var output1 = '';
	var i = 0;
	var pom = '';
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
	 //obj = JSON.stringify(message);
		inMemoryTodoDB[i] = message;
	i = i + 1;
 	});


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