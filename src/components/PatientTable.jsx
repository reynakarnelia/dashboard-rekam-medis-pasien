import React from "react";
import { Table, Button, Badge } from "react-bootstrap";

const PatientTable = ({ patients, deletePatient, showEditForm }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case "Selesai":
        return (
          <Badge bg="success" className="px-2 py-1.5">
            Selesai
          </Badge>
        );
      case "Diperiksa":
        return (
          <Badge bg="primary" className="px-2 py-1.5">
            Diperiksa
          </Badge>
        );
      case "Menunggu":
      default:
        return (
          <Badge bg="warning" className="px-2 py-1.5">
            Menunggu
          </Badge>
        );
    }
  };

  const getPoliBadge = (poli) => {
    switch (poli) {
      case "Umum":
        return (
          <Badge
            bg="secondary"
            className="bg-opacity-25 text-secondary px-2 py-1.5"
          >
            Poli Umum
          </Badge>
        );
      case "Gigi":
        return (
          <Badge bg="info" className="bg-opacity-25 text-info px-2 py-1.5">
            Poli Gigi
          </Badge>
        );
      case "Anak":
        return (
          <Badge
            bg="success"
            className="bg-opacity-25 text-success px-2 py-1.5"
          >
            Poli Anak
          </Badge>
        );
      case "Mata":
        return (
          <Badge bg="danger" className="bg-opacity-25 text-danger px-2 py-1.5">
            Poli Mata
          </Badge>
        );
      default:
        return (
          <Badge bg="dark" className="px-2 py-1.5">
            {poli}
          </Badge>
        );
    }
  };

  return (
    <div className="table-responsive bg-white rounded shadow-sm p-2 p-sm-3">
      {/* minWidth memastikan tabel dapat digeser horizontal dengan rapi di HP tanpa hancur */}
      <Table hover className="align-middle mb-0" style={{ minWidth: "750px" }}>
        <thead className="table-light">
          <tr>
            <th>No. RM</th>
            <th>Nama Pasien</th>
            <th>Poliklinik Tujuan</th>
            <th>Dokter Spesialis</th>
            <th>Tanggal Kunjungan</th>
            <th>Status Penanganan</th>
            <th className="text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {patients.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-4 text-muted">
                Belum ada antrean rekam medis pasien hari ini.
              </td>
            </tr>
          ) : (
            patients.map((patient) => (
              <tr key={patient.id}>
                <td>
                  <strong className="text-primary">{patient.rmNumber}</strong>
                </td>
                <td className="fw-semibold text-dark">{patient.name}</td>
                <td>{getPoliBadge(patient.poli)}</td>
                <td className="text-secondary">{patient.doctor}</td>
                <td className="text-muted" style={{ fontSize: "14px" }}>
                  {patient.date}
                </td>
                <td>{getStatusBadge(patient.status)}</td>
                <td className="text-center">
                  <div className="d-flex justify-content-center gap-1">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => showEditForm(patient)}
                    >
                      Edit
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default PatientTable;
