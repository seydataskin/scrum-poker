import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Col,
  Container,
  Row,
  Table,
  Alert,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import {
  setLocalStorage,
  getLocalStorage,
} from "../../utils/localStorageUtils";
import { SESSION_ITEM_NAME, DEVELOPER_URL, POINT_LIST } from "../../constants/";

import "./style.css";

function ScrumMaster() {
  var voteSession = {};
  const history = useHistory();

  //Properties to use in component
  const [showScrumMaster, setShowScrumMaster] = useState(false);
  const [scrumMasterPoint, setScrumMasterPoint] = useState(0);
  const [scrumMasterVote, setScrumMasterVote] = useState(0);
  const [info, setInfo] = useState("");

  //Get from localstorage these two property
  const [stories, setStories] = useState([]);
  const [sessionName, setSessionName] = useState("");
  //

  //Update stories and vote status each 2 second.
  useEffect(() => {
    function initialize() {
      setInterval(function () {
        var retrievedObject = getLocalStorage(SESSION_ITEM_NAME);
        if (retrievedObject != null) {
          voteSession = retrievedObject;
          setStories(voteSession);
        }
      }, 2000);
    }
    function getStoriesFromLocalStorage() {
      setSessionName(getLocalStorage("sessionName"));
      let retrievedObject = getLocalStorage(SESSION_ITEM_NAME);

      if (retrievedObject != null) {
        voteSession = retrievedObject;
        setStories(voteSession);
      }
    }
    getStoriesFromLocalStorage();
    initialize();
  }, []);
  //

  //Voter status and final score section
  const getVoteListItems = () => {
    var items = [];
    for (var i = 1; i < stories.length; i++) {
      if (stories[i].status) {
        for (var j = 0; j < stories[i].voteList.length; j++) {
          if (stories[i].storyPoint === 0) {
            items.push(
              <tr key={j}>
                <td>Voter : {stories[i].voteList[j].voter + 1}</td>
                <td>
                  {stories[i].voteList[j].point > 0
                    ? stories[i].voteList[j].point
                    : "Not voted"}
                </td>
              </tr>
            );
          }
        }
      }
    }
    return items;
  };
  //

  //Give vote for story
  const voteStory = (voteItem) => {
    let isWaitingForDevelopers = false;

    for (var i = 1; i < stories.length; i++) {
      for (var j = 0; j < stories[i].voteList.length; j++) {
        if (stories[i].status && stories[i].voteList[j].point === 0) {
          isWaitingForDevelopers = true;
          setInfo("Wait for developers vote.");
          break;
        } else {
          setInfo("Please vote now");
          isWaitingForDevelopers = false;
        }
      }
      if (isWaitingForDevelopers === true) break;
    }

    if (!isWaitingForDevelopers) {
      stories.map((item, i) => {
        if (item.status) {
          if (item.scrumMasterVote === 0) {
            item.scrumMasterVote = voteItem;
            setScrumMasterVote(voteItem);
            setShowScrumMaster(true);
            setInfo("You can enter final score now.!");

            //clear localstorage set again items
            setLocalStorage(SESSION_ITEM_NAME, stories);
          } else {
            if (item.storyPoint === 0) {
              setShowScrumMaster(true);
            }
          }
        }
      });
    }
  };
  const enterFinalScoreAndFinishVoting = () => {
    stories.map((item, i) => {
      if (
        item.status &&
        item.scrumMasterVote !== 0 &&
        scrumMasterPoint !== 0 &&
        !item.isVoted
      ) {
        item.storyPoint = scrumMasterPoint;
        item.status = true;
        item.isVoted = true;
        if (i !== stories.length - 1) stories[i + 1].status = true;

        setLocalStorage(SESSION_ITEM_NAME, stories);

        setInfo("Started new story voting");
        setShowScrumMaster(false);
        setScrumMasterVote(0);
      }
    });
    setScrumMasterPoint(0);
  };
  return (
    <div>
      <Container>
        <h2>Scrum Master </h2>
        <h3>{sessionName} Session Stories</h3>
        <br />
        <Row style={{ textAlign: "left" }}>
          <Col>
            <Alert variant={"success"}>
              Send url to developers :
              <a href={DEVELOPER_URL}>{DEVELOPER_URL}</a>
            </Alert>
          </Col>
        </Row>
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
        <Row>
          <Col className="sections">
            <Table>
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
                            {item.status && item.storyPoint !== 0
                              ? "Voted"
                              : item.status && item.storyPoint === 0
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
            {POINT_LIST.map(function (item, i) {
              return [
                <div
                  className="points"
                  key={i}
                  onClick={voteStory.bind(this, item)}
                >
                  {item}
                </div>,
              ];
            })}
          </Col>
          <Col className="sections">
            <div>
              <Table>
                <thead>
                  <tr>
                    <th>Voters</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {getVoteListItems()}
                  <tr>
                    <td>Scrum Master Vote</td>
                    <td>
                      {scrumMasterVote === 0 ||
                      scrumMasterVote === undefined ||
                      scrumMasterVote === ""
                        ? "Not Voted"
                        : scrumMasterVote}
                    </td>
                  </tr>
                </tbody>
              </Table>
              <p></p>
              <div
                style={{
                  display: showScrumMaster ? "block" : "none",
                }}
              >
                <Form.Control
                  placeholder="Final Score"
                  value={scrumMasterPoint}
                  onChange={(e) => setScrumMasterPoint(e.target.value)}
                />
                <br></br>
                <Button
                  className="button-start"
                  onClick={enterFinalScoreAndFinishVoting.bind()}
                >
                  End Voting
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ScrumMaster;
