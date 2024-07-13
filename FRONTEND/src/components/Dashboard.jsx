import Rightbar from '../components/charts/Rightbar';
import Line from './../components/charts/Line'
import { FcManager, FcBusinesswoman } from "react-icons/fc";
import { GrCloudComputer } from "react-icons/gr";
import { SiGoogleearthengine } from "react-icons/si";
import { BsMotherboard } from "react-icons/bs";
import { PiEngine } from "react-icons/pi";
import { Card } from '@material-tailwind/react';
import styled from 'styled-components';
import { IoIosTrendingDown,IoIosTrendingUp } from "react-icons/io";
import { FaCaretUp, FaCaretDown } from "react-icons/fa6";
import Roket from './.././assets/img/roket-image.png';
import Radial from '../components/charts/Radial';
import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';
import Bar from '../components/charts/Bar';
import Cookies from 'js-cookie';

const Dashboard = (user) =>{

    const userLogin = Cookies.get('user');
    const jurusan = [
        { name :'Teknik Komputer dan Jaringan'},
        { name : 'Teknik dan Bisnis Sepeda Motor'},
        { name : 'Teknik Audio Video'},
        { name : 'Teknik Bodi Otomotif'}
    ]

    const [selectedJurusan, setSelectedJurusan] = useState(jurusan[0]);

    return(
            <div className='flex w-full'>
                <div className='flex flex-col'>

                    {/* bagian atas */}
                    <span>{userLogin.nama}</span>
                    <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
                        <div className="w-full">
                            <Card title="Card 1" className="shadow-lg w-full hover:translate-y-2" style={{width:'19vw'}}>
                                <div className='flex flex-row m-2'>
                                    <div className='bg-sky-50 rounded-lg'>
                                        <IoIosTrendingUp className='w-12 text-green-600 m-2' style={{width:'4em', height:'4em'}}/>
                                    </div>
                                    <div className='flex flex-col m-2'>
                                        <div className='flex flex-row'>
                                            <FaCaretUp className='text-green-600' style={{height:'2em'}}/>
                                            <span className='ml-2 mt-1 text-slate-500 text-xs'>Angka kenaikan</span>
                                        </div>
                                        <span className='text-slate-700 text-2xl font-bold'>0%</span>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="w-full">
                            <Card title="Card 2" className="shadow-lg w-full hover:translate-y-2" style={{width:'19vw'}}>
                                    <div className='flex flex-row m-2'>
                                        <div className='bg-sky-50 rounded-lg'>
                                            <IoIosTrendingDown className='w-12 text-rose-600 m-2' style={{width:'4em', height:'4em'}}/>
                                        </div>
                                        <div className='flex flex-col m-2'>
                                            <div className='flex flex-row'>
                                                <FaCaretDown className='text-rose-600' style={{height:'2em'}}/>
                                                <span className='ml-2 mt-1 text-slate-500 text-xs'>Angka penurunan</span>
                                            </div>
                                            <span className='text-slate-700 text-2xl font-bold'>10%</span>
                                        </div>
                                    </div>
                                </Card>
                        </div>
                        <div className="w-full">
                        <Card title="Card 3" className="shadow-lg w-full hover:translate-y-2" style={{width:'19vw'}}>
                                    <div className='flex flex-row m-2'>
                                        <div className='bg-sky-50 rounded-lg'>
                                            <FcManager className='w-12 m-2' style={{width:'4em', height:'4em'}}/>
                                        </div>
                                        <div className='flex flex-col m-2'>
                                            <span className='mt-1 text-slate-500 text-xs'>Laki-laki</span>
                                            <span className='text-slate-700 text-2xl font-bold'>562</span>
                                        </div>
                                    </div>
                                </Card>
                        </div>
                        <div className="w-full">
                        <Card title="Card 4" className="shadow-lg w-full hover:translate-y-2" style={{width:'19vw'}}>
                                    <div className='flex flex-row m-2'>
                                        <div className='bg-sky-50 rounded-lg'>
                                            <FcBusinesswoman className='w-12 m-2' style={{width:'4em', height:'4em'}}/>
                                        </div>
                                        <div className='flex flex-col m-2'>
                                            <span className='mt-1 text-slate-500 text-xs'>Perempuan</span>
                                            <span className='text-slate-700 text-2xl font-bold'>447</span>
                                        </div>
                                    </div>
                                </Card>
                        </div>
                    </div>

                    {/* bagian tengah */}
                    <div className='flex w-full gap-4 mt-4'>
                        <div className='w-2/3'>
                            <Card title='card 1' className='shadow-lg w-full'>
                                <span className='text-slate-400 font-sans text-xs ml-3 mt-2'>Grafik peminatan</span>
                                <div className='flex flex-row m-3'>
                                    <div className='w-2/3 border border-slate-300 rounded-xl bg-sky-700'>
                                        <Line
                                        data={['2019', '2020', '2021', '2022', '2023']}
                                        dataValue={[675, 640, 580, 500, 473]}
                                        style={{ height: "210px", width:'100%', marginLeft:"2px", marginTop: "3px", marginBottom: "5px" }}
                                        />
                                    </div>
                                    <div className='w-1/3 bg-sky-50 ml-2 rounded-xl'>
                                        <div className='flex flex-col justify-center'>
                                            <span className='text-center mt-3 text-xl font-semibold text-sky-800'>Jumlah siswa 2023</span>
                                            <div className='text-center text-3xl mt-2 border-4 border-sky-800 rounded-lg m-4 bg-sky-800'><span className='m-2 text-white text-bold'>1009</span></div>
                                            <img className='mx-12' src={Roket} alt="gambarroket" style={{height:'6em', width:'6em'}} />
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className='w-1/3'>
                            <Card title='card 2' className='shadow-lg w-full'>
                            <span className='text-slate-400 font-sans text-xs ml-3 mt-2'>Rasio nilai rata-rata siswa baru</span>
                                <Radial/>
                            </Card>
                        </div>
                    </div>

                    {/* bagian bawah */}
                    <div className='flex w-full gap-4 mt-4'>
                        <div className='w-2/3'>
                            <Card title='card 1' className='shadow-lg w-full'>
                                <span className='text-slate-400 font-sans text-xs ml-3 mt-2'>Grafik jurusan siswa baru</span>
                                <div className='flex flex-col m-3'>
                                    <div className='flex w-full rounded-2xl bg-white mt-1 border border-slate-200'>
                                        <Rightbar
                                        style={{ height: '310px', width: '642px', marginTop:"-40px", marginBottom: "-30px"}}
                                        />
                                    </div>
                                    <div className='flex flex-row gap-4 mt-3'>
                                        <div className='w-1/4'>
                                            <Card title='card bawah 1' className='shadow-lg w-full hover:-translate-y-1'>
                                            <div className='flex flex-row m-2'>
                                                <div className='bg-sky-700 rounded-lg text-white'>
                                                    <GrCloudComputer className='w-12 m-2' style={{width:'2em', height:'2em'}}/>
                                                </div>
                                                <div className='flex flex-col m-2'>
                                                    <span className='text-sky-400 text-xl font-mono'>TKJ</span>
                                                    <span className='text-rose-500 text-2xl font-bold'>65</span>
                                                </div>
                                            </div>
                                            </Card>
                                        </div>
                                        <div className='w-1/4'>
                                            <Card title='card bawah 2' className='shadow-lg w-full hover:-translate-y-1'>
                                                <div className='flex flex-row m-2'>
                                                <div className='bg-sky-700 rounded-lg text-white'>
                                                    <SiGoogleearthengine className='w-12 m-2' style={{width:'2em', height:'2em'}}/>
                                                </div>
                                                <div className='flex flex-col m-2'>
                                                    <span className='text-sky-400 text-xl font-mono'>TBSM</span>
                                                    <span className='text-rose-500 text-2xl font-bold'>80</span>
                                                </div>
                                            </div>
                                            </Card>
                                        </div>
                                        <div className='w-1/4'>
                                            <Card title='card bawah 1' className='shadow-lg w-full hover:-translate-y-1'>
                                                <div className='flex flex-row m-2'>
                                                <div className='bg-sky-700 rounded-lg text-white'>
                                                    <BsMotherboard className='w-12 m-2' style={{width:'2em', height:'2em'}}/>
                                                </div>
                                                <div className='flex flex-col m-2'>
                                                    <span className='text-sky-400 text-xl font-mono'>TAV</span>
                                                    <span className='text-rose-500 text-2xl font-bold'>25</span>
                                                </div>
                                            </div>
                                            </Card>
                                        </div>
                                        <div className='w-1/4'>
                                            <Card title='card bawah 1' className='shadow-lg w-full hover:-translate-y-1'>
                                                <div className='flex flex-row m-2'>
                                                <div className='bg-sky-700 rounded-lg text-white'>
                                                    <PiEngine className='w-12 m-2' style={{width:'2em', height:'2em'}}/>
                                                </div>
                                                <div className='flex flex-col m-2'>
                                                    <span className='text-sky-400 text-xl font-mono'>TBO</span>
                                                    <span className='text-rose-500 text-2xl font-bold'>34</span>
                                                </div>
                                            </div>
                                            </Card>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className='w-1/3'>
                            <Card title='card 2' className='shadow-lg w-full'>
                            <span className='text-slate-400 font-sans text-xs ml-5 mt-2'>Grafik setiap jurusan</span>
                            <Dropdown className='m-2 mt-4 text-xs border-none' value={selectedJurusan} onChange={(e) => setSelectedJurusan(e.value)} options={jurusan} optionLabel="name"/>
                                <Bar
                                    data={['2020', '2021', '2022', '2023', '2024']}
                                    dataValue={[100, 200, 210, 100, 250]}
                                    theme='light'
                                    style={{ height: "300px", marginTop: "6px", marginBottom: "5px" }}
                                    />
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        
    );
};

export default Dashboard;