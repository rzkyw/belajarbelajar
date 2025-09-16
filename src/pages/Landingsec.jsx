import { useState } from "react";
import "./Landingsec.css";
import telkomselImg2 from "../assets/Telkomsel Logo.png";
import telkomselImg1 from "../assets/telkom.png";

export default function Dashboard() {
  // 🔹 Ambil hari, tanggal, jam sekali waktu
  const getTanggalJam = () => {
    const now = new Date();
    return {
      hari: now.toLocaleDateString("id-ID", { weekday: "long" }),
      tanggal: now.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      jam: now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  // 🔹 Ambil waktu awal buat daftar tamu
  const { hari, tanggal, jam } = getTanggalJam();

  const [tamu, setTamu] = useState([
    {
      id: 1,
      nama: "Fadil",
      instansi: "PT Maju Jaya",
      aktivitas: "Project",
      ruangKerja: "Ruang A1",
      keterangan: "TTCTELING/15363526",
      status: "Waiting Approval",
      fotoMasuk: null,
      fotoKeluar: null,
      showUpload: false,
      showUploadKeluar: false,
      hari,
      tanggal,
      jam,
    },
    {
      id: 2,
      nama: "Bernadya",
      instansi: "PT Sejahtera",
      aktivitas: "Project",
      ruangKerja: "Ruang B2",
      keterangan: "TTCTELING/52638631",
      status: "Waiting Approval",
      fotoMasuk: null,
      fotoKeluar: null,
      showUpload: false,
      showUploadKeluar: false,
      hari,
      tanggal,
      jam,
    },
  ]);

  const [record, setRecord] = useState([]);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleUploadFoto = (file, callback) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => callback(reader.result);
    reader.readAsDataURL(file);
  };

  const updateStatus = (id, status, foto = null) => {
    const tamuUpdate = tamu.find((t) => t.id === id);
    if (!tamuUpdate) return;

    const { hari, tanggal, jam } = getTanggalJam(); // realtime hanya untuk record
    let updatedTamuList = [...tamu];

    if (status === "Masuk") {
      updatedTamuList = tamu.map((t) =>
        t.id === id
          ? { ...t, status: "Masuk", fotoMasuk: foto, showUpload: false }
          : t
      );
    } else if (status === "Keluar") {
      updatedTamuList = tamu.filter((t) => t.id !== id);
      tamuUpdate.fotoKeluar = foto;
    } else if (status === "Ditolak") {
      updatedTamuList = tamu.filter((t) => t.id !== id);
    }

    setTamu(updatedTamuList);

    // 🔹 record simpan realtime
    setRecord([
      ...record,
      {
        hari,
        tanggal,
        jam,
        nama: tamuUpdate.nama,
        instansi: tamuUpdate.instansi,
        aktivitas: tamuUpdate.aktivitas,
        ruangKerja: tamuUpdate.ruangKerja,
        keterangan: tamuUpdate.keterangan,
        status,
        foto:
          status === "Masuk" ? foto : status === "Keluar" ? foto : null,
      },
    ]);
  };

  const filteredRecord = record.filter(
    (r) =>
      r.nama.toLowerCase().includes(search.toLowerCase()) ||
      r.instansi.toLowerCase().includes(search.toLowerCase()) ||
      r.tanggal.includes(search) ||
      r.hari.toLowerCase().includes(search.toLowerCase()) ||
      r.ruangKerja.toLowerCase().includes(search.toLowerCase()) ||
      r.keterangan.toLowerCase().includes(search.toLowerCase())
  );

  const totalTamu = tamu.length;
  const tamuMasuk = tamu.filter((t) => t.status === "Masuk").length;
  const tamuKeluar = record.filter((r) => r.status === "Keluar").length;
  const tamuDitolak = record.filter((r) => r.status === "Ditolak").length;

  return (
    <div className="dashboard-container">
      {/* HEADER */}
      <header className="header">
        <div className="logo-header">
          <img
            src={telkomselImg2}
            alt="Telkomsel Logo"
            className="header-logo"
          />
        </div>
      </header>

      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <button
          className={`sidebar-toggle-btn ${sidebarOpen ? "active" : ""}`}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>

        <nav className="sidebar-nav">
          <ul>
            <img
              src={telkomselImg1}
              alt="Telkomsel Logo"
              className="sidebar-logo"
            />
            <li className="active">Buku Tamu</li>
            <li>Laporan</li>
            <li>Pengaturan</li>
          </ul>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div className="main-content">
        <h3 className="security-title">Buku Tamu</h3>

        {/* RINGKASAN */}
        <section className="summary-section">
          <div className="summary-card bg-red">
            <svg
              className="summary-icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 
              1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 
              1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            <div className="summary-text">
              <div className="summary-title">Total Tamu Hari Ini</div>
              <div className="summary-value">{totalTamu}</div>
            </div>
          </div>
          <div className="summary-card bg-green">
            <svg
              className="summary-icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
            >
              <path d="M9 16.17L4.83 12l-1.42 
              1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
            <div className="summary-text">
              <div className="summary-title">Tamu Masuk</div>
              <div className="summary-value">{tamuMasuk}</div>
            </div>
          </div>
          <div className="summary-card bg-blue">
            <svg
              className="summary-icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
            >
              <path d="M10 17l5-5-5-5v10zm-5 
              0h2V7H5v10zm12-12h-8v2h8v12h-8v2h8c1.1 
              0 2-.9 2-2V7c0-1.1-.9-2-2-2z" />
            </svg>
            <div className="summary-text">
              <div className="summary-title">Tamu Keluar</div>
              <div className="summary-value">{tamuKeluar}</div>
            </div>
          </div>
          <div className="summary-card bg-gray">
            <svg
              className="summary-icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 
                10 10 10 10-4.48 10-10S17.52 2 12 
                2zm5 13.59L15.59 17 12 13.41 
                8.41 17 7 15.59 10.59 12 7 8.41 
                8.41 7 12 10.59 15.59 7 17 8.41 
                13.41 12 17 15.59z"
              />
            </svg>
            <div className="summary-text">
              <div className="summary-title">Tamu Ditolak</div>
              <div className="summary-value">{tamuDitolak}</div>
            </div>
          </div>
        </section>

        {/* DAFTAR TAMU */}
        <section className="table-section">
          <h4>Daftar Tamu</h4>
          <table>
            <thead>
              <tr>
                <th>Hari</th>
                <th>Tanggal</th>
                <th>Nama Lengkap</th>
                <th>Instansi/Vendor</th>
                <th>Aktivitas</th>
                <th>Waktu</th>
                <th>Ruang Kerja</th>
                <th>Keterangan</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {tamu.map((t) => (
                <tr key={t.id}>
                  <td>{t.hari}</td>
                  <td>{t.tanggal}</td>
                  <td>{t.nama}</td>
                  <td>{t.instansi}</td>
                  <td>{t.aktivitas}</td>
                  <td>{t.jam}</td>
                  <td>{t.ruangKerja}</td>
                  <td>{t.keterangan}</td>
                  <td>{t.status}</td>
                  <td>
                    {t.status === "Waiting Approval" && (
                      <>
                        {!t.showUpload ? (
                          <div className="aksi-group">
                            <button
                              className="btn-allow"
                              onClick={() =>
                                setTamu(
                                  tamu.map((x) =>
                                    x.id === t.id
                                      ? { ...x, showUpload: true }
                                      : x
                                  )
                                )
                              }
                            >
                              Approved
                            </button>
                            <button
                              className="btn-deny"
                              onClick={() => updateStatus(t.id, "Ditolak")}
                            >
                              Rejected
                            </button>
                          </div>
                        ) : (
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleUploadFoto(e.target.files[0], (foto) =>
                                updateStatus(t.id, "Masuk", foto)
                              )
                            }
                          />
                        )}
                      </>
                    )}
                    {t.status === "Masuk" && (
                      <>
                        {!t.showUploadKeluar ? (
                          <button
                            className="btn-exit"
                            onClick={() =>
                              setTamu(
                                tamu.map((x) =>
                                  x.id === t.id
                                    ? { ...x, showUploadKeluar: true }
                                    : x
                                )
                              )
                            }
                          >
                            Keluar
                          </button>
                        ) : (
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleUploadFoto(e.target.files[0], (foto) =>
                                updateStatus(t.id, "Keluar", foto)
                              )
                            }
                          />
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* RECORD AKTIVITAS */}
        <section className="record-section">
          <h4>Record Aktivitas</h4>
          <input
            type="text"
            placeholder="Cari nama, instansi, hari, ruang kerja, atau keterangan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <table>
            <thead>
              <tr>
                <th>Hari</th>
                <th>Tanggal</th>
                <th>Nama Lengkap</th>
                <th>Instansi/Vendor</th>
                <th>Aktivitas</th>
                <th>Waktu</th>
                <th>Ruang Kerja</th>
                <th>Keterangan</th>
                <th>Status</th>
                <th>Dokumentasi</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecord.map((r, index) => (
                <tr key={index}>
                  <td>{r.hari}</td>
                  <td>{r.tanggal}</td>
                  <td>{r.nama}</td>
                  <td>{r.instansi}</td>
                  <td>{r.aktivitas}</td>
                  <td>{r.jam}</td>
                  <td>{r.ruangKerja}</td>
                  <td>{r.keterangan}</td>
                  <td>{r.status}</td>
                  <td>
                    {r.foto ? <img src={r.foto} alt="Bukti" width="130" /> : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
