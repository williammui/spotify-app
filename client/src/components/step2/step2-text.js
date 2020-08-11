import React from "react";

const Step2Text = (props) => {
  if (props.step == 1) {
      return <div></div>
  } else if (props.step == 2 && props.loading) {
      return (
          <div className="center">
              <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
          </div>
      )
  } else {
      return (
          <div>
              <h3 className="text">We found a total of</h3>
              <h3 className="subtitle med"><span className="subtitle med">{props.trackCount}</span><span className="text">   tracks in   </span><span className="subtitle med">{props.playlistCount}</span></h3>
              <h3 className="text">{props.playlistType}s in your library.</h3>
          </div>
      )
   }
};

export default Step2Text;