import React, { Component } from 'react';
import axios from 'axios'
import { getStudents } from '../Actions/Students'
import { connect } from 'react-redux'
import '../App.css'

const URL = 'http://localhost:8000/api/'

class Student extends Component {

    constructor(props) {
        super(props)
        this.state = {
            students: [],
            id: 0, psuid: '', name: '', lastname: '', email: '', tel: '',
            newid: 0, newpsuid: '573551202', newname: 'Jatupat', newlastname: 'Pannoi', newemail: 'gtfarng@gmail.com', newtel: '0982634274',
        }
    }

    componentDidMount() {
        //console.log('props',this.props)
        this.props.getStudents()
    }

    renderStudents = () => {
        if (this.props.students) {
            return this.props.students.map((student, index) => {
                // console.log( "test",student.name)
                return (<li key={index}>
                    {student.psuid} : {student.name} {student.lastname} {student.email} {student.tel}
                    &nbsp;&nbsp;<button onClick={() => this.getStudent(index)}>GET</button>
                    &nbsp;&nbsp;<button onClick={() => this.deleteStudent(index)}>DELETE</button>
                    &nbsp;&nbsp;<button onClick={() => this.getStudent(index)}>EDIT</button>
                </li>
                )
            })
        }
    }

    deleteStudent = (id) => {
        axios.delete(`${URL}/Students/${id}`)
            .then((res) => {
                // console.log('Delete:' + res)
                this.props.getStudents()
            })
    }

    addStudent = (e) => {
        e.preventDefault()
        axios.post(`${URL}/Students`, {
            psuid: this.state.psuid,
            name: this.state.name,
            lastname: this.state.lastname,
            email: this.state.email,
            tel: this.state.tel
        })
            .then((res) => {
                //  console.log('Create a new Student: ' + res);
                this.props.getStudents()
            })
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }
    handleChangenew = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    editStudent = (e) => {
        e.preventDefault()
        axios.put(`${URL}/Students/${this.state.newid}`, {
            psuid: this.state.newpsuid,
            name: this.state.newname,
            lastname: this.state.newlastname,
            email: this.state.newemail,
            tel: this.state.newtel
        })
            .then((response) => {
                // console.log('Create a new Student: ' + response);
                this.props.getStudents()
            })
    }


    getStudent = (id) => {
        axios.get(`${URL}/Students/${id}`)
            .then((res) => {
                // const {name} = res.data
                // console.log('res', res.data)
                this.setState({
                    newid: res.data.id,
                    newpsuid: res.data.psuid,
                    newname: res.data.name,
                    newlastname: res.data.lastname,
                    newemail: res.data.email,
                    newtel: res.data.tel
                })
                //console.log('state', this.state)
            })
    }

    render() {
        return (
            <div style={{ margin: '20px' }}>

                <div class="card container">
                    <div class="card-body">

                        <h2>Add Student</h2>
                        <form onSubmit={this.addStudent}>
                            <br />
                            <input type="text" name="psuid" placeholder="Enter PSU Passsport" value={this.state.psuid} onChange={this.handleChange} />&nbsp;
                            <input type="text" name="name" placeholder="Enter Name Student" value={this.state.name} onChange={this.handleChange} />&nbsp;
                            <input type="text" name="lastname" placeholder="Enter LastName Student" value={this.state.lastname} onChange={this.handleChange} />&nbsp;
                            <input type="text" name="email" placeholder="Enter E-Mail Student" value={this.state.email} onChange={this.handleChange} />&nbsp;
                            <input type="text" name="tel" placeholder="Enter Tel Student" value={this.state.tel} onChange={this.handleChange} />&nbsp;
                    <br />
                            <br />
                            <button>Submit</button>
                        </form>
                        <br />
                    </div>
                </div> <br />




                <div class="card container">
                    <div class="card-body">

                        <h2>Render Student</h2><br />
                        <ul className="bullet-center">
                            {this.renderStudents()}
                        </ul>
                        <br />
                    </div>
                </div> <br />



                <div class="card container">
                    <div class="card-body">
                        <h2>Get Student</h2>

                        ID : {this.state.newid}<br />
                        PSU-PASSPORT : {this.state.newpsuid}<br />
                        NAME : {this.state.newname} {this.state.newlastname} <br />
                        E-MAIL : {this.state.newemail} <br />
                        TEL : {this.state.newtel}
                        <br />
                    </div>
                </div> <br />



                <div class="card container">
                    <div class="card-body">
                        <br />
                        <h2>Edit Student</h2>
                        <form onSubmit={this.editStudent}>
                            <br />
                            PSU Passsport   : <input type="text" name="newpsuid" placeholder="Edit PSU Passsport" value={this.state.newpsuid} onChange={this.handleChangenew} />&nbsp;<br />
                            Name : <input type="text" name="newname" placeholder="Edit Name Student" value={this.state.newname} onChange={this.handleChangenew} />&nbsp;<br />
                            LastName : <input type="text" name="newlastname" placeholder="Edit LastName Student" value={this.state.newlastname} onChange={this.handleChangenew} />&nbsp;<br />
                            E-Mail  : <input type="text" name="newemail" placeholder="Edit E-Mail Student" value={this.state.newemail} onChange={this.handleChangenew} />&nbsp;<br />
                            Tel  : <input type="text" name="newtel" placeholder="Edit TEel Student" value={this.state.newtel} onChange={this.handleChangenew} />&nbsp;<br />
                            <br />
                            <br />
                            <button>UPDATE</button>
                        </form>
                        <br />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ students }) => {
    return { students }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStudents: () => dispatch(getStudents())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Student);