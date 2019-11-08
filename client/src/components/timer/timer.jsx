import React from 'react';
import Countdown from 'react-countdown-now';

const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
        return (
            <div className="timer-container">
                <h1 className="auction-alert-text">This auction has ended</h1>
            </div>
        )
    } else {
        let minsShown = minutes;
        let secondsShown = seconds;
        if (minutes < 10){
            minsShown = `0${minutes}`
        }
        if (seconds < 10){
            secondsShown = `0${seconds}`
        }
        return (
            <div className="timer-container">
                <h1 className="auction-alert-text">Auction ends in:&nbsp;{hours}:{minsShown}:{secondsShown}</h1>
            </div>
        )
    }
}

class Timer extends React.Component {
   
    render(){
        let { date } = this.props
        let timestamp = parseInt(date);

        return (
            <Countdown 
                date={timestamp + 777600000}
                renderer={renderer}
            />
        )
    }
}

export default Timer;