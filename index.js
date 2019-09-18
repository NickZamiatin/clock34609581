import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import Input from './components/Input'
import Button from './components/Button'
import Clockdown from './components/Clockdown'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      running: false,
    }
  }
  
  componentDidUpdate(prevProps, prevState) {
    if(this.state.running !== prevState.running){
      switch(this.state.running) {
        case true:
          this.handleStart();
      }
    }
  }
  
  handleStart() {
    this.timer = setInterval(() => {
      const newCount = this.state.count - 1;
      this.setState(
        {count: newCount >= 0 ? newCount : 0}
      );
    }, 1000);
  }
  
  handleStop() {
    if(this.timer) {
      clearInterval(this.timer);
      this.setState(
        {running:false}
      );
    }
  }
  
  handleReset() {
    this.setState(
      {count: 0}
    );
  }
  
  handleCountdown(seconds) {
    this.setState({
      count: seconds,
      running: true
    })
  }
  
  render() {
    const {count} = this.state;
    return (
      <div className="container">
        <h2>Wellcome to the Walmart challenge</h2>
        <h1> Clock down</h1>
        <Clockdown time={count}/>
        <Input onSetCountdown={this.handleCountdown.bind(this)}/>
        <Button label="stop" onClickHandler={this.handleStop.bind(this)}/>
        <Button label="reset" onClickHandler={this.handleReset.bind(this)}/>
      </div>
    )
  }
}
 

render(<App />, document.getElementById('root'));
