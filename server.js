const app = require('./app');
require('dotenv').config();
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;

// database connection
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.z7bwc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(uri,   
    {useNewUrlParser : true, useUnifiedTopology : true}
)
    .then(()=>  {

        app.listen(port, ()=> {
            console.log('Listening with the port', port);

        console.log('database connected')

        })
    })
    .catch(e=> console.log(e));




