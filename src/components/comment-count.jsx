import React from "react";
import { useSpring, animated } from "react-spring";
export function CommentCount({ count }) {
  // When the comment count is loaded later, we animate the div by increasing opacity.
  const props = useSpring({ opacity: count ? 1 : 0 });
  return <animated.span style={props}>{count}</animated.span>;
}
