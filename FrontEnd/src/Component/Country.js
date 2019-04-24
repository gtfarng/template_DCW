import React, {Component} from 'react';
import axios from 'axios'
import {getCountries} from '../Actions/Countries'
import { connect } from 'react-redux'
import '../App.css'

const URL = 'http://localhost:8000/api/'

class Country extends Component {

    constructor(props) {
        super(props)
        this.state = {
            countries: [],
            id: 0, name: '',
            newid: 0, 
        }
    }

   componentDidMount() {
      // console.log('props',this.props)
       this.props.getCountries()
   }

   renderCountries = () => {
       if (this.props.countries) {
           return this.props.countries.map( (country, index) => {
             //  console.log( country.name)
               return (<li key={index}> {country.name}         &nbsp;&nbsp;<button onClick={() => this.getCountry(index)}>GET</button>&nbsp;&nbsp;<button onClick={() => this.deleteCountry(index)}>DELETE</button> </li>
           )})
       }
   }

   deleteCountry = (id) => {
    axios.delete(`${URL}/Countries/${id}`)
        .then((res) => {
            // console.log('Delete:' + res)
            this.props.getCountries()
        })
}

addCountry = (e) => {
    e.preventDefault()
    axios.post(`${URL}/Countries`, {
        name: this.state.name
    })
        .then((res) => {
            console.log('Create a new Country: ' + res);
            this.props.getCountries()
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

editCountry = (e) => {
    e.preventDefault()
    axios.put(`${URL}/Countries/${this.state.newid}`, { name: this.state.newname })
        .then((response) => {
            console.log('Create a new Country: ' + response);
            this.props.getCountries()
        })
}


getCountry = (id) => {
    axios.get(`${URL}/Countries/${id}`)
        .then((res) => {
            // const {name} = res.data
            // console.log('res', res.data)
            this.setState({ newid: res.data.id, newname: res.data.name })
            //console.log('state', this.state)
        })
}


   render() {
       return (
           <div style={{margin: '20px'}}>
               <h2>Render Countries</h2>
               <ul className="bullet-center">
                   {this.renderCountries()}
               </ul>

               <h2>Add Country</h2>
                        <form onSubmit={this.addCountry}>
                            <br />
                            <input type="text" name="name" placeholder="Enter Country" value={this.state.name} onChange={this.handleChange} />&nbsp;
                 
                    
                            <button>Submit</button>
                        </form>
                        <br />

                        <h2>Edit Country</h2>
                        <form onSubmit={this.editCountry}>
                            <br />
                            <input type="text" name="newname" placeholder="Edit  Country" value={this.state.newname} onChange={this.handleChangenew} />&nbsp;
                    
                   
                            <button>UPDATE</button>
                        </form>
                        <br />


           </div>
       );
   }
}

const mapStateToProps =  ({countries}) => {
   return {countries}
}

const mapDispatchToProps = (dispatch) => {
   return {
    getCountries: () => dispatch(getCountries())
   }
}

export default connect(mapStateToProps,mapDispatchToProps)(Country);