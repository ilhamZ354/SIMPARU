import {React, useState, useEffect} from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from "primereact/inputtext";
import { Toolbar } from 'primereact/toolbar';
import { Button } from "primereact/button";
import { Card } from "@material-tailwind/react";
import Bar from "../components/charts/Bar";
import BarOption7 from "../components/charts/BarOption7";
import { getSekolahAsal } from "../services/sekolah.services";

const SekolahKepsek = () =>{
    const [globalFilter, setGlobalFilter] = useState('');
    const [selectedSekolah, setSelectedSekolah] = useState(null);
    const [dataSekolah, setDataSekolah] = useState();

    useEffect(() => {
        const fetchSekolas = async () => {
            try {
                const data = await getSekolahAsal();
                setDataSekolah(data);
                console.log(data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchSekolas();
    }, []);
    
    const nomorKolom = (rowData, column) => {
        return column.rowIndex + 1;
    };

    const sekolah = [
        {
            "no":1,
            'name': 'SMP Negeri 1 kisaran',
            'alamat': 'Kisaran Timur',
            'email': '@smpn1kisaran',
            'total':'12',
        },
        {
            "no":2,
            'name': 'SMP Negeri 2 kisaran',
            'alamat': 'Kisaran Barat',
            'email': '@smpn2kisaran',
            'total':'22',
        },
        {
            "no":3,
            'name': 'SMP Muhammadiyah 22 kisaran',
            'alamat': 'Kisaran Timur',
            'email': '@smpnm22kisaran',
            'total':'30',
        },
        {
            "no":4,
            'name': 'SMP Alwashliyah 10 Meranti',
            'alamat': 'Meranti',
            'email': 'smpalwashliyah10meranti@yahoo.com',
            'total':'4',
        },
        {
            "no":5,
            'name': 'SMP Negeri 5 Kisaran',
            'alamat': 'Kisaran',
            'email': 'smpn5kis@yahoo.co.id',
            'total':'6',
        },
        {
            "no":6,
            'name': 'SMP Daerah Air joman',
            'alamat': 'Kisaran',
            'email': 'smpn5kis@yahoo.co.id',
            'total':'6',
        },
        {
            "no":7,
            'name': 'SMP Kesatuan Meranti',
            'alamat': 'Meranti',
            'email': 'kesatuan_smp@yahoo.co.id',
            'total': '3',
        },
        {
            "no":8,
            'name': 'SMP Kesatuan Meranti',
            'alamat': 'Meranti',
            'email': 'kesatuan_smp@yahoo.co.id',
            'total': '3',
        },
        {
            "no":9,
            'name': 'SMP S Amal Bakti',
            'alamat': 'Sei Kamah',
            'email': 'amalbaktismpswasta@gmail.com',
            'total': '5',
        },
        {
            "no":10,
            'name': 'MTS Negeri 1 Asahan',
            'alamat': 'Rawang Lama',
            'email': 'mtsn1asahan@gmail',
            'total': '10',
        },
    ]
    
    const jumlah = [45,30,28,25,24,22,20,14,14,9]
    const sekolahData = sekolah.map((data)=>{ return data.name })

    const alamatSekolah = { data: jumlah, kategori: sekolahData }

    const rightContents = (
        <div className="flex justify-end w-full">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    value={globalFilter}
                    className="h-8"
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Search"
                />
            </span>
        </div>
    );

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-secondary" text />;
    const paginatorRight = <span></span>;

    return(
        <div className="flex w-full">
            <div className="flex flex-row gap-4 w-full">
                <div className="flex w-2/5">
                    <div className="flex flex-col w-full">
                        <div className="w-full">
                        <Card title="card 1" className="shadow-lg w-full bg-sky-800">
                            <div className="flex flex-col">
                                <span className="flex w-full text-white ml-4 mt-2 text-xs">Grafik pembagian asal sekolah</span>
                                <Bar
                                    data={['SMPN', 'SMPS', 'MTSN', 'MTSN', 'PONTREN', 'SMP IT']}
                                    dataValue={[230, 200, 110, 90, 50, 28]}
                                    theme='dark'
                                    style={{ height: "300px", marginTop: "6px", marginBottom: "5px" }}
                                />
                            </div>
                        </Card>
                        </div>
                        <div className="w-full mt-4">
                        <Card title="card 2" className="shadow-lg w-full bg-sky-800">
                            <div className="flex flex-col mb-3">
                                <span className="flex w-full text-white ml-4 mt-2 text-xs">Grafik persebaran asal sekolah</span>
                                <BarOption7
                                    style={{marginTop:'2px', height:'250px', width:'90%', marginBottom:'5px'}}
                                    datas={alamatSekolah}
                                />
                            </div>
                        </Card>
                        </div>
                    </div>
                </div>
                <div className="flex w-3/5">
                    <div className="w-full">
                    <Card title="card 2" className="shadow-lg w-full">
                        <div className="flex flex-col">
                        <Toolbar right={rightContents} className="h-16"/>
                        <div className="flex w-full mb-42 h-lvh" style={{maxHeight: 'calc(200vh - 160px)'}}>
                            <DataTable 
                                className="text-xs"
                                value={dataSekolah}
                                selectionMode={'checkbox'}
                                selection={selectedSekolah}
                                onSelectionChange={(e) => setSelectedSekolah(e.value)}
                                dataKey="id"
                                rows={20}
                                paginator 
                                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
                                scrollable scrollHeight="flex" tableStyle={{ minWidth: '100%' }}>
                                    <Column field="no" header="No" body={nomorKolom} sortable style={{maxWidth:'3rem'}}></Column>
                                    <Column field="nama_sekolah" header="Nama" style={{minWidth:'10rem'}}></Column>
                                    <Column field="alamat_sekolah" header="Alamat" style={{minWidth:'12rem'}}></Column>
                                    <Column field="total_siswa" header="Total" sortable style={{maxWidth:'6rem'}}></Column>
                                </DataTable>
                            </div>
                        </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SekolahKepsek;