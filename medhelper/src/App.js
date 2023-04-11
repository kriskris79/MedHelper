import React, { useState } from 'react';
import './scss/styles/_app.scss';
import "./scss/generic/_main.scss";
import MedicationList from './components/MedicationList';
import MedicationForm from "./components/MedicationForm";


function App() {
  const [medications, setMedications] = useState([
    { id: 1, name: 'Aspirin', dosage: '81mg', frequency: 'Daily', taken: false },
    { id: 2, name: 'Lipitor', dosage: '20mg', frequency: 'Daily', taken: false },
    { id: 3, name: 'Metformin', dosage: '1000mg', frequency: 'Twice daily', taken: false },
  ]);
  const [showForm, setShowForm] = useState(false);

  const toggleTaken = (id) => {
    setMedications(medications.map(medication => {
      if (medication.id === id) {
        return { ...medication, taken: !medication.taken };
      } else {
        return medication;
      }
    }));
  };

  const addMedication = (medication) => {
    const newMedication = {
      id: Math.max(...medications.map(medication => medication.id)) + 1,
      ...medication,
      taken: false,
    };
    setMedications([...medications, newMedication]);
    setShowForm(false);
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleHideForm = () => {
    setShowForm(false);
  };

  return (
      <div className="app">
        <h1 className="title">My Medications</h1>
        <MedicationList medications={medications} toggleTaken={toggleTaken} />
        <div className="button-container">
          {!showForm ? <button onClick={handleShowForm}>Add Medication Reminder</button> : null}
        </div>
        {showForm ? <MedicationForm onSave={addMedication} onCancel={handleHideForm} /> : null}
      </div>
  );
}

export default App;