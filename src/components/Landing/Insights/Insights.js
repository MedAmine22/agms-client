import React, { useEffect, useState } from "react";
import CountUp from "react-countup";

function Insights() {
  const [startCounter, setStartCounter] = useState(false);

  const handleWaypointEnter = () => {
    setStartCounter(true);
  };
  useEffect(() => {
    handleWaypointEnter();
  }, []);
  return (
    <div className="row g-5">
      <div className="col-md-6 col-xl-3 wow fadeIn" data-wow-delay="0.1s">
        <div className="text-center border p-5">
          <i className="fa fa-certificate fa-3x text-white mb-3"></i>
          <h1 className="display-2 text-primary mb-0" data-toggle="counter-up">
            {startCounter && <CountUp end={25} duration={5} />}
          </h1>
          <span className="fs-5 fw-semi-bold text-white">Years Experience</span>
        </div>
      </div>
      <div className="col-md-6 col-xl-3 wow fadeIn" data-wow-delay="0.3s">
        <div className="text-center border p-5">
          <i className="fa fa-users-cog fa-3x text-white mb-3"></i>
          <h1 className="display-2 text-primary mb-0" data-toggle="counter-up">
            {startCounter && <CountUp end={135} duration={5} />}
          </h1>
          <span className="fs-5 fw-semi-bold text-white">Team Members</span>
        </div>
      </div>
      <div className="col-md-6 col-xl-3 wow fadeIn" data-wow-delay="0.5s">
        <div className="text-center border p-5">
          <i className="fa fa-users fa-3x text-white mb-3"></i>
          <h1 className="display-2 text-primary mb-0" data-toggle="counter-up">
            {startCounter && <CountUp end={957} duration={5} />}
          </h1>
          <span className="fs-5 fw-semi-bold text-white">Happy Clients</span>
        </div>
      </div>
      <div className="col-md-6 col-xl-3 wow fadeIn" data-wow-delay="0.7s">
        <div className="text-center border p-5">
          <i className="fa fa-check-double fa-3x text-white mb-3"></i>
          <h1 className="display-2 text-primary mb-0" data-toggle="counter-up">
            {startCounter && <CountUp end={1839} duration={5} />}
          </h1>
          <span className="fs-5 fw-semi-bold text-white">Projects Done</span>
        </div>
      </div>
    </div>
  );
}

export default Insights;
