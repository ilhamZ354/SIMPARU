import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./Login";
import Pages from './components/Page';
import ProtectedRoute from './protectedRoute.jsx';
// admin
import DashboardAdmin from './Admin/Dashboard';
import Baru from './Admin/Baru';
import Siswa from './Admin/SiswaAdmin.jsx';
import UmpanBalik from './Admin/UmpanBalik.jsx';

//kepsek
import DashboardKepsek from './Kepsek/Dashboard.jsx';
import UmpanBalikKepsek from './Kepsek/UmpanBalik.jsx';
import SiswaKepsek from './Kepsek/SiswaKepsek.jsx';
import GeografisSiswaKepsek from './Kepsek/GeografisSiswaKepsek.jsx';
import SekolahKepsek from './Kepsek/SekolahKepsek.jsx';
import GeografisSekolahOwner from './Kepsek/GeografisSekolahKepsek.jsx';

//guru
import DashboardGuru from './Guru/DashboardGuru.jsx';
import UmpanBalikGuru from './Guru/UmpanBalikGuru.jsx';
import GeografisSekolahGuru from './Guru/GeografisSekolahGuru.jsx';
import SekolahGuru from './Guru/SekolahGuru.jsx';
import SiswaGuru from './Guru/SiswaGuru.jsx';
import GeografisSiswaGuru from './Guru/GeografisSiswaGuru.jsx';

// super admin
import Kepsek from './SuperAdmin/Kepsek.jsx';
import DashboardSuperAdmin from './SuperAdmin/Dashboard.jsx';
import Admin from './SuperAdmin/Admin';
import Guru from './SuperAdmin/Guru.jsx';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

import { useState } from 'react';

function App() {
  const [siswaData, setSiswaData] = useState([]);

  const dashboardAdmin = <DashboardAdmin siswaData={siswaData} />
  const siswabaru = <Baru/>
  const siswa = <Siswa/>
  const siswaKepsek = <SiswaKepsek siswaData={siswaData}/>
  const umpanBalikAdmin = <UmpanBalik/>
  const dashboardOwner = <DashboardKepsek siswaData={siswaData}/>
  const umpanBalikKepsek = <UmpanBalikKepsek/>
  const geoSiswaOwner = <GeografisSiswaKepsek siswaData={siswaData}/>
  const sekolahKepsek = <SekolahKepsek siswaData={siswaData}/>
  const geoSekolahOwner = <GeografisSekolahOwner siswaData={siswaData}/>
  const dashboardUser = <DashboardGuru siswaData={siswaData}/>
  const siswaGuru = <SiswaGuru siswaData={siswaData}/>
  const geoSiswaGuru = <GeografisSiswaGuru siswaData={siswaData}/>
  const sekolahGuru = <SekolahGuru siswaData={siswaData}/>
  const geoSekolahGuru = <GeografisSekolahGuru siswaData={siswaData}/>
  const umpanBalikGuru = <UmpanBalikGuru/>
  const dashboardSuperAdmin = <DashboardSuperAdmin siswaData={siswaData} />
  const kepsek = <Kepsek/>
  const admin = <Admin/>
  const guru = <Guru/>

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* super admin */}
        <Route path="/super-admin/dashboard" element={<ProtectedRoute><Pages setSiswaData={setSiswaData} title="super-admin" active='dashboard' page={dashboardSuperAdmin} /></ProtectedRoute>} />
        <Route path="/super-admin/kepsek" element={<ProtectedRoute><Pages title="super-admin" active='kepsek' page={kepsek} /></ProtectedRoute>} />
        <Route path="/super-admin/admin" element={<ProtectedRoute><Pages title="super-admin" active='admin' page={admin} /></ProtectedRoute>} />
        <Route path="/super-admin/guru" element={<ProtectedRoute><Pages title="super-admin" active='guru' page={guru} /></ProtectedRoute>} />

        {/* admin */}
        <Route path="/admin/dashboard" element={<ProtectedRoute><Pages setSiswaData={setSiswaData} title="admin" active='dashboard' page={dashboardAdmin} /></ProtectedRoute>} />
        <Route path="/admin/siswa-baru" element={<ProtectedRoute><Pages active="baru" title="admin" page={siswabaru} /></ProtectedRoute>} />
        <Route path="/admin/siswa" element={<ProtectedRoute><Pages active="siswa" title="admin" page={siswa} /></ProtectedRoute>} />
        <Route path="/admin/umpan-balik" element={<ProtectedRoute><Pages active="umpanbalik" title="admin" page={umpanBalikAdmin} /></ProtectedRoute>} />

        {/* Kepala sekolah */}
        <Route path="/kepala-sekolah/dashboard" element={<ProtectedRoute><Pages setSiswaData={setSiswaData} active="dashboard" title="kepala-sekolah" page={dashboardOwner} /></ProtectedRoute>} />
        <Route path="/kepala-sekolah/umpan-balik" element={<ProtectedRoute><Pages active="umpanbalik" title="kepala-sekolah" page={umpanBalikKepsek} /></ProtectedRoute>} />
        <Route path="/kepala-sekolah/siswa" element={<ProtectedRoute><Pages setSiswaData={setSiswaData} active="siswa" title="kepala-sekolah" page={siswaKepsek} /></ProtectedRoute>} />
        <Route path="/kepala-sekolah/geografis-siswa" element={<ProtectedRoute><Pages setSiswaData={setSiswaData} active="geografis-siswa" title="kepala-sekolah" page={geoSiswaOwner} /></ProtectedRoute>} />
        <Route path="/kepala-sekolah/sekolah" element={<ProtectedRoute><Pages active="sekolah" title="kepala-sekolah" page={sekolahKepsek} /></ProtectedRoute>} />
        <Route path="/kepala-sekolah/geografis-sekolah" element={<ProtectedRoute><Pages setSiswaData={setSiswaData} active="geografis-sekolah" title="kepala-sekolah" page={geoSekolahOwner} /></ProtectedRoute>} />

        {/* guru */}
        <Route path="/dashboard" element={<ProtectedRoute><Pages setSiswaData={setSiswaData} active="dashboard" title="guru" page={dashboardUser} /></ProtectedRoute>} />
        <Route path="/umpan-balik" element={<ProtectedRoute><Pages active="umpanbalik" title="guru" page={umpanBalikGuru} /></ProtectedRoute>} />
        <Route path="/siswa" element={<ProtectedRoute><Pages setSiswaData={setSiswaData} active="siswa" title="guru" page={siswaGuru} /></ProtectedRoute>} />
        <Route path="/geografis-siswa" element={<ProtectedRoute><Pages setSiswaData={setSiswaData} active="geografis-siswa" title="guru" page={geoSiswaGuru} /></ProtectedRoute>} />
        <Route path="/sekolah" element={<ProtectedRoute><Pages setSiswaData={setSiswaData} active="sekolah" title="guru" page={sekolahGuru} /></ProtectedRoute>} />
        <Route path="/geografis-sekolah" element={<ProtectedRoute><Pages setSiswaData={setSiswaData} active="geografis-sekolah" title="guru" page={geoSekolahGuru} /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;