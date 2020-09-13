import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table, Alert } from "react-bootstrap";
import "./style.css";
import {
  setLocalStorage,
  getLocalStorage,
} from "../../utils/localStorageUtils";
import { SESSION_ITEM_NAME, POINT_LIST, SESSION_NAME } from "../../constants/";

function Developer() {
  let voteSession = {};
  let votedCount = 0;
  const [info, setInfo] = useState("");
  const [stories, setStories] = useState([]);
  const [sessionName, setSessionName] = useState("");

  useEffect(() => {
    function initialize() {
      setInterval(function () {
        getStoriesFromLocalStorage();
      }, 2000);
    }
    function getStoriesFromLocalStorage() {
      setSessionName(getLocalStorage(SESSION_NAME));
      let retrievedObject = getLocalStorage(SESSION_ITEM_NAME);

      if (retrievedObject != null) {
        voteSession = retrievedObject;
        setStories(voteSession);
      }
    }
    getStoriesFromLocalStorage();
    initialize();
  }, []);

  function vote(item) {
    for (var i = 1; i < stories.length; i++) {
      for (var j = 0; j < stories[i].voteList.length; j++) {
        if (stories[i].status && votedCount !== 1) {
          if (stories[i].voteList[j].point === 0) {
            stories[i].voteList[j].point = item;

            setLocalStorage(SESSION_ITEM_NAME, stories);

            setInfo("Story " + i + " voted with " + item + " point thanks!");
            votedCount = 1;
            break;
          } else setInfo("Waiting for scrum master vote");
        }
      }
    }
  }

  return (
    <React.Fragment>
      <Container>
        <h2>Scrum Master</h2>
        <h3>{sessionName} Session Stories</h3>
        <br />
        <Row
          style={{
            display: info !== "" ? "block" : "none",
          }}
        >
          <Col>
            <Alert show={info !== ""} variant={"primary"}>
              {info}
            </Alert>
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col className="sections">
            <Table bordered>
              <thead>
                <tr>
                  <th>Story</th>
                  <th>Point</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {stories &&
                  stories.map(function (item, i) {
                    if (item.story) {
                      return [
                        <tr key={i}>
                          <td>{item.story}</td>
                          <td>{item.storyPoint}</td>
                          <td>
                            {item.status && item.scrumMasterVote !== 0
                              ? "Voted"
                              : item.status
                              ? "Active"
                              : "Not Voted"}
                          </td>
                        </tr>,
                      ];
                    }
                    return null;
                  })}
              </tbody>
            </Table>
          </Col>
          <Col className="sections">
            <div className="points-section">
              {POINT_LIST.map(function (item, i) {
                return [
                  <div
                    className="points"
                    key={i}
                    onClick={vote.bind(this, item)}
                  >
                    {item}
                  </div>,
                ];
              })}
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default Developer;
