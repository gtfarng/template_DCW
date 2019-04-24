const express = require('express')
const app = express()
const router = express.Router();
const cors = require('cors')
const bodyParser = require('body-parser')

let countries = [{id: 0, name: 'THAILAND'},
    {id: 1, name: 'CHINA'},
    {id: 2, name: 'FRANCE'},
    {id: 3, name: 'SINGAPORE'}]

app.use(cors())
app.use('/api', bodyParser.json() ,router)
app.use('/api', bodyParser.urlencoded({extended:false}) ,router)

router.route('/countries')
    .get( (req, res) =>  res.json(countries) )

  
    .post( (req, res)=> {
        var country = {};
        country.id =   countries[countries.length-1].id +1  ;
        country.name = req.body.name
        countries.push(country);
        res.json( {message: 'Country created!'} )
    })


router.route('/countries/:country_id')
    .get ( (req,res) => {
        let id = countries.findIndex( (country) => country.id === +req.params.country_id)
        res.json(countries[id])
    })  

    .put ( (req,res) => {                              
        let id = countries.findIndex( (country) => country.id === +req.params.country_id)
        countries[id].name = req.body.name;
        res.json({ message: 'Country updated!' + req.params.country_id});
    })

    .delete ( (req,res) => {                  
        countries = countries.filter( (country) => country.id !== +req.params.country_id )
        res.json({ message: 'Country deleted: ' + req.params.country_id});
    })

app.listen(8000, () => console.log('server ready'))