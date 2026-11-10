import React, { useState } from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import PatientTable from "./components/PatientTable";
import PatientFormModal from "./components/PatientFormModal";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [patients, setPatients] = useState([
     ]);
  const [showModal, setShowModal] = useState(false);
  const [patientToEdit, setPatientToEdit] = useState(null);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setPatientToEdit(null);
  };

  // 1. CREATE - Tambah Rekam Medis
  const addPatient = (patient) => {
    setPatients([...patients, { ...patient, id: Date.now() }]);
  };

  // 2. UPDATE - Ubah Rekam Medis
  const editPatient = (updatedPatient) => {
    setPatients(
      patients.map((p) => (p.id === updatedPatient.id ? updatedPatient : p)),
    );
  };

  // 3. DELETE - Hapus Rekam Medis
  const deletePatient = (id) => {
    if (
      window.confirm(
        "Apakah Anda yakin ingin menghapus data rekam medis pasien ini?",
      )
    ) {
      setProducts(patients.filter((p) => p.id !== id));
    }
  };

  const showEditForm = (patient) => {
    setPatientToEdit(patient);
    handleShowModal();
  };

  // Hitung data statistik ringkasan Klinik
  const totalAntrean = patients.filter((p) => p.status !== "Selesai").length;
  const totalDiperiksa = patients.filter(
    (p) => p.status === "Diperiksa",
  ).length;
  const totalSelesai = patients.filter((p) => p.status === "Selesai").length;

  return (
    <div style={{ backgroundColor: "#f4f6f9", minHeight: "100vh" }}>
      {/* Header Banner Dashboard */}
      <div className="bg-success text-white py-3 mb-4 shadow-sm">
        <Container>
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <h4 className="m-0 fw-bold">Klinik Medical Record</h4>
          </div>
        </Container>
      </div>

      <Container>
        {/* Ringkasan Dashboard Medis (Card Widget) */}
        <Row className="mb-4 g-3">
          <Col md={4}>
            <Card className="border-0 shadow-sm rounded-3 bg-white p-3 border-start border-4 border-warning">
              <div className="text-muted small uppercase fw-bold">
                Pasien Dalam Antrean
              </div>
              <h2 className="fw-bold text-dark m-0 mt-1">
                {totalAntrean}{" "}
                <span className="small text-muted fs-6">Orang</span>
              </h2>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 shadow-sm rounded-3 bg-white p-3 border-start border-4 border-primary">
              <div className="text-muted small uppercase fw-bold">
                Sedang Diperiksa Dokter
              </div>
              <h2 className="fw-bold text-primary m-0 mt-1">
                {totalDiperiksa}{" "}
                <span className="small text-muted fs-6">Pasien</span>
              </h2>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 shadow-sm rounded-3 bg-white p-3 border-start border-4 border-success">
              <div className="text-muted small uppercase fw-bold">
                Selesai Penanganan
              </div>
              <h2 className="fw-bold text-success m-0 mt-1">
                {totalSelesai}{" "}
                <span className="small text-muted fs-6">Selesai</span>
              </h2>
            </Card>
          </Col>
        </Row>

        {/* Panel Konten Utama Manajemen Tabel */}
        <Card className="border-0 shadow-sm rounded-3 p-4 bg-white mb-5">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div>
              <h5 className="m-0 fw-bold text-dark">
                Data Manajemen Rekam Medis
              </h5>
              <small className="text-muted">
                Kelola status kunjungan pasien, alokasi dokter spesialis, dan
                riwayat penanganan.
              </small>
            </div>
            <Button
              variant="success"
              onClick={handleShowModal}
              className="px-4 py-2 fw-semibold shadow-sm"
            >
              Daftarkan Pasien Baru
            </Button>
          </div>

          {/* Pemanggilan Komponen Tabel */}
          <PatientTable
            patients={patients}
            deletePatient={deletePatient}
            showEditForm={showEditForm}
          />
        </Card>

        {/* Pemanggilan Komponen Modal Form */}
        <PatientFormModal
          show={showModal}
          handleClose={handleCloseModal}
          addPatient={addPatient}
          editPatient={editPatient}
          patientToEdit={patientToEdit}
        />
      </Container>
    </div>
  );
}

export default App;