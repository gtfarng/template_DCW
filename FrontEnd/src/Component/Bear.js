import React, { Component } from 'react';
import axios from 'axios'
import { getBears } from '../Actions/Bears'
import { connect } from 'react-redux'
import '../App.css'

const URL = 'http://localhost:8000/api/'

class Bear extends Component {

    constructor(props) {
        super(props)
        this.state = {
            bears: [],
            id: 0, name: '', weight: '',height:'',group:'',
            newid: 0, newname: 'GTfarng', newweight: 55, newheight:'170', newgroup:'A'
        }
    }

    componentDidMount() {
        //console.log('props',this.props)
        this.props.getBears()
    }

    renderBears = () => {
        if (this.props.bears) {
            return this.props.bears.map((bear, index) => {
                // console.log( bear.name)
                return (<li key={index}>
                    {bear.name} : {bear.weight} Kg. {bear.height} Cm. Group {bear.group}
                    &nbsp;&nbsp;<button onClick={() => this.getBear(index)}>GET</button>
                    &nbsp;&nbsp;<button onClick={() => this.deleteBear(index)}>DELETE</button>
                    &nbsp;&nbsp;<button onClick={() => this.getBear(index)}>EDIT</button>
                </li>
                )
            })
        }
    }

    deleteBear = (id) => {
        axios.delete(`${URL}/Bears/${id}`)
            .then((res) => {
                // console.log('Delete:' + res)
                this.props.getBears()
            })
    }

    addBear = (e) => {
        e.preventDefault()
        axios.post(`${URL}/Bears`, {
            name: this.state.name,
            weight: this.state.weight,
            height: this.state.height,
            group: this.state.group
        })
            .then((res) => {
                console.log('Create a new bear: ' + res);
                this.props.getBears()
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

    editBear = (e) => {
        e.preventDefault()
        axios.put(`${URL}/Bears/${this.state.newid}`, { name: this.state.newname, weight: this.state.newweight, height: this.state.newheight, group: this.state.newgroup })
            .then((response) => {
                console.log('Create a new bear: ' + response);
                this.props.getBears()
            })
    }


    getBear = (id) => {
        axios.get(`${URL}/Bears/${id}`)
            .then((res) => {
                // const {name} = res.data
                // console.log('res', res.data)
                this.setState({ newid: res.data.id, newname: res.data.name, newweight: res.data.weight,newheight: res.data.height,newgroup: res.data.group })
                //console.log('state', this.state)
            })
    }

    render() {
        return (
            <div style={{ margin: '20px' }}>

                <div class="card container">
                    <div class="card-body">

                        <h2>Add Bear</h2>
                        <form onSubmit={this.addBear}>
                            <br />
                            <input type="text" name="name" placeholder="Enter Name Bear" value={this.state.name} onChange={this.handleChange} />&nbsp;
                            <input type="number" name="weight" placeholder="Enter Weight Bear" value={this.state.weight} onChange={this.handleChange} />&nbsp;
                            <input type="number" name="height" placeholder="Enter Height Bear" value={this.state.height} onChange={this.handleChange} />&nbsp;
                            <input type="text" name="group" placeholder="Enter Group Bear" value={this.state.group} onChange={this.handleChange} />&nbsp;
                    <br />
                            <br />
                            <button>Submit</button>
                        </form>
                        <br />
                    </div>
                </div> <br />




                <div class="card container">
                    <div class="card-body">

                        <h2>Render Bear</h2><br />
                        <ul className="bullet-center">
                            {this.renderBears()}
                        </ul>
                        <br />
                    </div>
                </div> <br />



                <div class="card container">
                    <div class="card-body">
                        <h2>Get Bear</h2>
                       
                      ID : {this.state.newid}<br/>
                       Name : {this.state.newname}<br/>
                        Weight : {this.state.newweight} Kg.<br/> 
                        Height : {this.state.newheight} Cm.<br/>
                          Group : {this.state.newgroup}
                        <br />
                    </div>
                </div> <br />



                <div class="card container">
                    <div class="card-body">
                        <br />
                        <h2>Edit Bear</h2>
                        <form onSubmit={this.editBear}>
                            <br />
                          Name   : <input type="text" name="newname" placeholder="Edit Name Bear" value={this.state.newname} onChange={this.handleChangenew} />&nbsp;<br/>
                          Weight : <input type="number" name="newweight" placeholder="Edit Weight Bear" value={this.state.newweight} onChange={this.handleChangenew} />&nbsp;<br/>
                          Height : <input type="number" name="newheight" placeholder="Edit Height Bear" value={this.state.newheight} onChange={this.handleChangenew} />&nbsp;<br/>
                          Group  : <input type="text" name="newgroup" placeholder="Edit Group Bear" value={this.state.newgroup} onChange={this.handleChangenew} />&nbsp;<br/>
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

const mapStateToProps = ({ bears }) => {
    return { bears }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getBears: () => dispatch(getBears())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bear);