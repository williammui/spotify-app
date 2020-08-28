import React from "react";

const Step2Text = (props) => {
  if (props.step === 1) {
      return <div></div>
  } else if (props.step === 2 && props.loading) {
      return (
          <div className="center">
              <h3 className="text">Organizing your library...</h3>
              <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
          </div>
      )
  } else if (props.error) {
      return <div className="h3">Classify was unable to access your music library.</div>
  } else {
      return (
          <div>
              <h3 className="text">We found a total of <span className="subtitle-med">{props.trackCount}</span><span className="text">   tracks in   </span><span className="subtitle-med">{props.playlistCount}</span> {props.playlistType}s in your library.</h3>
              <h3 className="text" style={{marginTop: "0.2em"}}>Click to add and preview.</h3>
          </div>
      )
   }
};

export default Step2Text;