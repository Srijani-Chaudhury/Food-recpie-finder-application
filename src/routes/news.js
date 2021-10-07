const express=require('express');
const newsrouter=express.Router();
const axios=require('axios');

newsrouter.get('',async(req,res)=>{
 res.render('starter');
})
newsrouter.post('',async function(req,res){
  const query=req.body.query;
  const diet=req.body.diet;
  const health=req.body.health;
  const cuisine=req.body.cuisine;
  try {
    const foodAPI=await axios.get('https://api.edamam.com/api/recipes/v2?app_id=e210b611&app_key=75848d86cf9d2edbcc49abec155a9404&q='+query+'&type=public&diet='+diet+'&cuisineType='+cuisine+'&health='+health);
    res.render('news',{articles:foodAPI.data.hits});
  }catch(error){
    if(error.response){// client received an error response (5xx, 4xx)
      res.render('news',{articles:null});
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    }else if(err.request){// client never received a response, or request never left
      res.render('news',{articles:null});
      console.log(err.request);
    }else{
      res.render('news',{articles:null});
      console.error('Error',err.message);
    }
}
})
newsrouter.get('/:id',async function(req,res){
  const foodid=req.params.id;
  try {
    const food=await axios.get('https://api.edamam.com/api/recipes/v2/'+foodid+'?id='+foodid+'&app_id=6646fae3&app_key=98618d5563cf1836446222b7717073d7&type=public');
    res.render('fooddetails',{articles:food.data});
  }catch(error){
    if(error.response){// client received an error response (5xx, 4xx)
      res.render('fooddetails',{articles:null});
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    }else if(err.request){// client never received a response, or request never left
      res.render('fooddetails',{articles:null});
      console.log(err.request);
    }else{
      res.render('fooddetails',{articles:null});
      console.error('Error',err.message);
    }
}


})


module.exports=newsrouter;
