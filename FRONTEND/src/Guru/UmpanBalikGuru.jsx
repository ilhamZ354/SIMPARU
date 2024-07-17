import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import SaranForm from "../components/FormSaran";
import { saranMe, deleteSaran } from "../services/umpanBalik.services";
import { getAllKeputusan } from "../services/keputusan.services";

const UmpanBalikGuru = () => {
    const [buatSaran, setBuatSaran] = useState();
    const [dataSaran, setDataSaran] = useState();
    const [dataKeputusan, setDataKeputusan] = useState([]);

    useEffect(() => {
        fetchKeputusan();
    }, []);

    const fetchKeputusan = async () => {
        try {
            const data = await getAllKeputusan();
            setDataKeputusan(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const fetchSarans = async () => {
            try {
                const data = await saranMe();
                setDataSaran(data);
                console.log(data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchSarans();
    }, []);

    const nomorKolom = (rowData, column) => {
        return column.rowIndex + 1;
    };
    

    const leftContents = (
        <h2 className="text-white">Riwayat keputusan</h2>
    );

    const leftContents2 = (
        <h2 className="text-white">Daftar saran</h2>
    );

    const paginatorLeft2 = <Button type="button" icon="pi pi-refresh" className="p-button-info" text onClick={() => window.location.reload()} />;
    const paginatorRight = <p></p>;
    const paginatorLeft = <p></p>;

    const handleDeleteSaran = async (id) => {
        try {
            await deleteSaran(id);
            alert('Berhasil menghapus keputusan!');
        } catch (error) {
            alert('Keputusan gagal di hapus!')
            console.error('Error deleting keputusan:', error);
        }
    };

    const actionsBodyTemplate = (rowData) => {
        return (
            <div className="text-center">
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger p-mr-2" onClick={() => handleDeleteSaran(rowData._id)} />
            </div>
        );
    };

    const formatDate = (mongoDate) => {
        const date = new Date(mongoDate);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
        return date.toLocaleDateString('id-ID', options);
    };

    return (
            <div className='flex w-full mb-4'>
                <div className='grid grid-flow-row w-full mr-3'>
                {/* keputusan kepsek */}
                <Toolbar left={leftContents} className="bg-sky-800" />
                <div className="flex w-full mb-4" style={{ maxHeight: 'calc(200vh - 160px)' }}>
                    <DataTable
                        value={dataKeputusan}
                        dataKey="_id"
                        rows={5}
                        paginator
                        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                        currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
                        className="w-full text-sm shadow-md"
                        scrollable
                        scrollHeight="flex"
                        scrollDirection="right"
                        tableStyle={{ minWidth: '80vw' }}
                    >
                        <Column header="No" body={nomorKolom} sortable style={{ maxWidth: '3rem' }}></Column>
                        <Column field="kategori" header="Kategori" style={{ minWidth: '8em' }}></Column>
                        <Column field="keputusan" header="Keputusan"></Column>
                        <Column field="target" header="Ditujukan kepada"></Column>
                        <Column field="createdAt" header="Waktu" body={(rowData) => formatDate(rowData.createdAt)}></Column>
                    </DataTable>
                </div>

                <div className='flex w-full'>
                        <div className="flex w-full" style={{width:"60vw", height:"3vw"}}>
                            <Button label="Buat Saran" className="p-button-info shadow-lg" icon="pi pi-plus" onClick={()=>{setBuatSaran(true)}}></Button>
                            <Dialog 
                                header="Buat Saran" 
                                visible={buatSaran} 
                                style={{ width: '45vw', minWidth: '40rem' }} 
                                onHide={() => { if (!buatSaran) return; setBuatSaran(false); }}
                            >
                                <SaranForm setBuatSaran={setBuatSaran}/>
                            </Dialog>
                        </div>
                    </div>
                {/* daftar saran*/}
                <Toolbar left={leftContents2} className="bg-sky-800" />
                <div className="flex w-full mb-4" style={{ maxHeight: 'calc(200vh - 160px)' }}>
                    <DataTable
                        value={dataSaran}
                        dataKey="_id"
                        rows={10}
                        paginator
                        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                        currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft2} paginatorRight={paginatorRight}
                        className="w-full text-sm shadow-md"
                        scrollable
                        scrollHeight="flex"
                        scrollDirection="right"
                        tableStyle={{ minWidth: '80vw' }}
                    >
                        <Column header="No" body={nomorKolom} sortable style={{ maxWidth: '3rem' }}></Column>
                        <Column field="kategori" header="Kategori" style={{maxWidth:'6rem'}}></Column>
                        <Column field="saran" header="Saran" style={{width:'13rem'}}></Column>
                        <Column field="status" header="Status" style={{ maxWidth: '6rem' }}></Column>
                        <Column body={actionsBodyTemplate} style={{ textAlign: 'center', width: '8em', maxWidth: '6rem' }} ></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    )
}

export default UmpanBalikGuru;