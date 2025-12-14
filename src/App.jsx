import React, { useState } from "react";
import "./App.css";

function App() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [patientForm, setPatientForm] = useState({ name: "", birthDate: "", email: "", phone: "" });
  const [doctorForm, setDoctorForm] = useState({ name: "", specialty: "" });
  const [appointmentForm, setAppointmentForm] = useState({ patientId: "", doctorId: "", startAt: "", endAt: "", notes: "" });

  // -------------------- PATIENT HANDLERS --------------------
  const handlePatientSubmit = (e) => {
    e.preventDefault();
    setPatients([...patients, { ...patientForm, _id: Date.now() }]);
    setPatientForm({ name: "", birthDate: "", email: "", phone: "" });
  };

  const handleDeletePatient = (id) => setPatients(patients.filter(p => p._id !== id));

  const handleEditPatient = (id) => {
    const p = patients.find(p => p._id === id);
    setPatientForm({ name: p.name, birthDate: p.birthDate, email: p.email, phone: p.phone });
    handleDeletePatient(id);
  };

  // -------------------- DOCTOR HANDLERS --------------------
  const handleDoctorSubmit = (e) => {
    e.preventDefault();
    setDoctors([...doctors, { ...doctorForm, _id: Date.now() }]);
    setDoctorForm({ name: "", specialty: "" });
  };

  const handleDeleteDoctor = (id) => setDoctors(doctors.filter(d => d._id !== id));

  const handleEditDoctor = (id) => {
    const d = doctors.find(d => d._id === id);
    setDoctorForm({ name: d.name, specialty: d.specialty });
    handleDeleteDoctor(id);
  };

  // -------------------- APPOINTMENT HANDLERS --------------------
  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    const patient = patients.find(p => p._id === parseInt(appointmentForm.patientId));
    const doctor = doctors.find(d => d._id === parseInt(appointmentForm.doctorId));
    setAppointments([...appointments, { ...appointmentForm, _id: Date.now(), patientId: patient, doctorId: doctor }]);
    setAppointmentForm({ patientId: "", doctorId: "", startAt: "", endAt: "", notes: "" });
  };

  const handleDeleteAppointment = (id) => setAppointments(appointments.filter(a => a._id !== id));

  const handleEditAppointment = (id) => {
    const a = appointments.find(a => a._id === id);
    setAppointmentForm({
      patientId: a.patientId._id,
      doctorId: a.doctorId._id,
      startAt: a.startAt,
      endAt: a.endAt,
      notes: a.notes
    });
    handleDeleteAppointment(id);
  };

  return (
    <div className="dashboard-container">
      <header>
        <h1>Clinic Management System</h1>
      </header>

      <div className="cards-container-horizontal">
        {/* Patients */}
        <section className="card card-patients">
          <h2>Patients</h2>
          <form className="form" onSubmit={handlePatientSubmit}>
            <input placeholder="Name" value={patientForm.name} onChange={e => setPatientForm({ ...patientForm, name: e.target.value })} required />
            <input type="date" value={patientForm.birthDate} onChange={e => setPatientForm({ ...patientForm, birthDate: e.target.value })} required />
            <input placeholder="Email" value={patientForm.email} onChange={e => setPatientForm({ ...patientForm, email: e.target.value })} required />
            <input placeholder="Phone" value={patientForm.phone} onChange={e => setPatientForm({ ...patientForm, phone: e.target.value })} required />
            <button type="submit" className="btn">Add Patient</button>
          </form>
          <ul className="list">
            {patients.map(p => (
              <li key={p._id}>
                {p.name} – {p.email}
                <button className="btn-small" onClick={() => handleEditPatient(p._id)}>Edit</button>
                <button className="btn-small delete" onClick={() => handleDeletePatient(p._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </section>

        {/* Doctors */}
        <section className="card card-doctors">
          <h2>Doctors</h2>
          <form className="form" onSubmit={handleDoctorSubmit}>
            <input placeholder="Name" value={doctorForm.name} onChange={e => setDoctorForm({ ...doctorForm, name: e.target.value })} required />
            <input placeholder="Specialty" value={doctorForm.specialty} onChange={e => setDoctorForm({ ...doctorForm, specialty: e.target.value })} required />
            <button type="submit" className="btn">Add Doctor</button>
          </form>
          <ul className="list">
            {doctors.map(d => (
              <li key={d._id}>
                {d.name} – {d.specialty}
                <button className="btn-small" onClick={() => handleEditDoctor(d._id)}>Edit</button>
                <button className="btn-small delete" onClick={() => handleDeleteDoctor(d._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </section>

        {/* Appointments */}
        <section className="card card-appointments">
          <h2>Appointments</h2>
          <form className="form" onSubmit={handleAppointmentSubmit}>
            <select value={appointmentForm.patientId} onChange={e => setAppointmentForm({ ...appointmentForm, patientId: e.target.value })} required>
              <option value="">Select Patient</option>
              {patients.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
            </select>

            <select value={appointmentForm.doctorId} onChange={e => setAppointmentForm({ ...appointmentForm, doctorId: e.target.value })} required>
              <option value="">Select Doctor</option>
              {doctors.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
            </select>

            <input type="datetime-local" value={appointmentForm.startAt} onChange={e => setAppointmentForm({ ...appointmentForm, startAt: e.target.value })} required />
            <input type="datetime-local" value={appointmentForm.endAt} onChange={e => setAppointmentForm({ ...appointmentForm, endAt: e.target.value })} required />
            <input placeholder="Notes" value={appointmentForm.notes} onChange={e => setAppointmentForm({ ...appointmentForm, notes: e.target.value })} />
            <button type="submit" className="btn">Add Appointment</button>
          </form>
          <ul className="list">
            {appointments.map(a => (
              <li key={a._id}>
                {a.patientId?.name} with {a.doctorId?.name} – {new Date(a.startAt).toLocaleString()} to {new Date(a.endAt).toLocaleString()}
                <button className="btn-small" onClick={() => handleEditAppointment(a._id)}>Edit</button>
                <button className="btn-small delete" onClick={() => handleDeleteAppointment(a._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default App;
