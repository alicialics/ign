import React from "react";
import { FaPlayCircle } from "react-icons/fa";
import ms from "ms";

function getDisplayDuration(duration) {
  // Hour long video...
  if (duration >= 3600) {
    return ms(duration * 1000);
  }

  // Convert to date string and take the last portion.
  const durationStr = new Date(duration * 1000).toISOString().substr(14, 5);
  // If time is under 10 minutes, don't show the leading 0.
  return durationStr[0] === "0" ? durationStr.substr(1) : durationStr;
}

export function VideoDuration(props) {
  const { duration } = props;
  if (!duration) {
    return null;
  }

  return (
    <div className="video-counter text-white bg-primary pl-2 pt-2 pr-2">
      <h4 class="alert-heading">
        <FaPlayCircle className="mr-2" />
        {getDisplayDuration(duration)}
      </h4>
    </div>
  );
}
