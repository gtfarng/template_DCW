const express = require('express')
const app = express()
const router = express.Router();
const cors = require('cors')
const bodyParser = require('body-parser')

let students = [{ id: 0, psuid: '5735512002', name: 'Jatupat', lastname: 'Pannoi', email: 'gtfarng@gmail.com', tel: '0982634274' },
{ id: 1, psuid: '5835512002', name: 'lockerz', lastname: 'gtfarng', email: 'lockerzfarng@gmail.com', tel: '0634219957' },
{ id: 2, psuid: '5935512002', name: 'jatupat', lastname: 'lockerz', email: 'lockerzgtfarng@gmail.com', tel: '0982634274' },
{ id: 3, psuid: '6035512002', name: 'gtfarng', lastname: 'lockerz', email: '5735512002@psu.ac.th', tel: '0634219957' },]

app.use(cors())
app.use('/api', bodyParser.json(), router)
app.use('/api', bodyParser.urlencoded({ extended: false }), router)

router.route('/students')
    .get((req, res) => res.json(students))

    .post((req, res) => {
        var student = {};
        student.id = students[students.length - 1].id + 1;
        student.psuid = req.body.psuid
        student.name = req.body.name
        student.lastname = req.body.lastname
        student.email = req.body.email
        student.tel = req.body.tel
        students.push(student);
        res.json({ message: 'Student created!' })
    })


router.route('/students/:student_id')
    .get((req, res) => {
        let id = students.findIndex((student) => student.id === +req.params.student_id)
        res.json(students[id])
    })

    .put((req, res) => {
        let id = students.findIndex((student) => student.id === +req.params.student_id)
        students[id].psuid = req.body.psuid;
        students[id].name = req.body.name;
        students[id].lastname = req.body.lastname;
        students[id].email = req.body.email;
        students[id].tel = req.body.tel;
        res.json({ message: 'Student updated!' + req.params.student_id });
    })

    .delete((req, res) => {
        students = students.filter((student) => student.id !== +req.params.student_id)
        res.json({ message: 'Student deleted: ' + req.params.student_id });
    })

app.listen(8000, () => console.log('server ready'))