const express = require('express')
const app = express()
const router = express.Router();
const cors = require('cors')
const bodyParser = require('body-parser')

let bears = [{id: 0, name: 'Winnie', weight: 75, height:150, group:'O' },
    {id: 1, name: 'Pooh', weight: 65, height:165, group:'AB' },
    {id: 2, name: 'GTfarng', weight: 55, height:173, group:'A' },
    {id: 3, name: 'Lockerz', weight: 65, height:181, group:'A' }]

app.use(cors())
app.use('/api', bodyParser.json() ,router)
app.use('/api', bodyParser.urlencoded({extended:false}) ,router)

router.route('/bears')
    .get( (req, res) =>  res.json(bears) )

    // insert a new bear
    .post( (req, res)=> {
        var bear = {};
        bear.id =   bears[bears.length-1].id +1  ;
        bear.name = req.body.name
        bear.weight = req.body.weight
        bear.height = req.body.height
        bear.group = req.body.group
        bears.push(bear);
        res.json( {message: 'Bear created!'} )
    })


router.route('/bears/:bear_id')
    .get ( (req,res) => {
        let id = bears.findIndex( (bear) => bear.id === +req.params.bear_id)
        res.json(bears[id])
    })  // get a bear

    .put ( (req,res) => {                               // Update a bear
        // var id = req.params.bear_id
        let id = bears.findIndex( (bear) => bear.id === +req.params.bear_id)
        bears[id].name = req.body.name;
        bears[id].weight = req.body.weight;
        bears[id].height = req.body.height;
        bears[id].group = req.body.group;
        res.json({ message: 'Bear updated!' + req.params.bear_id});
    })

    .delete ( (req,res) => {                   // Delete a bear
        // delete     bears[req.params.bear_id]
        bears = bears.filter( (bear) => bear.id !== +req.params.bear_id )
        res.json({ message: 'Bear deleted: ' + req.params.bear_id});
    })

app.listen(8000, () => console.log('server ready'))