import React from "react";
import { Media } from "reactstrap";
import { Item } from "./";
import InfiniteScroll from "react-infinite-scroller";

export function ItemList(props) {
  const { items, comments, handleLoad, hasMore } = props;
  // Load more items as we scroll down.
  return (
    <InfiniteScroll pageStart={0} loadMore={handleLoad} hasMore={hasMore}>
      <Media list>
        {items.map(item => (
          <Item
            item={item}
            key={item.contentId}
            numComments={comments[item.contentId]}
          />
        ))}
      </Media>
    </InfiniteScroll>
  );
}
