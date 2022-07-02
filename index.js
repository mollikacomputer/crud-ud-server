const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');

app.use(cors());
app.use(express());

app.get('/', (req, res)=>{
    res.send('mongoDB practice project Home Route Link')
});
// application data from mongodb

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://users:4p0QpTLyFR33djF0@cluster0.kwdbbxh.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const userCollection = client.db("practice").collection("users");
        
        app.post('/user', (req, res)=>{
            const newUser = req.body;
            console.log('adding new user ', newUser);
            res.send('user data received');
        });

        console.log('db connected Practice project');
    }finally{
        // await client.close(); // after get some result need to close then use close
    }
}
run().catch(console.dir)
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


app.listen(port, ()=>{
    console.log(`Listening to port ${port}`);
})