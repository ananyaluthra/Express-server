import express from 'express';
import logger from './logger.js';
import morgan from morgan;
const port=3000;
const app=express();
app.use(express.json());
let teaData=[];
let nextId=1;
app.post('/teas',(req,res)=>{
    const {name,price}=req.body;
    const newTea={id:nextId++,name,price}
    teaData.push(newTea);
    res.status(201).send(newTea);
})
app.get('/teas/:id',async(req,res)=>{
    const tea=await teaData.find(t=>t.id===parseInt(req.params.id));
    console.log(tea);
    if(!tea){
        return res.status(404).send('Invalid number');
    }
    else{
        return res.status(200).send(tea);
    }
    
})
//update tea
app.put('/teas/:id',(req,res)=>{
    const tea=teaData.find(t=>t.id===parseInt(req.params.id));
    if(!tea){
        return res.status(404).send('Tea not found');
    }
    const {name,price}=req.body;
    tea.name=name;
    tea.price=price;
    console.log(tea);
    res.status(200).send(tea);
})
app.get("/teas",(req,res)=>{
    res.status(200).send(teaData);
    console.log(teaData);
});
app.get("/",(req,res)=>{
    res.send("Hello from Ananya");
});
app.get("/ice-tea",(req,res)=>{
    res.send("Wowww! Want an ice tea? Yummm");
})
app.get("/twitter",(req,res)=>{
    res.send("ananyaluthra");
})
app.delete("/teas/:id",(req,res)=>{
    const index=teaData.find(t=>t.id===parseInt(req.params.id));
    if(index===-1){
        res.status(404).send('Whatchu doin bro?');
    }
    teaData.splice(index,1);
    return res.status(200).send('Tea deleted');
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
const morganFormat=':method :url :status :response-time ms'
app.use(morgan(morganFormat,{
stream:{
    write:(message)=>{
        const logObject={
            method:message.split('')[0],
            url:message.split('')[1],
            status:message.split('')[2],
            responseTime:message.split('')[3]
        };
        logger.info(JSON.stringify(logObject));
    }
}
}));