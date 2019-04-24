import React, {Component} from 'react';
import { connect } from 'react-redux'

import {add,minus,add2,reset} from '../Actions/Counter'
import {store} from '../App'

class Count extends Component {
   render() {
       return (
               <div style={{margin: '20px'}}>
              <h2>Render Counter</h2>
                 <h4>  Counter: {this.props.number}</h4> <br/> 
                   <button onClick={ this.props.add}>Up</button>
                   <button onClick={ this.props.minus}>Down</button>
                   <button onClick={ this.props.reset}>Reset</button>
                   <button onClick={() => store.dispatch(add2(2))}>Up+2</button>
                   <button onClick={() => store.dispatch(add2(-2))}>Down-2</button>

               </div>
       );
   }
}

const mapStateToProps = (state) => {
   return { number: state.number }
}

const mapDispatchToProps = (dispatch) => {
   return {
       add : ()=>dispatch(add()),
       minus: ()=> dispatch(minus()),
       reset: ()=> dispatch(reset())
   }
}

export default connect(mapStateToProps,mapDispatchToProps)(Count);