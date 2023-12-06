import React, { useState, useEffect } from "react";
import axios from "axios";
import TopNavbar from "../components/NavBar/Navbar";
import { format } from "date-fns";
import { Button } from "react-bootstrap";
import { BiSolidDownload } from "react-icons/bi";
import { BASE_URL } from "../services/helper";

const RegisteredData = () => {
  const [allData, setAllData] = useState([]);

  const getAllData = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/registration/get-Data`
      );
      if (data) {
        setAllData(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  const downloadResume = async (resumePath, userName) => {
    try {
      console.log("User Name:", userName);
      console.log("Path:", resumePath);

      const { data } = await axios.get(resumePath, {
        responseType: "blob",
      });

      console.log("Blob Data:", data);

      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${userName}_resume.docx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download Error:", error);
    }
  };

  return (
    <>
      <div>
        <TopNavbar />
        <div className="customer-page">
          <div className="table-responsive custom-shadow">
            <table className="table table-hover table-bordered mb-0">
              <thead className="table-head">
                <tr className="my-3">
                  <th>#</th>
                  <th>Name</th>
                  <th>Date Of Birth</th>
                  <th>Gender</th>
                  <th>Hobbies</th>
                  <th>State</th>
                  <th>Address</th>
                  <th className="text-center">Resume</th>
                </tr>
              </thead>
              <tbody>
                {allData.map((data, i) => (
                  <tr key={i} className="custom-shadow">
                    <td>{i + 1}</td>
                    <td style={{ minWidth: "120px" }}>{data.name}</td>
                    <td style={{ minWidth: "120px" }}>
                      {format(new Date(data.dateOfBirth), "dd-MM-yyyy")}
                    </td>

                    <td>{data.gender}</td>
                    <td>{data.hobbies.join(", ")}</td>
                    <td>{data.state}</td>
                    <td style={{ minWidth: "250px" }}>{data.address}</td>
                    <td className="text-center">
                      <Button
                        type="button"
                        className="btn bg-pink border-0"
                        style={{ width: "180px", fontSize: "12px" }}
                        onClick={() =>
                          downloadResume(
                            `http://localhost:3030/${data.resume}`,
                            data.name
                          )
                        }
                      >
                        {`${data.name}.docx`}
                        <span className="mx-2">
                          <BiSolidDownload />
                        </span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisteredData;
