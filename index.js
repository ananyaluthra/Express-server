import express from 'express';
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
app.get('/teas:id',(req,res)=>{
    const tea=req.find(t=>t.id===parseInt(req.params.id));
    if(!tea){
        return res.status(404).send('Invalid number');
    }
    else{
        return res.status(203).send(tea);
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
    res.status(200).send(tea);
})
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
    return res.status(205).send('Tea deleted');
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
