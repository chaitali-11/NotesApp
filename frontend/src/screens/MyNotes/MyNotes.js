import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import {
  Button,
  Card,
  Badge,
  Accordion,
  AccordionHeader,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
//import axios from "axios";

function MyNotes({ history, search }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const noteList = useSelector((state) => state.noteList);
  const { loading, error, notes } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
  }, [
    userInfo,
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  return (
    <MainScreen title={`Welcome Back ${userInfo && userInfo.name}..`}>
      {console.log(notes)}
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create new Note
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {notes &&
        notes
          // .filter((filteredNote) =>
          //  filteredNote.title.toLowerCase().includes(search.toLowerCase())
          // )
          .reverse()
          .map((note) => (
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>{note.title}</Accordion.Header>
                <Accordion.Body>
                  <Card style={{ margin: 10 }}>
                    <Card.Header style={{ display: "flex" }}>
                      <div>
                        <Button href={`/note/${note._id}`}>Edit</Button>
                        <Button
                          variant="danger"
                          className="mx-2"
                          onClick={() => deleteHandler(note._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <h4>
                          <Badge variant="success">Category </Badge>
                        </h4>

                        <blockquote className="blockquote mb-0">
                          <ReactMarkdown>{note.content}</ReactMarkdown>
                          <footer className="blockquote-footer">
                            Created on{" "}
                            <cite title="Source Title">
                              {note.createdAt.substring(0, 10)}
                            </cite>
                          </footer>
                        </blockquote>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))}
    </MainScreen>
  );
}

export default MyNotes;
