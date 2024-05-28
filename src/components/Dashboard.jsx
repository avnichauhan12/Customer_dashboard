import React, { useState } from "react";
import studentData from "../models/Userdata";
import "./Dashboard.css";
import first from "../assets/first.png";
import second from "../assets/second.png";
import third from "../assets/three.png";
import icon from "../assets/icons.png";
import logo from "../assets/logo.png";
import circle from "../assets/circle1.png";
import up from "../assets/triangle.png";
import down from "../assets/down.png";
const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  const badgeImages = {
    1: first,
    2: second,
    3: third,
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredStudents = studentData.students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const topStudent = studentData.students.find((student) => student.rank === 1);

  return (
    <>
      <div style={{ width: "100%", height: "auto" }}>
        <nav>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "49px" }}>
            <div style={{ margin: "10px", padding: "40px" }}>
              <p
                style={{
                  fontFamily: "cursive",
                  fontWeight: "1000",
                  fontSize: "40px",
                  textDecoration: "bold",
                  color: "#121481",
                }}
              >
                Welcome to the Employees <br /> Activity Dashboard!{" "}
              </p>
              <p>
                This web application is designed to help you monitor and manage
                employee activities efficiently.
              </p>
              <p>
                {" "}
                It provides an intuitive and user-friendly interface to track
                employee performance, manage data, and gain insights into work
                patterns.
              </p>
            </div>
            <div className="ani">
              <img src={circle} alt="Animation" />
            </div>
          </div>
        </nav>
      </div>
      <hr />
      <div className="container">
        <div className="dashboard">
          <div
            style={{
              display: "flex",
              gap: "6px",
              lineHeight: "50%",
              fontFamily: "sans-serif",
              alignItems: "center",
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{ width: "50px", height: "50px" }}
            />
            <h1>Employees Activity Dashboard</h1>
          </div>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-box"
          />
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Rank</th>
                <th style={{ paddingLeft: "45px" }}>Name</th>
                <th>Designation</th>
                <th>Hours Worked</th>
                <th>Changes</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((student) => (
                <tr key={student.rank}>
                  <td>
                    {badgeImages[student.rank] && (
                      <img
                        src={badgeImages[student.rank]}
                        alt={`Rank ${student.rank} badge`}
                        style={{
                          height: "30px",
                          width: "30px",
                          marginLeft: "6px",
                        }}
                      />
                    )}
                  </td>
                  <td>{student.rank}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={student.image_url}
                        alt={student.name}
                        style={{
                          height: "50px",
                          width: "50px",
                          borderRadius: "50%",
                          marginRight: "10px",
                        }}
                      />
                      {student.name}
                    </div>
                  </td>
                  <td>{student.designation}</td>
                  <td>{student.hours_worked}</td>
                  <td>
                    {Math.random() < 0.5 ? (
                      <img
                        src={up}
                        alt="Up"
                        style={{ height: "10px", width: "10px" }}
                      />
                    ) : (
                      <img
                        src={down}
                        alt="Down"
                        style={{ height: "10px", width: "10px" }}
                      />
                    )}
                    {/* Display the changes value */}
                    {student.changes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
        <div className="card">
          <img
            src={topStudent.image_url}
            alt={topStudent.name}
            style={{
              height: "200px",
              width: "300px",
              borderRadius: "5%",
              marginRight: "10px",
            }}
          />
          <h2 style={{ color: "#121481", fontFamily: "sans-serif" }}>
            Employee of the Month
          </h2>
          <p
            style={{
              fontFamily: "sans-serif",
              textDecoration: "bold",
              fontSize: "20px",
            }}
          >
            {topStudent.name}
          </p>
          <p>{topStudent.designation}</p>
          <img
            src={icon}
            style={{
              width: "210px",
              height: "160px",
              border: "none",
              borderRadius: "0%",
            }}
            alt="Icon"
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
