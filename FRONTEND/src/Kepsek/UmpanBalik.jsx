import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import FormKeputusan from "../components/KeputusanForm";

const UmpanBalikKepsek = () => {
    const [buatKeputusan, setBuatKeputusan] = useState();

    const leftContents = (
        <h2 className="text-white">Riwayat keputusan</h2>
    );

    const leftContents2 = (
        <h2 className="text-white">Daftar saran</h2>
    );

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-info" text onClick={() => window.location.reload()} />;
    const paginatorRight = <p></p>;

    return (
            <div className='flex w-full mb-4'>
                <div className='grid grid-flow-row w-full mr-3'>
                    <div className='flex w-full'>
                        <div className="flex w-full" style={{width:"60vw", height:"3vw"}}>
                            <Button label="Buat keputusan" className="p-button-info shadow-lg" icon="pi pi-plus" onClick={()=>{setBuatKeputusan(true)}}></Button>
                            <Dialog 
                                header="Buat keputusan" 
                                visible={buatKeputusan} 
                                style={{ width: '45vw', minWidth: '40rem' }} 
                                onHide={() => { if (!buatKeputusan) return; setBuatKeputusan(false); }}
                            >
                                <FormKeputusan />
                            </Dialog>
                        </div>
                    </div>
                {/* keputusan kepsek */}
                <Toolbar left={leftContents} className="bg-sky-800" />
                <div className="flex w-full mb-4" style={{ maxHeight: 'calc(200vh - 160px)' }}>
                    <DataTable
                        value={[]}
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
                        <Column header="No" body={''} sortable style={{ maxWidth: '3rem' }}></Column>
                        <Column field="nama" header="Kategori" style={{ minWidth: '8em' }}></Column>
                        <Column field="username" header="Keputusan"></Column>
                        <Column field="email" header="Ditujukan kepada"></Column>
                        <Column field="tanggal" header="Tanggal"></Column>
                    </DataTable>
                </div>

                {/* daftar saran*/}
                <Toolbar left={leftContents2} className="bg-sky-800" />
                <div className="flex w-full mb-4" style={{ maxHeight: 'calc(200vh - 160px)' }}>
                    <DataTable
                        value={[]}
                        dataKey="_id"
                        rows={10}
                        paginator
                        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                        currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
                        className="w-full text-sm shadow-md"
                        scrollable
                        scrollHeight="flex"
                        scrollDirection="right"
                        tableStyle={{ minWidth: '80vw' }}
                    >
                        <Column header="No" body={''} sortable style={{ maxWidth: '3rem' }}></Column>
                        <Column field="nama" header="Nama guru" style={{ minWidth: '8em' }}></Column>
                        <Column field="username" header="Kategori"></Column>
                        <Column field="email" header="Saran"></Column>
                        <Column field="tanggal" header="Status"></Column>
                        <Column field="tanggal" header="Tanggapan"></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    )
}

export default UmpanBalikKepsek;