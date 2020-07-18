import React from "react";
import './playlists.css';

const PlaylistsText = (props) => {
  if (props.step >= 2 && props.trackCount) {
    return (
        <div>
            <h2>We found a total of</h2>
            <h1 className="selection-numbers">{props.trackCount}</h1>
            <h2>songs in your library in</h2>
            <h1 className="selection-numbers">{props.playlistCount}</h1>
            <h2>{props.playlistType}s</h2>
        </div>
    )
  } else if (props.step >= 2) {
      return (
        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      )
  } else {
      return <p>nothing to see here folks</p>
  }
};

export default PlaylistsText;