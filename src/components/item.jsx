import React from "react";
import { Media } from "reactstrap";
import { FaRegComment } from "react-icons/fa";
import { CommentCount, VideoDuration } from "./";
import ms from "ms";

export function Item(props) {
  const {
    item: {
      metadata: { headline, title, publishDate, duration },
      thumbnails
    },
    numComments
  } = props;
  return (
    <div>
      <Media>
        <Media left>
          <Media className="mr-5 img-fluid" object src={thumbnails[0].url} />
          <VideoDuration duration={duration} />
        </Media>
        <Media body>
          <div className="text-primary">
            {ms(new Date().getTime() - new Date(publishDate).getTime())} &ndash;
            <FaRegComment className="m-1" />
            <CommentCount count={numComments} />
          </div>
          <Media heading>{headline || title}</Media>
        </Media>
      </Media>
      <hr />
    </div>
  );
}
