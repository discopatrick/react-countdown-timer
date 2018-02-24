import React from 'react'

class CountDownTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsToCount: 30
    }
    this.handleChangeSeconds = this.handleChangeSeconds.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  handleChangeSeconds(event) {
    this.setState({
      secondsToCount: parseInt(event.target.value)
    });
  }

  startTimer(event) {
    let endDate = new Date();
    endDate.setSeconds(endDate.getSeconds() + this.state.secondsToCount);
    this.end = endDate;
    this.setState({
      secondsUntilEnd: (this.end - new Date()) / 1000
    })
    this.startTick()
  }

  startTick(event) {
    this.stopTick()  // clear any existing timer
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  tick() {
    let secondsLeft = Math.round((this.end - new Date()) / 1000)
    if (secondsLeft <= 0) {
      this.stopTick();
    }
    this.setState({
      secondsUntilEnd: secondsLeft
    });
  }

  stopTick(event) {
    clearInterval(this.timerID);
  }

  componentWillUnmount() {
    this.stopTick();
  }

  render() {
    return (
      <div>
        <h1>Countdown Timer</h1>
        <div>
          Seconds: <input value={this.state.secondsToCount} onChange={this.handleChangeSeconds} />
          <input type="button" value="Start" onClick={this.startTimer} />
        </div>
        <div>
        { this.state.secondsUntilEnd > 0 ? (
          <span>Seconds left: { this.state.secondsUntilEnd }</span>
        ) : (
          <span>Timer stopped.</span>
        ) }
        </div>
      </div>
    )
  }
}

export default CountDownTimer;
