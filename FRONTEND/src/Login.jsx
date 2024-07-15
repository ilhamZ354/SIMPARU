// src/Login.js
import React, { useEffect, useState } from 'react';
import LoginImage from './assets/img/login-gambar.jpg';
import LogoSMK from './assets/img/logo-smk-muse.png';
import Toggle from './components/Toggle';
import { login } from './services/user.service';
import { useNavigate  } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState('');
    const navigateTo = useNavigate ();
    const [remember, setRemember] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            const data = await login(username, password);
            console.log('Login successful:', data);
            setUser(data);
            Cookies.set('access_token', data.token, { expires: remember ? 6 : null });
            Cookies.set('user', data, { expires: remember ? 6 : null });
        } catch (error) {
            setError(error.message);
            return navigateTo('/')
        }
    };

    useEffect(() => {
        if(user && user.status==true){
            if(user.user.level=='kepala-sekolah'){
                alert('login berhasil, selamat datang kepala sekolah')
                navigateTo('/kepala-sekolah/dashboard')
            }else if(user.user.level=='admin'){
                alert('login berhasil, selamat datang admin')
                navigateTo('/admin/dashboard')
            }else if(user.user.level=='super-admin'){
                alert('login berhasil, selamat datang super admin')
                navigateTo('/super-admin/dashboard')
            }else{
                alert('login berhasil, selamat datang guru')
                navigateTo('/dashboard')
            }
        }else{
            navigateTo('/')
        }
    },[user, navigateTo])

    return (
        <div className="flex h-screen bg-sky-100 ">
            <div className='flex w-62 m-auto content-center'>
                <div className='flex bg-white mx-4 my-4 m-auto rounded-xl shadow-lg'>
                    <div className='flex w-3/6 justify-center'>
                        <div className="p-6">
                            <div className='flex flex-col'>
                                <div className='flex w-full justify-center'>
                                    <img className='w-28' src={LogoSMK} alt="logopolmed" />
                                </div>
                                <div className='flex w-full justify-center'>
                                    <p className='font-bold font-serif text-sky-500 text-xl'>SIMPARU</p>
                                </div>
                                <div className='flex w-full justify-center'>
                                    <p className='text-center font-normal font-serif text-sky-300 text-sm'>(Sistem Informasi Laporan Penerimaan Siswa Baru)</p>
                                </div>
                                <div className='flex w-full justify-center'>
                                    <hr className="border-t-1 border-gray-300 w-full mb-2 mt-6" />
                                </div>
                            </div>
                            <form className="mt-4" onSubmit={handleLogin}>
                                <div>
                                    <label className="block text-slate-500">Username</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="mt-4">
                                    <label className="block text-slate-500">Password</label>
                                    <input
                                        type="password"
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className='flex w-full mt-4'>
                                    <Toggle onToggle={(checked) => setRemember(checked)} />
                                    <p className='text-sm text-slate-400 font-sans ml-2'> Remember Login</p>
                                </div>
                                <div className="mt-6">
                                    <button className="w-full px-4 py-2 tracking-wide text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                                        Login
                                    </button>
                                </div>
                                {error && <p className="mt-4 text-red-500 text-center">Login Gagal</p>}
                            </form>
                        </div>
                    </div>
                    <div className='flex w-4/6'>
                        <img src={LoginImage} alt="login-image" className="w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
