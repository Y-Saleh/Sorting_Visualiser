import React from 'react'
import './sortingViz.css'

const PRIMARY_COLOR = 'turquoise';
// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';


export default class SortingViz extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };

  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i<150; i++) {
      array.push(randomIntervalInt(5,1000));

    }
    this.setState({array});
  }


  render() {
    const {array}  = this.state;

    return(
      <div className='array-container'>
        {array.map((value, idx) => (
          <div  className="array-bar"
          key={idx}
          style={{
            backgroundColor: PRIMARY_COLOR,
            height: `${value}px`,}}></div>
        ))}


      </div>


    );  
  }

}


function randomIntervalInt(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min)
}

