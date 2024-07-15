import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./Login";
import Pages from './components/Page';

// admin
import DashboardAdmin from './Admin/Dashboard';
import Baru from './Admin/Baru';
import Siswa from './Admin/SiswaAdmin.jsx';
import UmpanBalik from './Admin/UmpanBalik.jsx';

//kepsek
import DashboardOwner from './Kepsek/Dashboard.jsx';
import UmpanBalikKepsek from './Kepsek/UmpanBalik.jsx';
import SiswaKepsek from './Kepsek/SiswaKepsek.jsx';
import GeografisSiswaKepsek from './Kepsek/GeografisSiswaKepsek.jsx';
import SekolahKepsek from './Kepsek/SekolahKepsek.jsx';
import GeografisSekolahOwner from './Kepsek/GeografisSekolahKepsek.jsx';

//guru
import DashboardUser from './Siswa/DashboardUser.jsx';
import GeografisSekolahUser from './Siswa/GeografisSekolahUser.jsx';
import SekolahUser from './Siswa/SekolahUser.jsx';
import SiswaUser from './Siswa/SiswaUser.jsx';
import GeografisSiswaUser from './Siswa/GeografisSekolahUser.jsx';

// super admin
import Kepsek from './SuperAdmin/Kepsek.jsx';
import DashboardSuperAdmin from './SuperAdmin/Dashboard.jsx';
import Admin from './SuperAdmin/Admin';
import Guru from './SuperAdmin/Guru.jsx';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

function App() {
  const dashboardAdmin = <DashboardAdmin />
  const siswabaru = <Baru/>
  const siswa = <Siswa/>
  const siswaKepsek = <SiswaKepsek/>
  const umpanBalikAdmin = <UmpanBalik/>
  const dashboardOwner = <DashboardOwner/>
  const umpanBalikKepsek = <UmpanBalikKepsek/>
  const geoSiswaOwner = <GeografisSiswaKepsek/>
  const sekolahKepsek = <SekolahKepsek/>
  const geoSekolahOwner = <GeografisSekolahOwner/>
  const dashboardUser = <DashboardUser/>
  const siswaUser = <SiswaUser/>
  const geoSiswaUser = <GeografisSiswaUser/>
  const sekolahUser = <SekolahUser/>
  const geoSekolahUser = <GeografisSekolahUser/>

  const dashboardSuperAdmin = <DashboardSuperAdmin />
  const kepsek = <Kepsek/>
  const admin = <Admin/>
  const guru = <Guru/>

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* super admin */}
        <Route path="/super-admin/dashboard" element={<Pages title="super-admin" active='dashboard' page={dashboardSuperAdmin} />} />
        <Route path="/super-admin/kepsek" element={<Pages title="super-admin" active='kepsek' page={kepsek} />} />
        <Route path="/super-admin/admin" element={<Pages title="super-admin" active='admin' page={admin} />} />
        <Route path="/super-admin/guru" element={<Pages title="super-admin" active='guru' page={guru} />} />

        {/* admin */}
        <Route path="/admin/dashboard" element={<Pages title="admin" active='dashboard' page={dashboardAdmin} />} />
        <Route path="/admin/siswa-baru" element={<Pages active="baru" title="admin" page={siswabaru} />} />
        <Route path="/admin/siswa" element={<Pages active="siswa" title="admin" page={siswa} />} />
        <Route path="/admin/umpan-balik" element={<Pages active="umpanbalik" title="admin" page={umpanBalikAdmin} />} />

        {/* Kepala sekolah */}
        <Route path="/kepala-sekolah/dashboard" element={<Pages active="dashboard" title="kepala-sekolah" page={dashboardOwner} />} />
        <Route path="/kepala-sekolah/umpan-balik" element={<Pages active="umpanbalik" title="kepala-sekolah" page={umpanBalikKepsek} />} />
        <Route path="/kepala-sekolah/siswa" element={<Pages active="siswa" title="kepala-sekolah" page={siswaKepsek} />} />
        <Route path="/kepala-sekolah/geografis-siswa" element={<Pages active="geografis-siswa" title="kepala-sekolah" page={geoSiswaOwner} />} />
        <Route path="/kepala-sekolah/sekolah" element={<Pages active="sekolah" title="kepala-sekolah" page={sekolahKepsek} />} />
        <Route path="/kepala-sekolah/geografis-sekolah" element={<Pages active="geografis-sekolah" title="kepala-sekolah" page={geoSekolahOwner} />} />

        {/* user */}
         <Route path="/dashboard" element={<Pages active="dashboard" title="user" page={dashboardUser} />} />
        <Route path="/siswa" element={<Pages active="siswa" title="user" page={siswaUser} />} />
        <Route path="/geografis-siswa" element={<Pages active="geografis-siswa" title="user" page={geoSiswaUser} />} />
        <Route path="/sekolah" element={<Pages active="sekolah" title="user" page={sekolahUser} />} />
        <Route path="/geografis-sekolah" element={<Pages active="geografis-sekolah" title="user" page={geoSekolahUser} />} />
      </Routes>
    </Router>
  );
}

export default App;