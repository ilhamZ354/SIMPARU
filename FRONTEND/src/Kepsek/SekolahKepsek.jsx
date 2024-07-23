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

const SekolahKepsek = ({ siswaData }) =>{
    const [globalFilter, setGlobalFilter] = useState('');
    const [selectedSekolah, setSelectedSekolah] = useState(null);
    const [dataSekolah, setDataSekolah] = useState();

    console.log(siswaData)
    const defaultData = { };
    const grafikSekolah = siswaData.sekolahCount ? siswaData.sekolahCount : defaultData;
    const grafikJenisSekolah = siswaData.jenisSekolahCount ? siswaData.jenisSekolahCount : defaultData;

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

    const sekolah = Object.keys(grafikSekolah)
    
    const jumlah = Object.values(grafikSekolah)

    const alamatSekolah = { data: jumlah, kategori: sekolah }

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
                                    data={Object.keys(grafikJenisSekolah)}
                                    dataValue={Object.values(grafikJenisSekolah)}
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