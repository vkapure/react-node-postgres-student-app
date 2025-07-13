import React, { useEffect, useState } from 'react';
import API from '../api';
import Swal from 'sweetalert2';

export default function StudentForm({ selectedId, onSaved, onClose }) {
  const [form, setForm] = useState({
    name: '', email: '', age: '', parent_id: '', marks: []
  });

  useEffect(() => {
    if (selectedId) {
      API.get(`/${selectedId}`).then(res =>
        setForm({
          name: res.data.name || '',
          email: res.data.email || '',
          age: res.data.age || '',
          parent_id: res.data.parent_id || '',
          marks: res.data.marks || []
        })
      );
    }
  }, [selectedId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedId) {
        await API.put(`/${selectedId}`, form);
        Swal.fire('Updated!', 'Student updated successfully.', 'success');
      } else {
        await API.post('/', form);
        Swal.fire('Created!', 'Student created successfully.', 'success');
      }
      onSaved();
    } catch {
      Swal.fire('Error', 'Could not save student.', 'error');
    }
  };

  const handleMarkChange = (index, key, value) => {
    const newMarks = [...form.marks];
    newMarks[index][key] = value;
    setForm({ ...form, marks: newMarks });
  };

  const addMark = () => {
    setForm({ ...form, marks: [...form.marks, { subject: '', score: '' }] });
  };

  const removeMark = (index) => {
    const newMarks = form.marks.filter((_, i) => i !== index);
    setForm({ ...form, marks: newMarks });
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">{selectedId ? 'Edit' : 'Add'} Student</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <input className="form-control mb-2" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
              <input className="form-control mb-2" type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
              <input className="form-control mb-2" type="number" placeholder="Age" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} />
              <input className="form-control mb-2" type="number" placeholder="Parent ID" value={form.parent_id} onChange={e => setForm({ ...form, parent_id: e.target.value })} />

              <h6>Marks</h6>
              {form.marks.map((mark, i) => (
                <div className="d-flex mb-2" key={i}>
                  <input className="form-control me-1" placeholder="Subject" value={mark.subject} onChange={e => handleMarkChange(i, 'subject', e.target.value)} required />
                  <input className="form-control me-1" type="number" placeholder="Score" value={mark.score} onChange={e => handleMarkChange(i, 'score', e.target.value)} required />
                  <button type="button" className="btn btn-danger btn-sm" onClick={() => removeMark(i)}>×</button>
                </div>
              ))}
              <button type="button" className="btn btn-sm btn-outline-primary mb-2" onClick={addMark}>+ Add Mark</button>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">{selectedId ? 'Update' : 'Create'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
