import React, { useState } from 'react';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';

function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleSaved = () => {
    setShowModal(false);
    setSelectedId(null);
    setRefreshKey(k => k + 1);
  };

  return (
    <div className="container mt-4">
      <StudentList
        onEdit={(id) => {
          setSelectedId(id);
          setShowModal(true);
        }}
        onAdd={() => {
          setSelectedId(null);
          setShowModal(true);
        }}
        key={refreshKey}
      />

      {showModal && (
        <StudentForm
          selectedId={selectedId}
          onClose={() => setShowModal(false)}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}

export default App;
