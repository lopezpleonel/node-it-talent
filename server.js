const app = require('./app');
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;

// database connection
const user = 'llopez';
const password = 'mTUrB27GIZa2eDZJ';
const dbname = 'database'
const uri = `mongodb+srv://${user}:${password}@cluster0.z7bwc.mongodb.net/${dbname}?retryWrites=true&w=majority`;

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




