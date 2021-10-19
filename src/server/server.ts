
import express from 'express';
import cors from 'cors';
import path from 'path';
import { UserModel } from './schemas/user.schema.js'
import mongoose from 'mongoose';

const app = express();
const __dirname = path.resolve();
const PORT = 3501;

mongoose.connect('mongodb://localhost:27017/amazonCloneDB')
.then(() => {
    console.log('Connected to DB Successfully');
})
.catch(err => console.log('Failed to Connect to DB', err))



app.use(cors());
app.use(express.json());

app.get('/', function(req, res) {
   res.json({message:'test'});
});

app.get('/users', function(req,res){
    UserModel.find()
    .then(data => res.json({data}))
    .catch(err => {
        res.status(501)
        res.json({errors: err});
    })
});
app.post('/create-user', function(req,res){
    const {name, email, username} = req.body;
    const user = new UserModel({
        name,
        username,
        email,
    });
    user.save()
    .then((data) => {
        res.json({data});
    })
    .catch(err => {
        res.status(501);
        res.json({errors: err});
    })
});


app.delete('/delete-user/:id', function(req, res) {
    const _id = req.params.id;
    UserModel.findByIdAndDelete(_id).then((data) => {
        console.log(data);
        res.json({data});
    });
})

app.put('/update-user/:id', function(req, res) {
    console.log("Update user");
    UserModel.findByIdAndUpdate(
        req.params.id,
        {
            $set: { name: req.body.name, email: req.body.email },
        },
        {
            new: true,
        },
        function(err, updateUser) {
            if(err) {
                res.send("Error updating user");
            }
            else{
                res.json(updateUser);
            }
        }
    )
})


app.listen(PORT, function(){
    console.log( `starting at localhost http://localhost:${PORT}`);
})
