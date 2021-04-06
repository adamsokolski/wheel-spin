import React, { Component } from 'react'
import './App.css'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      prize: '-',
      prizes: '',
      sum: 0,
      count: [
    ['Car', 0],
    ['50000', 0],
    ['20000', 0],
    ['10000', 0],
    ['5000', 0],
    ['2000', 0],
    ['1000', 0],
    ['Lose', 0],
    ['All', 0],
    ],
    listItems: '',
    }
    this.handleClick = this.handleClick.bind(this)
    this.randomNumber = this.randomNumber.bind(this)
    this.test = this.test.bind(this)
  }
  handleClick() {
    const data = [
    ['Car', 1],
    ['50000', 10],
    ['20000', 25],
    ['10000', 50],
    ['5000', 100],
    ['2000', 250],
    ['1000', 500],
    ['Lose', 7000]
    ];
    let prize = this.randomNumber(data)
    if (!isNaN(parseInt(prize))) {
      this.setState(state => ({
        sum: state.sum + parseInt(prize)
      }))
    } else if (prize === 'Lose') {
      this.setState(state => ({
        sum: state.sum - 500
      }))
    } else if (prize === 'Car') {
      this.setState(state => ({
        sum: state.sum + 500000
      }))
    }


    let arr = [...this.state.count]
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i][0] === prize) {
        arr[i][1]++
        arr[8][1]++
      }
    }
    const listItems = this.state.count.map((item) =>  <li>{item[0] + ': ' + item[1]}</li>);
   
    this.setState((state) => ({
      prize: prize,
      prizes: state.prizes + prize + ', ',
      count: arr,
      listItems: listItems
    }))

    
  }

  

  test() {
    setInterval(() => {
      this.handleClick()
    }, 2);
  }

  randomNumber(data) {
    let total = 0;
    for (let i = 0; i < data.length; ++i) {
        total += data[i][1];
    }
    const threshold = Math.random() * total;

    total = 0;
    for (let i = 0; i < data.length - 1; ++i) {
        total += data[i][1];
        if (total >= threshold) {
            return data[i][0];
        }
    }
    return data[data.length - 1][0];
  }

  render() {
    return (
      <div onClick={this.test} className='App'>
        <p>{this.state.prize}</p>
        <p className={this.state.sum > 0 ? 'plus' : 'negative'}>{this.state.sum}</p>
        <ul>{this.state.listItems}</ul>
      </div>
    )
  }
}
