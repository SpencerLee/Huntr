var React     = require('react');
var ReactDOM  = require('react-dom');
var PropTypes = React.PropTypes;
var Store     = require('../data/store');
var Glassdoor = require('../api/request/glassdoorRequest');

var JobDetails    = React.createClass({
  render: function() {
    return (
      <div>
        <div className="popupWhite" onClick={this.onBackGroundClick}>
        </div>
        <div className="jobDetails">
          <div className="mainSection">
            <div className="jobHeader">
              <div className="floatLeft">
                <img className="jobLogo" src={this.props.job.company.logoUrl}/>
              </div>
              <div className="floatLeft" style={{marginLeft:18}}>
                <p className="semiBold xxlargeSize" style={{margin:0,padding:0}}>{this.props.job.company.name}</p>
                <p className="smallSize regular" style={{margin:0,padding:0, opacity: 0.4}}>{this.props.job.jobTitle}</p>
              </div>
            </div>
            <div className="jobTags"></div>
            <div className="jobTimeline">

            </div>
          </div>
          <div className="sideBar">
            <div className="jobPeople">
              <p className="semiBold smallSize">People</p>
              <ul>
                <li>Grace</li>
                <li>Nicole</li>
                <li>Sam</li>
              </ul>
            </div>
            <div className="jobGlassdoorStats">
              <p className="semiBold smallSize">Glassdoor Stats</p>
              <ul>
                <li>Rating: 5.0/5.0</li>
                <li>CEO Approval: 5.0/5.0</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    );
  },
  onBackGroundClick: function() {
    Store.setViewingJob(false,null);
  },
});

module.exports = JobDetails;