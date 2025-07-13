import React, { useEffect, useState } from "react";
import API from "../api";
import Swal from "sweetalert2";

export default function StudentList({ onEdit, onAdd }) {
  const [allStudents, setAllStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await API.get("?page=1&limit=1000"); // fetch all students once
    setAllStudents(res.data.students || []);
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the student",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      await API.delete(`/${id}`);
      Swal.fire("Deleted!", "Student has been deleted.", "success");
      fetchStudents();
      setPage(1); // reset to first page after deletion
    }
  };

  const filteredStudents = allStudents.filter(
    (st) =>
      st.name.toLowerCase().includes(search.toLowerCase()) ||
      st.email.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filteredStudents.slice((page - 1) * limit, page * limit);
  const totalPages = Math.ceil(filteredStudents.length / limit);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Student List</h2>
        <button className="btn btn-success" onClick={onAdd}>
          Add Student
        </button>
      </div>

      <input
        className="form-control mb-3"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((st) => (
            <tr key={st.id}>
              <td>{st.name}</td>
              <td>{st.email}</td>
              <td>{st.age}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => onEdit(st.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(st.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {paginated.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <button
          className="btn btn-secondary"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>

        <span className="fw-bold">
          Page {page} of {totalPages}
        </span>

        <button
          className="btn btn-secondary"
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
