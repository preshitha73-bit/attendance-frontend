import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [subjectName, setSubjectName] = useState("");
  const [totalClasses, setTotalClasses] = useState("");
  const [attendedClasses, setAttendedClasses] = useState("");
  const [subjects, setSubjects] = useState([]);

  const fetchSubjects = async () => {
    const res = await axios.get("http://localhost:5000/subjects");
    setSubjects(res.data);
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const addSubject = async () => {
    if (!subjectName || !totalClasses || !attendedClasses) {
      alert("Please fill all fields");
      return;
    }

    await axios.post("http://localhost:5000/subjects", {
      subjectName,
      totalClasses,
      attendedClasses,
    });

    setSubjectName("");
    setTotalClasses("");
    setAttendedClasses("");

    fetchSubjects();
  };

  const deleteSubject = async (id) => {
    await axios.delete(`http://localhost:5000/subjects/${id}`);
    fetchSubjects();
  };

  const getStatus = (attendance) => {
    if (attendance >= 85) {
      return {
        text: "🟢 Safe to Bunk",
        color: "green",
      };
    } else if (attendance >= 75) {
      return {
        text: "🟡 Be Careful",
        color: "orange",
      };
    } else {
      return {
        text: "🔴 Attendance Low",
        color: "red",
      };
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#eef4ff",
        minHeight: "100vh",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          margin: "auto",
          background: "#fff",
          padding: "25px",
          borderRadius: "15px",
          boxShadow: "0 0 15px rgba(0,0,0,0.2)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#1e3a8a",
          }}
        >
          📚 Class Bunk Planner
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "gray",
            marginBottom: "25px",
          }}
        >
          Track your attendance and know when you can safely bunk a class.
        </p>

        <input
          type="text"
          placeholder="Subject Name"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        />

        <input
          type="number"
          placeholder="Total Classes"
          value={totalClasses}
          onChange={(e) => setTotalClasses(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        />

        <input
          type="number"
          placeholder="Attended Classes"
          value={attendedClasses}
          onChange={(e) => setAttendedClasses(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "5px",
          }}
        />

        <button
          onClick={addSubject}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Add Subject
        </button>

        <hr style={{ margin: "25px 0" }} />

        {subjects.length === 0 ? (
          <p style={{ textAlign: "center", color: "gray" }}>
            No Subjects Added
          </p>
        ) : (
          subjects.map((subject) => {
            const status = getStatus(Number(subject.attendance));

            return (
              <div
                key={subject.id}
                style={{
                  background: "#f8fafc",
                  padding: "15px",
                  borderRadius: "10px",
                  marginBottom: "15px",
                  borderLeft: `6px solid ${status.color}`,
                }}
              >
                <h3>{subject.subjectName}</h3>

                <p>
                  <strong>Total Classes:</strong> {subject.totalClasses}
                </p>

                <p>
                  <strong>Attended Classes:</strong> {subject.attendedClasses}
                </p>

                <p>
                  <strong>Attendance:</strong> {subject.attendance}%
                </p>

                <p
                  style={{
                    color: status.color,
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  {status.text}
                </p>

                <button
                  onClick={() => deleteSubject(subject.id)}
                  style={{
                    backgroundColor: "#dc2626",
                    color: "white",
                    border: "none",
                    padding: "10px 18px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default App;
