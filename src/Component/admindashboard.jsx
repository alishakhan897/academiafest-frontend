import { useEffect, useState } from "react";
import "../App.css";

export default function AdminDashboard() {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");

    const [editId, setEditId] = useState(null);
    const [editData, setEditData] = useState({});


    const [showCreate, setShowCreate] = useState(false);
    const [newStudent, setNewStudent] = useState({
        name: "",
        gender: "",
        mobile: "",
        whatsapp: "",
        parentMobile: "",
        email: "",
        city: "",
        course: "",
        interestedin: "",
        eventInterest: "",
        firstReferral: { name: "", mobile: "" },
        secondReferral: { name: "", mobile: "" },
        source: ""
    });

    useEffect(() => {
        if (!localStorage.getItem("admin_auth")) {
            window.location.href = "/admin";
        }
        loadStudents();
    }, []);

    const loadStudents = async () => {
        const res = await fetch("https://academiafest-backend.onrender.com/api/studentdata");
        const data = await res.json();
        setStudents(data);
    };

    const deleteStudent = async (id) => {
        await fetch(`https://academiafest-backend.onrender.com/api/studentdata/${id}`, { method: "DELETE" });
        loadStudents();
    };

    const toggleStrike = (id) => {
        setStudents(prev => prev.map(s => s._id === id ? { ...s, checked: !s.checked } : s));
    };

    const startEdit = (s) => {
        setEditId(s._id);
        setEditData({ ...s });
    };

    const saveEdit = async () => {
        await fetch(`https://academiafest-backend.onrender.com/api/studentdata/${editId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editData)
        });
        setEditId(null);
        loadStudents();
    };

    const handleEditChange = (field, value) => {
        setEditData(prev => ({ ...prev, [field]: value }));
    };

    const filtered = students.filter(s =>
        s.name?.toLowerCase().includes(search.toLowerCase())
    );


    const createStudent = async () => {
        await fetch("https://academiafest-backend.onrender.com/api/student", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(newStudent),
});


        setShowCreate(false);
        loadStudents();

        setNewStudent({
            name: "",
            gender: "",
            mobile: "",
            whatsapp: "",
            parentMobile: "",
            email: "",
            city: "",
            course: "",
            interestedin: "",
            eventInterest: "",
            firstReferral: { name: "", mobile: "" },
            secondReferral: { name: "", mobile: "" },
            source: ""
        });
    };

    const showValue = (v) => {
        if (Array.isArray(v)) return v.join(", ");
        if (typeof v === "object" && v !== null) return JSON.stringify(v);
        return v || "-";
    };

    return (
        <div className="admin-container">

            <h1 className="title">Students Database</h1>

     
            <div className="top-bar">
                <input
                    type="text"
                    className="search-box"
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <button className="btn add-btn" onClick={() => setShowCreate(true)}>
                    + Add New Student
                </button>
            </div>

            {showCreate && (
                <div className="create-box">
                    <h3>Create New Student</h3>

                    <div className="form-grid">

                        <input placeholder="Name" value={newStudent.name}
                            onChange={e => setNewStudent({ ...newStudent, name: e.target.value })} />

                        <input placeholder="Gender" value={newStudent.gender}
                            onChange={e => setNewStudent({ ...newStudent, gender: e.target.value })} />

                        <input placeholder="Mobile" value={newStudent.mobile}
                            onChange={e => setNewStudent({ ...newStudent, mobile: e.target.value })} />

                        <input placeholder="WhatsApp" value={newStudent.whatsapp}
                            onChange={e => setNewStudent({ ...newStudent, whatsapp: e.target.value })} />

                        <input placeholder="Parent Mobile" value={newStudent.parentMobile}
                            onChange={e => setNewStudent({ ...newStudent, parentMobile: e.target.value })} />

                        <input placeholder="Email" value={newStudent.email}
                            onChange={e => setNewStudent({ ...newStudent, email: e.target.value })} />

                        <input placeholder="City" value={newStudent.city}
                            onChange={e => setNewStudent({ ...newStudent, city: e.target.value })} />

                        <input placeholder="Course" value={newStudent.course}
                            onChange={e => setNewStudent({ ...newStudent, course: e.target.value })} />

                        <input placeholder="Interested In" value={newStudent.interestedin}
                            onChange={e => setNewStudent({ ...newStudent, interestedin: e.target.value })} />

                        <input placeholder="Event Interest" value={newStudent.eventInterest}
                            onChange={e => setNewStudent({ ...newStudent, eventInterest: e.target.value })} />

                        <input placeholder="First Referral Name" value={newStudent.firstReferral.name}
                            onChange={e => setNewStudent({
                                ...newStudent,
                                firstReferral: { ...newStudent.firstReferral, name: e.target.value }
                            })} />

                        <input placeholder="First Referral Mobile" value={newStudent.firstReferral.mobile}
                            onChange={e => setNewStudent({
                                ...newStudent,
                                firstReferral: { ...newStudent.firstReferral, mobile: e.target.value }
                            })} />

                        <input placeholder="Second Referral Name" value={newStudent.secondReferral.name}
                            onChange={e => setNewStudent({
                                ...newStudent,
                                secondReferral: { ...newStudent.secondReferral, name: e.target.value }
                            })} />

                        <input placeholder="Second Referral Mobile" value={newStudent.secondReferral.mobile}
                            onChange={e => setNewStudent({
                                ...newStudent,
                                secondReferral: { ...newStudent.secondReferral, mobile: e.target.value }
                            })} />

                        <input placeholder="Source" value={newStudent.source}
                            onChange={e => setNewStudent({ ...newStudent, source: e.target.value })} />

                    </div>

                    <div className="form-actions">
                        <button className="btn save-btn" onClick={createStudent}>Save</button>
                        <button className="btn cancel-btn" onClick={() => setShowCreate(false)}>Cancel</button>
                    </div>
                </div>
            )}

            <div className="table-wrapper">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>Interested In</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Mobile</th>
                            <th>WhatsApp</th>
                            <th>Parent Mobile</th>
                            <th>Email</th>
                            <th>City</th>
                            <th>Course</th>
                            <th>Event Interest</th>
                            <th>First Ref</th>
                            <th>First Mobile</th>
                            <th>Second Ref</th>
                            <th>Second Mobile</th>
                            <th>Source</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filtered.map((s) => (
                            <tr key={s._id} className={s.checked ? "strike-row" : ""}>
                                <td>
                                    <input type="checkbox" checked={s.checked || false}
                                        onChange={() => toggleStrike(s._id)} />
                                </td>

                                {editId === s._id ? (
                                    <>
                                        <td><input value={editData.interestedin} onChange={e => handleEditChange("interestedin", e.target.value)} /></td>
                                        <td><input value={editData.name} onChange={e => handleEditChange("name", e.target.value)} /></td>
                                        <td><input value={editData.gender} onChange={e => handleEditChange("gender", e.target.value)} /></td>
                                        <td><input value={editData.mobile} onChange={e => handleEditChange("mobile", e.target.value)} /></td>
                                        <td><input value={editData.whatsapp} onChange={e => handleEditChange("whatsapp", e.target.value)} /></td>
                                        <td><input value={editData.parentMobile} onChange={e => handleEditChange("parentMobile", e.target.value)} /></td>
                                        <td><input value={editData.email} onChange={e => handleEditChange("email", e.target.value)} /></td>
                                        <td><input value={editData.city} onChange={e => handleEditChange("city", e.target.value)} /></td>
                                        <td><input value={editData.course} onChange={e => handleEditChange("course", e.target.value)} /></td>
                                        <td><input value={editData.eventInterest} onChange={e => handleEditChange("eventInterest", e.target.value)} /></td>
                                        <td><input value={editData.firstReferral?.name}
                                            onChange={e => handleEditChange("firstReferral", { ...editData.firstReferral, name: e.target.value })} /></td>
                                        <td><input value={editData.firstReferral?.mobile}
                                            onChange={e => handleEditChange("firstReferral", { ...editData.firstReferral, mobile: e.target.value })} /></td>
                                        <td><input value={editData.secondReferral?.name}
                                            onChange={e => handleEditChange("secondReferral", { ...editData.secondReferral, name: e.target.value })} /></td>
                                        <td><input value={editData.secondReferral?.mobile}
                                            onChange={e => handleEditChange("secondReferral", { ...editData.secondReferral, mobile: e.target.value })} /></td>
                                        <td><input value={editData.source} onChange={e => handleEditChange("source", e.target.value)} /></td>

                                        <td>
                                            <button className="btn save-btn" onClick={saveEdit}>Save</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td>{showValue(s.interestedin)}</td>
                                        <td>{showValue(s.name)}</td>
                                        <td>{showValue(s.gender)}</td>
                                        <td>{showValue(s.mobile)}</td>
                                        <td>{showValue(s.whatsapp)}</td>
                                        <td>{showValue(s.parentMobile)}</td>
                                        <td>{showValue(s.email)}</td>
                                        <td>{showValue(s.city)}</td>
                                        <td>{showValue(s.course)}</td>
                                        <td>{showValue(s.eventInterest)}</td>
                                        <td>{showValue(s.firstReferral?.name)}</td>
                                        <td>{showValue(s.firstReferral?.mobile)}</td>
                                        <td>{showValue(s.secondReferral?.name)}</td>
                                        <td>{showValue(s.secondReferral?.mobile)}</td>
                                        <td>{showValue(s.source)}</td>

                                        <td>
                                            <button className="btn edit-btn" onClick={() => startEdit(s)}>Edit</button>
                                            <button className="btn del-btn" onClick={() => deleteStudent(s._id)}>Delete</button>
                                        </td>
                                    </>
                                )}

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
