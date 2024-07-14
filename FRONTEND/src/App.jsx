import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./Login";
import Pages from './components/Page';
import DashboardAdmin from './Admin/Dashboard';
import User from './Admin/User';
import Baru from './Admin/Baru';
import Siswa from './Admin/Siswa';
import Sekolah from './Admin/Sekolah';
import GeografisSekolah from './Admin/GeografisSekolah';
import GeografisSiswa from './Admin/GeografisSiswa';
import DashboardOwner from './Owner/DashboardOwner';
import SiswaOwner from './Owner/SiswaOwner';
import GeografisSiswaOwner from './Owner/GeografisSiswaOwner';
import SekolahOwner from './Owner/SekolahOwner';
import GeografisSekolahOwner from './Owner/GeografisSekolahOwner.jsx';
import DashboardUser from './Siswa/DashboardUser.jsx';
import GeografisSekolahUser from './Siswa/GeografisSekolahUser.jsx';
import SekolahUser from './Siswa/SekolahUser.jsx';
import SiswaUser from './Siswa/SiswaUser.jsx';
import GeografisSiswaUser from './Siswa/GeografisSekolahUser.jsx';
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
  const user = <User/>
  const siswabaru = <Baru/>
  const siswa = <Siswa/>
  const sekolah = <Sekolah/>
  const geografisSiswa = <GeografisSiswa/>
  const geografis = <GeografisSekolah/>
  const dashboardOwner = <DashboardOwner/>
  const siswaOwner = <SiswaOwner/>
  const geoSiswaOwner = <GeografisSiswaOwner/>
  const sekolahOwner = <SekolahOwner/>
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
        <Route path="/admin/user" element={<Pages active="user" title="admin" page={user} />} />
        <Route path="/admin/siswa-baru" element={<Pages active="baru" title="admin" page={siswabaru} />} />
        <Route path="/admin/siswa" element={<Pages active="siswa" title="admin" page={siswa} />} />
        <Route path="/admin/geografis-siswa" element={<Pages active="geografis-siswa" title="admin" page={geografisSiswa} />} />
        <Route path="/admin/sekolah" element={<Pages active="sekolah" title="admin" page={sekolah} />} />
        <Route path="/admin/geografis-sekolah" element={<Pages active="geografis-sekolah" title="admin" page={geografis} />} />

        {/* owner */}
        <Route path="/owner/dashboard" element={<Pages active="dashboard" title="owner" page={dashboardOwner} />} />
        <Route path="/owner/admin" element={<Pages active="admin" title="owner" page={admin} />} />
        <Route path="/owner/siswa" element={<Pages active="siswa" title="owner" page={siswaOwner} />} />
        <Route path="/owner/geografis-siswa" element={<Pages active="geografis-siswa" title="owner" page={geoSiswaOwner} />} />
        <Route path="/owner/sekolah" element={<Pages active="sekolah" title="owner" page={sekolahOwner} />} />
        <Route path="/owner/geografis-sekolah" element={<Pages active="geografis-sekolah" title="owner" page={geoSekolahOwner} />} />

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