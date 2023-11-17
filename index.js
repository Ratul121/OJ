const express = require('express')
const axios = require('axios');
const app = express()
const port = 3000
var cors = require('cors')

app.use(express.json());
app.use(cors())

app.post('/c', (req, res) => {
    let data = JSON.stringify({
        "type": "code",
        "visibility": "public",
        "properties": {
          "language": "c",
          "files": [
            {
              "name": "Main.c",
              "content": req.body.code
            }
          ],
          "stdin": req.body.input
        }
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://onecompiler.com/api/code/exec',
        headers: { 
          'content-type': 'application/json'
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {

        res.send(response.data)
      })
      .catch((error) => {
        console.log(error);
      });

      
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))




