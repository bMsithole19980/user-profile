const express =require('express')

const app =express();

app.set('view engine', 'ejs')

const port =4000
const users=[
    {email:'bmsithole1998@gmail.com', password:'bM19980@'},
    {email:'siya@gmail.com', password:'987456'}
];

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})
app.use(express.static('public/'));
app.use(express.json());

console.log('Start');



app.post('/login' ,(req, res)=>{
    const {email ,password}= req.body;

    const user = users.find((user)=> user.email === email);
    if(!user || user.password !== password){
        res.status(401).json({mess:"Invalid credentials"});

    }else{
        res.status(200).json({message:'Login sucessful'})
        
    }
});

app.get('/profile', (req, res)=>{
    const user ={email:'user@example.com', image:[], videos:[]}
    res.render('profile',{user});
})
