import React, { useState } from "react";
import { Col, Container, Row, Table, Alert } from "react-bootstrap";
import { getLocalStorage } from "../../utils/localStorageUtils";

function Done() {
  const [stories] = useState(() => getLocalStorage("voteSessionItem"));
  const [sessionName] = useState(() => getLocalStorage("sessionName"));
  return (
    <div>
      <Container>
        <h2>Stories Finished!</h2>
        <br />
        <Row>
          <Col>
            <Alert variant={"primary"}>
              {sessionName} Session All Stories Completed- Well Done! :)
            </Alert>
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col>
            <Table bordered>
              <thead>
                <tr>
                  <th>Story</th>
                  <th>Point</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {stories !== undefined
                  ? stories.map((item, i) => {
                      if (item.story !== undefined) {
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
                    })
                  : ""}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Done;
