const express =require('express')
const path = require('path');
const app =express();

app.set('view engine', 'ejs')
//app.set('views', path.join(__dirname, 'views'));

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
//function to store the user image
function getUserImages(){
    return ['user1.jpg','user2.jpg','user3.jpg'];
}
//function to add the user videos
function getUserVideos(){
    return ['user1Video.mp4','user2video.mp4', 'user2Video2.mp4' ];
}
app.post('/login' ,(req, res)=>{
    const {email ,password}= req.body;

    const user = users.find((user)=> user.email === email);
    if(!user || user.password !== password){
        res.status(401).json({mess:"Invalid credentials"});

    }else{
        res.status(200).json({message:'Login sucessful'})
        alert('You have successful logged in');
        

        //call function to get all user images and videos and display the on the console
        const userImages =getUserImages();
        const userVideos =getUserVideos();
        const userWithEmial ={...user, email: email}
        res.render('profile', {user: userWithEmial , images:userImages ,videos: userVideos});
        
        console.log('User Image: ',userImages);
        console.log('User Videos: '  ,userVideos);
        
    }
});

app.get('/profile', (req, res)=>{
    const user ={
     email:'user@example.com',
     images:getUserImages(),
     videos:getUserVideos()
    };
    res.render('profile',{user});
})
app.get ('/logout', (req, res)=>{
    res.redirect('/')
})

app.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'))

});
app.get('/login',(req, res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'))

});