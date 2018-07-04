import { Component } from 'react'
// import $ from 'jquery'


class SectionSale extends Component {
  componentDidMount () {
    // function makeTimer() {

    //   var endTime = new Date("29 April 2018 9:56:00 GMT+01:00");
    //   endTime = (Date.parse(endTime) / 1000);

    //   var now = new Date();
    //   now = (Date.parse(now) / 1000);

    //   var timeLeft = endTime - now;

    //   var days = Math.floor(timeLeft / 86400);
    //   var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
    //   var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
    //   var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

    //   if (hours < "10") { hours = "0" + hours; }
    //   if (minutes < "10") { minutes = "0" + minutes; }
    //   if (seconds < "10") { seconds = "0" + seconds; }

    //   $("#days").html(days + '<span style="font-size: 15px; font-weight: 500;">Days</span>');
    //   $("#hours").html(hours + '<span style="font-size: 15px; font-weight: 500;">Hours</span>');
    //   $("#minutes").html(minutes + '<span style="font-size: 15px; font-weight: 500;">Minutes</span>');
    //   $("#seconds").html(seconds + '<span style="font-size: 15px; font-weight: 500;">Seconds</span>');


    // }

    // this.itv = setInterval(function() { makeTimer(); }, 1000);
  }

  // componentWillUnmount() {
  //   clearInterval(this.itv)
  // }

  render () {
    return (
      <section className="zg-sale is-flex">
        <div className="zg-sale-section zg-sale--count-down is-vertical-flex is-flex__center is-flex-1">
          <div className="zg-sale-section__inner is-vertical-flex">
            <h1>HOT DEALS THIS WEEK</h1>
            <p>On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized</p>
            <div id="timer" style={style.clock}>
              <div id="days" style={style.clockSection}></div>
              <div id="hours" style={style.clockSection}></div>
              <div id="minutes" style={style.clockSection}></div>
              <div id="seconds" style={style.clockSection}></div>
            </div>
            <a href="#">SHOW NOW</a>
          </div>
        </div>

        <div className="zg-sale-section zg-sale--discount">
          <div>
            <h3 className="zg-sale--title">sale up 50%</h3>
            <img src="/static/images/selling_Img.png" />
          </div>
          <div>
            <h3>FRITZ HANSEN BLUE SOFA</h3>
            <p>There are many variations of passages of Lorem</p>
          </div>
          <div className="zg-sale--carousel is-flex is-flex__space-around is-padding-20">
            <a href="#" className="hover-device">
              <img src="/static/images/19-150x150.jpg"/> <h4>Blue Wing chair</h4>
            </a>
            <a href="#" className="hover-device">
              <img src="/static/images/12-150x150.jpg"/> <h4>Blue Wing chair</h4>
            </a>
            <a href="#" className="hover-device">
              <img src="/static/images/6-150x150.jpg"/> <h4>Blue Wing chair</h4>
            </a>
            <a href="#" className="hover-device">
              <img src="/static/images/4-150x150.jpg"/> <h4>Blue Wing chair</h4>
            </a>
          </div>
        </div>
      </section>
    )
  }
}

const style = {
  clock: { display: 'flex' },
  clockSection: {
    backgroundColor: '#fff', padding: '10px', margin: '15px', height: 90,
    color: '#4b6aa6', display: 'flex', flexDirection: 'column',
    fontSize: 35, width: 90, fontWeight: '800', borderRadius: '6px' }
}

export default SectionSale