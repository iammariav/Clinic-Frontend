import React, { useState, useEffect } from "react";
import "./App.css";

const BASE_URL = "https://clinic-appoint-backend-2.onrender.com/"; 

function App() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [patientForm, setPatientForm] = useState({ name: "", birthDate: "", email: "", phone: "" });
  const [doctorForm, setDoctorForm] = useState({ name: "", specialty: "" });
  const [appointmentForm, setAppointmentForm] = useState({ patientId: "", doctorId: "", startAt: "", endAt: "", notes: "" });

  const [editingPatientId, setEditingPatientId] = useState(null);
  const [editingDoctorId, setEditingDoctorId] = useState(null);
  const [editingAppointmentId, setEditingAppointmentId] = useState(null);

  // -------------------- FETCH DATA --------------------
  useEffect(() => {
    fetchPatients();
    fetchDoctors();
    fetchAppointments();
  }, []);

  const fetchPatients = async () => {
    const res = await fetch(`${BASE_URL}/api/patients`);
    const data = await res.json();
    setPatients(data);
  };

  const fetchDoctors = async () => {
    const res = await fetch(`${BASE_URL}/api/doctors`);
    const data = await res.json();
    setDoctors(data);
  };

  const fetchAppointments = async () => {
    const res = await fetch(`${BASE_URL}/api/appointments`);
    const data = await res.json();
    setAppointments(data);
  };

  // -------------------- PATIENT HANDLERS --------------------
  const handlePatientSubmit = async (e) => {
    e.preventDefault();
    if (editingPatientId) {
      const res = await fetch(`${BASE_URL}/api/patients/${editingPatientId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patientForm)
      });
      const data = await res.json();
      setPatients(patients.map(p => (p._id === editingPatientId ? data : p)));
      setEditingPatientId(null);
    } else {
      const res = await fetch(`${BASE_URL}/api/patients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patientForm)
      });
      const data = await res.json();
      setPatients([...patients, data]);
    }
    setPatientForm({ name: "", birthDate: "", email: "", phone: "" });
  };

  const handleEditPatient = (patient) => {
    setPatientForm({ ...patient });
    setEditingPatientId(patient._id);
  };

  const handleDeletePatient = async (id) => {
    await fetch(`${BASE_URL}/api/patients/${id}`, { method: "DELETE" });
    setPatients(patients.filter(p => p._id !== id));
  };

  // -------------------- DOCTOR HANDLERS --------------------
  const handleDoctorSubmit = async (e) => {
    e.preventDefault();
    if (editingDoctorId) {
      const res = await fetch(`${BASE_URL}/api/doctors/${editingDoctorId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doctorForm)
      });
      const data = await res.json();
      setDoctors(doctors.map(d => (d._id === editingDoctorId ? data : d)));
      setEditingDoctorId(null);
    } else {
      const res = await fetch(`${BASE_URL}/api/doctors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doctorForm)
      });
      const data = await res.json();
      setDoctors([...doctors, data]);
    }
    setDoctorForm({ name: "", specialty: "" });
  };

  const handleEditDoctor = (doctor) => {
    setDoctorForm({ ...doctor });
    setEditingDoctorId(doctor._id);
  };

  const handleDeleteDoctor = async (id) => {
    await fetch(`${BASE_URL}/api/doctors/${id}`, { method: "DELETE" });
    setDoctors(doctors.filter(d => d._id !== id));
  };

  // -------------------- APPOINTMENT HANDLERS --------------------
  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    if (editingAppointmentId) {
      const res = await fetch(`${BASE_URL}/api/appointments/${editingAppointmentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentForm)
      });
      const data = await res.json();
      setAppointments(appointments.map(a => (a._id === editingAppointmentId ? data : a)));
      setEditingAppointmentId(null);
    } else {
      const res = await fetch(`${BASE_URL}/api/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentForm)
      });
      const data = await res.json();
      setAppointments([...appointments, data]);
    }
    setAppointmentForm({ patientId: "", doctorId: "", startAt: "", endAt: "", notes: "" });
  };

  const handleEditAppointment = (appointment) => {
    setAppointmentForm({
      patientId: appointment.patientId._id,
      doctorId: appointment.doctorId._id,
      startAt: appointment.startAt,
      endAt: appointment.endAt,
      notes: appointment.notes
    });
    setEditingAppointmentId(appointment._id);
  };

  const handleDeleteAppointment = async (id) => {
    await fetch(`${BASE_URL}/api/appointments/${id}`, { method: "DELETE" });
    setAppointments(appointments.filter(a => a._id !== id));
  };

  // -------------------- RENDER --------------------
  return (
    <div className="dashboard-container">
      <header><h1>Clinic Management System</h1></header>

      <div className="cards-container-horizontal">

        {/* Patients */}
        <section className="card card-patients">
          <h2>Patients</h2>
          <form className="form" onSubmit={handlePatientSubmit}>
            <input placeholder="Name" value={patientForm.name} onChange={e => setPatientForm({ ...patientForm, name: e.target.value })} required />
            <input type="date" value={patientForm.birthDate} onChange={e => setPatientForm({ ...patientForm, birthDate: e.target.value })} required />
            <input placeholder="Email" value={patientForm.email} onChange={e => setPatientForm({ ...patientForm, email: e.target.value })} required />
            <input placeholder="Phone" value={patientForm.phone} onChange={e => setPatientForm({ ...patientForm, phone: e.target.value })} required />
            <button type="submit" className="btn">{editingPatientId ? "Update Patient" : "Add Patient"}</button>
          </form>
          <ul className="list">
            {patients.map(p => (
              <li key={p._id}>
                {p.name} – {p.email}
                <button className="btn-small" onClick={() => handleEditPatient(p)}>Edit</button>
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
            <button type="submit" className="btn">{editingDoctorId ? "Update Doctor" : "Add Doctor"}</button>
          </form>
          <ul className="list">
            {doctors.map(d => (
              <li key={d._id}>
                {d.name} – {d.specialty}
                <button className="btn-small" onClick={() => handleEditDoctor(d)}>Edit</button>
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
            <button type="submit" className="btn">{editingAppointmentId ? "Update Appointment" : "Add Appointment"}</button>
          </form>
          <ul className="list">
            {appointments.map(a => (
              <li key={a._id}>
                {a.patientId?.name} with {a.doctorId?.name} – {new Date(a.startAt).toLocaleString()} to {new Date(a.endAt).toLocaleString()}
                <button className="btn-small" onClick={() => handleEditAppointment(a)}>Edit</button>
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
