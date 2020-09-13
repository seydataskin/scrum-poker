import React, { useState } from "react";
import { Button, Form, Col, Container, Row, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { setLocalStorage } from "../../utils/localStorageUtils";
import { SESSION_ITEM_NAME, SESSION_NAME } from "../../constants/";
import "./style.css";

function AddStory() {
  var voteSession = {};
  localStorage.clear();
  const [sessionName, setSessionName] = useState("");
  const [voterCount, setVoterCount] = useState(0);
  const [info, setInfo] = useState("");
  const [stories, setStories] = useState("");
  const history = useHistory();

  const getStories = () => {
    var storyItems = stories.split("\n");
    voteSession.storyList = [{}];
    storyItems.map((item, i) => {
      var storyItem = {
        scrumMasterVote: 0,
        storyPoint: 0,
        status: false,
        isVoted: false,
        story: storyItems[i],
        voteList: [{}],
      };
      voteSession.storyList.push(storyItem);
    });
  };
  const startNewVotingSession = () => {
    var isVotesDone = false;

    if (voterCount !== 0 || voterCount !== "") {
      getStories();
      if (voteSession.storyList.length > 0 && voterCount > 0) {
        for (let i = 0; i < voteSession.storyList.length; i++) {
          voteSession.storyList[i].voteList = [];
          for (let j = 0; j < voterCount; j++) {
            let voterItem = {
              voter: j,
              point: 0,
            };
            voteSession.storyList[i].voteList.push(voterItem);
          }
        }
        voteSession.storyList[1].status = true;
      }
      isVotesDone = true;
    } else {
      isVotesDone = false;
      setInfo("Please fill number of voters");
    }

    if (sessionName !== "" && isVotesDone) {
      setLocalStorage(SESSION_NAME, sessionName);
      setLocalStorage(SESSION_ITEM_NAME, voteSession.storyList);

      history.push("/scrummaster");
    } else {
      setInfo("Enter Valid Inputs.");
    }
  };
  return (
    <div className="add-story">
      <Container>
        <h2>Scrum Poker</h2>
        <Row
          style={{
            display: info !== "" ? "block" : "none",
          }}
        >
          <Col>
            <Alert variant={"primary"}>{info}</Alert>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>Session Name</Form.Label>
            <Form.Control
              placeholder="Session Name"
              onChange={(e) => setSessionName(e.target.value)}
              maxLength={200}
            />
          </Col>
          <Col>
            <Form.Label>Number of voters</Form.Label>
            <Form.Control
              type="number"
              placeholder="Number of voters"
              onChange={(e) => setVoterCount(e.target.value)}
            />
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>
                Paste your story List (Each line will be converted as a story)
              </Form.Label>
              <Form.Control
                as="textarea"
                rows="10"
                onChange={(e) => setStories(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              className="button-start"
              onClick={startNewVotingSession.bind()}
            >
              Start Session
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AddStory;
