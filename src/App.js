import React, { useState, useEffect, useMemo } from 'react';
import { SideBar, ItemList } from "./components";
import { Container, Row, Col } from 'reactstrap';
import { LATEST } from "./constants";
import { filterItems, loadItems, loadComments } from "./api";
import "./App.css"

function App() {
  const [mode, setMode] = useState(LATEST);
  const [items, setItems] = useState([]);
  const [comments, setComments] = useState({});
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setHasMore(false);
      const data = await loadItems(page);
      if (data.length) {
        // Merge items and comments to our store.
        setItems(items => items.concat(data).sort((item1, item2) => item1.metadata.publishDate > item2.metadata.pubhlishDate));
        setHasMore(true);
        const content = await loadComments(data.map(({ contentId }) => contentId));
        setComments(comments => Object.assign({}, comments, ...content.map(({ id, count }) => ({ [id]: count }))));
      } else {
        // API returned no new items, stop paging.
        setHasMore(false);
      }
    }

    fetchData();
  }, [page]);

  const filteredItems = useMemo(() => filterItems(items, mode), [items, mode]);

  return <Container>
    <Row>
      <h1 className="display-4">Latest News</h1>
    </Row>
    <hr />
    <Row>
      <Col xs="6" sm="4"><SideBar activeMode={mode} onChange={setMode} /></Col>
      <Col xs="12" sm="8"> <ItemList items={filteredItems} comments={comments} handleLoad={setPage} hasMore={hasMore} /></Col>
    </Row>
  </Container>;
}

export default App;
