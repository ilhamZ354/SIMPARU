import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { getSarans } from "../services/umpanBalik.services";
import { getAllKeputusan } from "../services/keputusan.services";

const UmpanBalik = () => {
    const [dataSaran, setDataSaran] = useState([]);
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
                const data = await getSarans();
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

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-info" text onClick={() => window.location.reload()} />;
    const paginatorRight = <p></p>;

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
                        <Column field="kategori" header="Kategori" style={{ maxWidth: '8em' }}></Column>
                        <Column field="keputusan" header="Keputusan"></Column>
                        <Column field="target" header="Ditujukan kepada"></Column>
                        <Column field="createdAt" header="Waktu" body={(rowData) => formatDate(rowData.createdAt)}></Column>
                    </DataTable>
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
                        currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
                        className="w-full text-sm shadow-md"
                        scrollable
                        scrollHeight="flex"
                        scrollDirection="right"
                        tableStyle={{ minWidth: '80vw' }}
                    >
                        <Column header="No" body={nomorKolom} sortable style={{ maxWidth: '3rem' }}></Column>
                        <Column field="kategori" header="Kategori" style={{maxWidth:'12rem'}}></Column>
                        <Column field="saran" header="Saran" style={{width:'13rem'}}></Column>
                        <Column field="status" header="Status" style={{ maxWidth: '8rem' }}></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    )
}

export default UmpanBalik;