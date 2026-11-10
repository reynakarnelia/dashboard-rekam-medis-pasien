import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";

const PatientFormModal = ({
  show,
  handleClose,
  addPatient,
  editPatient,
  patientToEdit,
}) => {
  const [patient, setPatient] = useState({
    rmNumber: "",
    name: "",
    poli: "Umum",
    doctor: "",
    date: "",
    status: "Menunggu",
  });

  useEffect(() => {
    if (patientToEdit) {
      setPatient(patientToEdit);
    } else {
      const randomRM = "RM-" + Math.floor(100000 + Math.random() * 900000);
      const today = new Date().toISOString().split("T")[0];
      setPatient({
        rmNumber: randomRM,
        name: "",
        poli: "Umum",
        doctor: "",
        date: today,
        status: "Menunggu",
      });
    }
  }, [patientToEdit, show]);

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patient.name.trim() || !patient.doctor.trim() || !patient.date) return;

    patientToEdit ? editPatient(patient) : addPatient(patient);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg" className="p-2">
      <Modal.Header closeButton className="bg-light">
        <Modal.Title className="fs-5 fw-bold">
          {patientToEdit ? "Perbarui Rekam Medis" : "Registrasi Pasien Baru"}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body className="p-3 p-sm-4">
          <Row className="g-3">
            {/* Tampilan responsif: 1 kolom penuh di HP, 4 kolom grid di Desktop */}
            <Col xs={12} md={4}>
              <Form.Group controlId="rmNumber">
                <Form.Label className="fw-semibold small">
                  No. Rekam Medis (Otomatis)
                </Form.Label>
                <Form.Control
                  type="text"
                  name="rmNumber"
                  value={patient.rmNumber}
                  disabled
                  className="bg-light"
                />
              </Form.Group>
            </Col>

            {/* 1 kolom penuh di HP, 8 kolom grid di Desktop */}
            <Col xs={12} md={8}>
              <Form.Group controlId="patientName">
                <Form.Label className="fw-semibold small">
                  Nama Lengkap Pasien
                </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Masukkan nama lengkap pasien..."
                  value={patient.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col xs={12} sm={6} md={4}>
              <Form.Group controlId="patientPoli">
                <Form.Label className="fw-semibold small">
                  Poliklinik Tujuan
                </Form.Label>
                <Form.Select
                  name="poli"
                  value={patient.poli}
                  onChange={handleChange}
                >
                  <option value="Umum">Poli Umum</option>
                  <option value="Gigi">Poli Gigi</option>
                  <option value="Anak">Poli Anak</option>
                  <option value="Mata">Poli Mata</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12} sm={6} md={8}>
              <Form.Group controlId="patientDoctor">
                <Form.Label className="fw-semibold small">
                  Dokter Penanggung Jawab
                </Form.Label>
                <Form.Control
                  type="text"
                  name="doctor"
                  placeholder="Contoh: dr. Ahmad Subarjo, Sp.A"
                  value={patient.doctor}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col xs={12} sm={6}>
              <Form.Group controlId="patientDate">
                <Form.Label className="fw-semibold small">
                  Tanggal Kunjungan
                </Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={patient.date}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col xs={12} sm={6}>
              <Form.Group controlId="patientStatus">
                <Form.Label className="fw-semibold small">
                  Status Penanganan
                </Form.Label>
                <Form.Select
                  name="status"
                  value={patient.status}
                  onChange={handleChange}
                >
                  <option value="Menunggu">Menunggu</option>
                  <option value="Diperiksa">Diperiksa</option>
                  <option value="Selesai">Selesai</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="bg-light p-3">
          <Button variant="secondary" onClick={handleClose} className="px-3">
            Batal
          </Button>
          <Button variant="success" type="submit" className="px-4">
            {patientToEdit ? "Simpan Perubahan" : "Daftarkan Pasien"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default PatientFormModal;
