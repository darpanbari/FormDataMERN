import React, { useState } from "react";
import TopNavbar from "../components/NavBar/Navbar";
import { Form, Button, Col, Row, Container, InputGroup } from "react-bootstrap";
import axios from "axios";

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);

  const [hobbiesWarning, setHobbiesWarning] = useState(false);

  const handleHobbiesChange = (e) => {
    const { value } = e.target;

    const updatedHobbies = hobbies.includes(value)
      ? hobbies.filter((hobby) => hobby !== value)
      : [...hobbies, value];

    setHobbiesWarning(updatedHobbies.length < 2);

    setHobbies(updatedHobbies);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (hobbies.length < 2) {
      setHobbiesWarning(true);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", name);
      formDataToSend.append("dateOfBirth", dateOfBirth);
      formDataToSend.append("gender", gender);
      formDataToSend.append("hobbies", hobbies.join(","));
      formDataToSend.append("state", state);
      formDataToSend.append("address", address);
      formDataToSend.append("resume", resume);

      await axios.post(
        "http://localhost:3030/registration/register",
        formDataToSend
      );

      // Reset form fields
      setName("");
      setDateOfBirth("");
      setGender("");
      setHobbies([]);
      setState("");
      setAddress("");
      setResume(null);

      setHobbiesWarning(false);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting form");
    }
  };

  const resetFormFields = () => {
    setName("");
    setDateOfBirth("");
    setGender("");
    setHobbies([]);
    setState("");
    setAddress("");
    setResume(null);
  };

  const handleCancel = () => {
    resetFormFields();
  };

  return (
    <>
      <TopNavbar />

      <div
        className=" d-flex justify-content-center align-items-center "
        style={{ margin: "70px 0px" }}
      >
        <div
          className="card mx-2 px-5 py-4 custom-shadow border-0"
          style={{ width: "800px" }}
        >
          <Container className="mb-5">
            <h4 className="card-title text-center my-4 text-pink">
              REGISTARTION
            </h4>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Date of Birth:</Form.Label>
                    <Form.Control
                      type="date"
                      name="dateOfBirth"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      placeholder="YYYY-MM-DD"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Gender:</Form.Label>
                    <div className="d-flex">
                      {["Male", "Female"].map((option) => (
                        <Form.Check
                          key={option}
                          type="radio"
                          label={option}
                          name="gender"
                          value={option}
                          checked={gender === option}
                          onChange={(e) => setGender(e.target.value)}
                          className="me-3 fw-lighter"
                          style={{ fontWeight: "light" }}
                        />
                      ))}
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Hobbies:</Form.Label>
                    <div className="d-flex">
                      {["Reading", "Coding", "Gaming"].map((hobby) => (
                        <Form.Check
                          key={hobby}
                          type="checkbox"
                          label={hobby}
                          value={hobby}
                          checked={hobbies.includes(hobby)}
                          onChange={handleHobbiesChange}
                          className="me-3 fw-lighter"
                          style={{ fontWeight: "light" }}
                        />
                      ))}
                    </div>

                    <div>
                      {hobbiesWarning && (
                        <div style={{ color: "red", marginTop: "5px" }}>
                          Please select at least two hobbies.
                        </div>
                      )}
                    </div>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>State:</Form.Label>
                    <Form.Select
                      name="state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Karnataka">Karnataka</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Address:</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter your address here..."
                      rows={4}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Resume (docx only):</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="file"
                        accept=".docx"
                        onChange={(e) => setResume(e.target.files[0])}
                        required
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Button
                    type="submit"
                    className="btn bg-pink w-100 border-0 mb-2"
                  >
                    Submit
                  </Button>
                </Col>
                <Col md={6}>
                <Button
            type="button"
            className="btn bg-gray w-100 border-0 mb-2"
            onClick={handleCancel}
          >
            Cancel
          </Button>
                </Col>
              </Row>
            </Form>
          </Container>
        </div>
      </div>
    </>
  );
};

export default RegistrationForm;