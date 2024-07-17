import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';
import FormKeputusan from "../components/KeputusanForm";
import { getSarans } from "../services/umpanBalik.services";
import Cookies from 'js-cookie';
import { buatKeputusan, getAllKeputusan, deleteKeputusan } from "../services/keputusan.services";

const UmpanBalikKepsek = () => {
    const [dataSaran, setDataSaran] = useState([]);
    const [buatKeputusanDialog, setBuatKeputusanDialog] = useState(false);
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

    const statusOptions = [
        { label: 'Terima', value: 'Terima' },
        { label: 'Tinjau', value: 'Tinjau' },
        { label: 'Tolak', value: 'Tolak' }
    ];

    const handleStatusChange = async (id, status) => {
        try {
            const accessToken = Cookies.get('access_token');
            const response = await axios.patch(`http://localhost:5000/api/simparu/saran/status-edit/${id}`,
            { status }, {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
              },
            });
            console.log('Status updated successfully:', response.data);
            alert('Status berhasil diperbarui');

        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const onStatusChange = (e, rowData) => {
        const updatedDataSaran = dataSaran.map(saran => {
            if (saran._id === rowData._id) {
                return { ...saran, status: e.value };
            }
            return saran;
        });
        setDataSaran(updatedDataSaran);
        handleStatusChange(rowData._id, e.value);
    };

    const statusDropdown = (rowData) => {
        return (
            <Dropdown value={rowData.status} options={statusOptions} onChange={(e) => onStatusChange(e, rowData)} placeholder="Tandai sebagai" />
        );
    };

    const showBuatKeputusanDialog = () => {
        setBuatKeputusanDialog(true);
    };

    const hideBuatKeputusanDialog = () => {
        setBuatKeputusanDialog(false);
    };

    const handleDeleteKeputusan = async (id) => {
        try {
            await deleteKeputusan(id);
            alert('Berhasil menghapus keputusan!');
            fetchKeputusan();
        } catch (error) {
            alert('Keputusan gagal di hapus!')
            console.error('Error deleting keputusan:', error);
        }
    };

    const actionsBodyTemplate = (rowData) => {
        return (
            <div className="text-center">
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger p-mr-2" onClick={() => handleDeleteKeputusan(rowData._id)} />
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
                    <div className='flex w-full'>
                        <div className="flex w-full" style={{width:"60vw", height:"3vw"}}>
                        <Button label="Buat keputusan" className="p-button-info shadow-lg" icon="pi pi-plus" onClick={showBuatKeputusanDialog}></Button>
                        <Dialog
                            header="Buat keputusan"
                            visible={buatKeputusanDialog}
                            style={{ width: '45vw', minWidth: '40rem' }}
                            onHide={hideBuatKeputusanDialog}
                        >
                            <FormKeputusan onClose={hideBuatKeputusanDialog} onSuccess={fetchKeputusan} />
                        </Dialog>
                        </div>
                    </div>
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
                        <Column body={actionsBodyTemplate} style={{ textAlign: 'center', width: '8em' }}></Column>
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
                        <Column field="id_guru.nama" header="Nama guru" style={{ minWidth: '8em' }}></Column>
                        <Column field="kategori" header="Kategori"></Column>
                        <Column field="saran" header="Saran"></Column>
                        <Column field="status" header="Status" body={statusDropdown}></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    )
}

export default UmpanBalikKepsek;
