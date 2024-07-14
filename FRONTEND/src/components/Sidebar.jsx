import { React, useState } from 'react';
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import {
  HomeIcon,
  UserIcon,
  ChevronDownIcon,
  AcademicCapIcon,
  BuildingLibraryIcon,
  ChevronRightIcon,
  UsersIcon
} from "@heroicons/react/24/solid";
 
import LogoSMK from '../assets/img/logo-smk-muse.png';
import { Link } from 'react-router-dom';


    const sidebarAdmin = (props) =>{
    const active = props.active;
    
    const [open, setOpen] = useState(0)
    const [open2, setOpen2] = useState(0);
  
    const handleOpen = (value) => {
      setOpen(open === value ? 0 : value);
    };
  
    const handleOpen2 = (value) => {
      setOpen2(open2 === value ? 0 : value);
    };
    
    return(
        <Card className="h-screen w-full max-w-[13rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4 mx-10">
          <div className="flex flex-col justify-center">
            <img className="w-14 drop-shadow-lg" src={LogoSMK} alt="logopolmed" />
          </div>
        </div>
        <List className="text-sm text-slate-600 min-w-max -ml-1">
          {/* dashboard */}
          <Link to="/admin/dashboard">
          <ListItem className={`${(active=='dashboard') ? 'bg-slate-100':'bg-white'} hover:bg-sky-50`}>
            <ListItemPrefix>
              <HomeIcon className="h-4 w-4" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
          </Link>
          {/* User */}
          <Link to='/admin/user'>
          <ListItem className={`${(active=='user') ? 'bg-slate-100':'bg-white'} hover:bg-sky-50`}>
            <ListItemPrefix>
              <UserIcon className="h-4 w-4" />
            </ListItemPrefix>
            User
          </ListItem>
          </Link>
          {/* Siswa */}
          <Accordion open={open === 2}>
            <ListItem className="p-0" selected={open === 2}>
              <AccordionHeader onClick={() => handleOpen(2)} className="border-b-1 p-3 w-full rounded-lg hover:bg-slate-100">
                <ListItemPrefix>
                  <AcademicCapIcon className="h-4 w-4" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto text-sm">
                  Siswa
                </Typography>
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                />
              </AccordionHeader>
            </ListItem>
            {open === 2 && (
              <AccordionBody className="py-1">
                <List className="p-0 text-sm">
                  <Link to="/admin/siswa-baru">
                  <ListItem className={`${(active=='baru') ? 'bg-slate-100':'bg-white'} hover:bg-sky-50`}>
                    <ListItemPrefix>
                      <ChevronRightIcon  strokeWidth={3} className="h-4 w-4" />
                    </ListItemPrefix>
                    Baru
                  </ListItem>
                  </Link>
                  <Link to="/admin/siswa">
                  <ListItem className={`${(active=='siswa') ? 'bg-slate-100':'bg-white'} hover:bg-sky-50`}>
                    <ListItemPrefix>
                      <ChevronRightIcon  strokeWidth={3} className="h-4 w-4" />
                    </ListItemPrefix>
                    Data siswa
                  </ListItem>
                  </Link>
                  <Link to="/admin/geografis-siswa">
                  <ListItem className={`${(active=='geografis-siswa') ? 'bg-slate-100':'bg-white'} hover:bg-sky-50`}>
                    <ListItemPrefix>
                      <ChevronRightIcon  strokeWidth={3} className="h-4 w-4" />
                    </ListItemPrefix>
                    Geografis
                  </ListItem>
                  </Link>
                </List>
              </AccordionBody>
            )}
          </Accordion>
          {/* sekolah */}
          <Accordion open={open2 === 2}>
            <ListItem className="p-0" selected={open2 === 2}>
              <AccordionHeader onClick={() => handleOpen2(2)} className="border-b-1 p-3 w-full rounded-lg hover:bg-slate-100">
                <ListItemPrefix>
                  <BuildingLibraryIcon className="h-4 w-4" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto text-sm">
                  Sekolah Asal
                </Typography>
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 ml-1 transition-transform ${open2 === 1 ? "rotate-180" : ""}`}
                />
              </AccordionHeader>
            </ListItem>
            {open2 === 2 && (
              <AccordionBody className="py-1">
                <List className="p-0 text-sm">
                <Link to="/admin/sekolah">
                  <ListItem className={`${(active=='sekolah') ? 'bg-slate-100':'bg-white'} hover:bg-sky-50`}>
                    <ListItemPrefix>
                      <ChevronRightIcon  strokeWidth={3} className="h-4 w-4" />
                    </ListItemPrefix>
                    Data sekolah
                  </ListItem>
                  </Link>
                  <Link to="/admin/geografis-sekolah">
                  <ListItem className={`${(active=='geografis-sekolah') ? 'bg-slate-100':'bg-white'} hover:bg-sky-50`}>
                    <ListItemPrefix>
                      <ChevronRightIcon  strokeWidth={3} className="h-4 w-4" />
                    </ListItemPrefix>
                    Geografis
                  </ListItem>
                  </Link>
                </List>
              </AccordionBody>
            )}
          </Accordion>
        </List>
      </Card>
    );
  };

  const sidebarSuperAdmin = (props) =>{
    const active = props.active;
    
    const [open3, setOpen3] = useState(0)
    const [open4, setOpen4] = useState(0);
  
    const handleOpen3 = (value) => {
      setOpen3(open3 === value ? 0 : value);
    };
  
    const handleOpen4 = (value) => {
      setOpen4(open4 === value ? 0 : value);
    };
    
    return(
        <Card className="h-screen w-full max-w-[13rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4 mx-10">
        <div className="flex flex-col justify-center">
          <img className="w-14 drop-shadow-lg" src={LogoSMK} alt="logopolmed" />
        </div>
      </div>
      <List className="text-sm text-slate-600 min-w-max -ml-1">
        {/* dashboard */}
        <Link to="/super-admin/dashboard">
        <ListItem className={`${(active=='dashboard') ? 'bg-slate-100':'bg-white'} hover:bg-sky-50`}>
          <ListItemPrefix>
            <HomeIcon className="h-4 w-4" />
          </ListItemPrefix>
          Dashboard
        </ListItem>
        </Link>
        {/* Pengguna */}
        <Accordion open={open3 === 2}>
            <ListItem className="p-0" selected={open3 === 2}>
              <AccordionHeader onClick={() => handleOpen3(2)} className="border-b-1 p-3 w-full rounded-lg hover:bg-slate-100">
                <ListItemPrefix>
                  <UsersIcon className="h-4 w-4" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto text-sm">
                  Pengguna
                </Typography>
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${open3 === 1 ? "rotate-180" : ""}`}
                />
              </AccordionHeader>
            </ListItem>
            {open3 === 2 && (
              <AccordionBody className="py-1">
                <List className="p-0 text-sm">
                  {/* <Link to="/admin/siswa-baru">
                  <ListItem className={`${(active=='baru') ? 'bg-slate-100':'bg-white'} hover:bg-sky-50`}>
                    <ListItemPrefix>
                      <ChevronRightIcon  strokeWidth={3} className="h-4 w-4" />
                    </ListItemPrefix>
                    Baru
                  </ListItem>
            </Link> */}
                  <Link to="/super-admin/kepsek">
                  <ListItem className={`${(active=='siswa') ? 'bg-slate-100':'bg-white'} hover:bg-sky-50`}>
                    <ListItemPrefix>
                      <ChevronRightIcon  strokeWidth={3} className="h-4 w-4" />
                    </ListItemPrefix>
                    Kepala sekolah
                  </ListItem>
                  </Link>
                  <Link to="/super-admin/admin">
                  <ListItem className={`${(active=='geografis-siswa') ? 'bg-slate-100':'bg-white'} hover:bg-sky-50`}>
                    <ListItemPrefix>
                      <ChevronRightIcon  strokeWidth={3} className="h-4 w-4" />
                    </ListItemPrefix>
                    Admin
                  </ListItem>
                  </Link>
                  <Link to="/super-admin/guru">
                  <ListItem className={`${(active=='geografis-siswa') ? 'bg-slate-100':'bg-white'} hover:bg-sky-50`}>
                    <ListItemPrefix>
                      <ChevronRightIcon  strokeWidth={3} className="h-4 w-4" />
                    </ListItemPrefix>
                    Guru
                  </ListItem>
                  </Link>
                </List>
              </AccordionBody>
            )}
          </Accordion>
      </List>
    </Card>
    );
  };

  const sidebarUser = (props) =>{
    const active = props.active;
    
    const [open5, setOpen5] = useState(0)
    const [open6, setOpen6] = useState(0);
  
    const handleOpen5 = (value) => {
      setOpen5(open5 === value ? 0 : value);
    };
  
    const handleOpen6 = (value) => {
      setOpen6(open6 === value ? 0 : value);
    };
    
    return(
        <Card className="h-screen w-full max-w-[13rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4 mx-10">
        <div className="flex flex-col justify-center">
          <img className="w-14 drop-shadow-lg" src={LogoSMK} alt="logopolmed" />
        </div>
      </div>
      <List className="text-sm text-slate-600 min-w-max -ml-1">
        {/* dashboard */}
        <Link to="/dashboard">
        <ListItem className={`${(active=='dashboard') ? 'bg-slate-100':'bg-white'} hover:bg-sky-50`}>
          <ListItemPrefix>
            <HomeIcon className="h-4 w-4" />
          </ListItemPrefix>
          Dashboard
        </ListItem>
        </Link>
        {/* Siswa */}
        <Accordion open={open5 === 2}>
            <ListItem className="p-0" selected={open5 === 2}>
              <AccordionHeader onClick={() => handleOpen5(2)} className="border-b-1 p-3 w-full rounded-lg hover:bg-slate-100">
                <ListItemPrefix>
                  <AcademicCapIcon className="h-4 w-4" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto text-sm">
                  Siswa
                </Typography>
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${open5 === 1 ? "rotate-180" : ""}`}
                />
              </AccordionHeader>
            </ListItem>
            {open5 === 2 && (
              <AccordionBody className="py-1">
                <List className="p-0 text-sm">
                  {/* <Link to="/admin/siswa-baru">
                  <ListItem className={`${(active=='baru') ? 'bg-slate-100':'bg-white'} hover:bg-sky-50`}>
                    <ListItemPrefix>
                      <ChevronRightIcon  strokeWidth={3} className="h-4 w-4" />
                    </ListItemPrefix>
                    Baru
                  </ListItem>
            </Link> */}
                  <Link to="/siswa">
                  <ListItem className={`${(active=='siswa') ? 'bg-slate-100':'bg-white'} hover:bg-sky-50`}>
                    <ListItemPrefix>
                      <ChevronRightIcon  strokeWidth={3} className="h-4 w-4" />
                    </ListItemPrefix>
                    Data siswa
                  </ListItem>
                  </Link>
                  <Link to="/geografis-siswa">
                  <ListItem className={`${(active=='geografis-siswa') ? 'bg-slate-100':'bg-white'} hover:bg-sky-50`}>
                    <ListItemPrefix>
                      <ChevronRightIcon  strokeWidth={3} className="h-4 w-4" />
                    </ListItemPrefix>
                    Geografis
                  </ListItem>
                  </Link>
                </List>
              </AccordionBody>
            )}
          </Accordion>
        {/* sekolah */}
        <Accordion open={open6 === 2}>
          <ListItem className="p-0" selected={open6 === 2}>
            <AccordionHeader onClick={() => handleOpen6(2)} className="border-b-1 p-3 w-full rounded-lg hover:bg-slate-100">
              <ListItemPrefix>
                <BuildingLibraryIcon className="h-4 w-4" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto text-sm">
                Sekolah Asal
              </Typography>
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 ml-1 transition-transform ${open6 === 1 ? "rotate-180" : ""}`}
              />
            </AccordionHeader>
          </ListItem>
          {open6 === 2 && (
            <AccordionBody className="py-1">
              <List className="p-0 text-sm">
              <Link to="/sekolah">
                <ListItem className={`${(active=='sekolah') ? 'bg-slate-100':'bg-white'} hover:bg-sky-50`}>
                  <ListItemPrefix>
                    <ChevronRightIcon  strokeWidth={3} className="h-4 w-4" />
                  </ListItemPrefix>
                  Data sekolah
                </ListItem>
                </Link>
                <Link to="/geografis-sekolah">
                <ListItem className={`${(active=='geografis') ? 'bg-slate-100':'bg-white'} hover:bg-sky-50`}>
                  <ListItemPrefix>
                    <ChevronRightIcon  strokeWidth={3} className="h-4 w-4" />
                  </ListItemPrefix>
                  Geografis
                </ListItem>
                </Link>
              </List>
            </AccordionBody>
          )}
        </Accordion>
      </List>
    </Card>
    );
  };

const Sidebar = (props) => {
    const title = props.title;
    const active = props.active;

    let SidebarComponent;

    switch(title){
        case 'admin':
            SidebarComponent = sidebarAdmin;
            break;
        case 'super-admin':
            SidebarComponent = sidebarSuperAdmin;
            break;
        case 'user':
          SidebarComponent = sidebarUser;
            break;
        default:
            SidebarComponent = () => { <span>tidak ada sidebar</span>};
    }

    return (
        <SidebarComponent active={active}/>
    )
};

export default Sidebar;