
const Siswa = require('../models/siswaModel');
const Rombel = require('../models/rombelModel');
const SekolahAsal = require('../models/sekolahAsalModel');

const generateRekomendasi = async (req, res) => {

    const generateRekomendasiStrategi = async (analisaData, perbandinganData) => {
        try {
            const sistem = {
                hasil: [],
                rekomendasi: [],
              };
            
            ////jika terjadi kenaikan
             if(analisaData.totalKenaikan > 0){

                //////////// Aspek Jurusan

                //terjadi pergeseran jurusan populer
                const jurusanTertinggiCurrent = Object.keys(analisaData.jurusanCount).reduce((a, b) => analisaData.jurusanCount[a] > analisaData.jurusanCount[b] ? a : b);
                console.log(jurusanTertinggiCurrent)

                const jurusanTertinggiPrev = Object.keys(perbandinganData.jurusanCount2).reduce((a, b) => perbandinganData.jurusanCount2[a] > perbandinganData.jurusanCount2[b] ? a : b);
                console.log(jurusanTertinggiPrev)

                const pergeseran = jurusanTertinggiCurrent !== jurusanTertinggiPrev

                // Hitung persentase kenaikan minat pada masing-masing jurusan
                let hasilKenaikanJurusan = 'Terjadi kenaikan minat pada jurusan ';
                const kenaikanJurusan = [];
                Object.keys(analisaData.jurusanCount).forEach(jurusan => {
                    if (perbandinganData.jurusanCount2[jurusan]) {
                        const kenaikan = analisaData.jurusanCount[jurusan] - perbandinganData.jurusanCount2[jurusan];
                        const persentaseKenaikan = (kenaikan / perbandinganData.jurusanCount2[jurusan]) * 100;
                        if (persentaseKenaikan > 0) {
                            kenaikanJurusan.push(`${jurusan} sebesar ${persentaseKenaikan.toFixed(2)}%`);
                        }
                    }
                });

                //hitung rata rata kenaikan semua jurusan
                const kenaikanSemuaJurusan = [];
                const totalJurusan = Object.keys(analisaData.jurusanCount).length;
                console.log(totalJurusan);
                
                Object.keys(analisaData.jurusanCount).forEach(jurusan => {
                    if(perbandinganData.jurusanCount2[jurusan]) {
                        const kenaikan = analisaData.jurusanCount[jurusan] - perbandinganData.jurusanCount2[jurusan];
                        if(kenaikan > 0) {
                            kenaikanSemuaJurusan.push(kenaikan)
                        }
                    }
                });

                console.log(kenaikanSemuaJurusan);
                let total = 0;
                kenaikanSemuaJurusan.forEach(function(item) {
                    total += item;
                });

                const rataKenaikanJurusan = total / kenaikanSemuaJurusan.length;
                // console.log("Rata-rata:", rataKenaikanJurusan);

                if(pergeseran) {
                    sistem.hasil.push({
                    hasil: `Terjadi kenaikan minat dibandingkan tahun sebelumnya, namun terjadi pergeseran minat jurusan populer dari ${jurusanTertinggiPrev} ke ${jurusanTertinggiCurrent}.`
                  })
                    sistem.rekomendasi.push({
                    rekomendasi: `Pertahankan kualitas jurusan yang masih populer dan tingkatkan promosi untuk jurusan yang mengalami penurunan. Pertimbangkan untuk menawarkan jurusan baru yang sesuai dengan tren industri.`
                  });
                }else if (kenaikanJurusan.length > 0 && kenaikanJurusan.length < totalJurusan ) {
                    hasilKenaikanJurusan += kenaikanJurusan.join(', ') + ' dibandingkan tahun sebelumnya.';
                    sistem.hasil.push({
                        hasil: hasilKenaikanJurusan
                    });
                    sistem.rekomendasi.push({
                        rekomendasi: `Pertahankan kualitas jurusan yang mengalami kenaikan dan evaluasi jurusan yang mengalami penurunan minat`
                    })
                }else if (kenaikanJurusan.length == kenaikanSemuaJurusan.length) {
                    sistem.hasil.push({
                        hasil: `Terjadi kenaikan minat pada semua jurusan dengan rata-rata sebesar ${rataKenaikanJurusan}% dibandingkan tahun sebelumnya`
                    });
                    sistem.rekomendasi.push({
                        rekomendasi: `Pertahankan kualitas menyeluruh terhadap semua jurusan serta pertimbangkan untuk menawarkan jurusan baru yang sesuai dengan tren industri`
                    })
                }else {
                    sistem.hasil.push({
                        hasil: `Hasil analisa tidak ditemukan`
                    });
                    sistem.rekomendasi.push({
                        rekomendasi: `Sistem tidak dapat memberikan rekomendasi`
                    });
                }


                //////// Aspek sekolah asal

                // Hitung persentase kenaikan siswa dari masing-masing sekolah asal
                let hasilKenaikanSekolah = 'Terjadi kenaikan minat dari sekolah ';
                const kenaikanSekolah = [];
                Object.keys(analisaData.sekolahCount).forEach(sekolah => {
                    if (perbandinganData.sekolahCount2[sekolah]) {
                        const kenaikan = analisaData.sekolahCount[sekolah] - perbandinganData.sekolahCount2[sekolah];
                        const persentaseKenaikan = (kenaikan / perbandinganData.sekolahCount2[sekolah]) * 100;
                        if (persentaseKenaikan > 0) {
                            kenaikanSekolah.push(`${sekolah} sebesar ${persentaseKenaikan.toFixed(2)}%`);
                        }
                    }
                });

                // hitung rata-rata kenaikan semua sekolah asal
                const kenaikanSemuaSekolah = [];
                const totalSekolah = Object.keys(analisaData.sekolahCount).length;

                Object.keys(analisaData.sekolahCount).forEach(sekolah => {
                    if (perbandinganData.sekolahCount2[sekolah]) {
                        const kenaikan = analisaData.sekolahCount[sekolah] - perbandinganData.sekolahCount2[sekolah];
                        if (kenaikan > 0) {
                            kenaikanSemuaSekolah.push(kenaikan);
                        }
                    }
                });

                console.log(kenaikanSemuaSekolah);
                let totalSekolahAsal = 0;
                kenaikanSemuaSekolah.forEach(function(item) {
                    totalSekolahAsal += item;
                });

                const rataKenaikanSekolah = totalSekolahAsal / kenaikanSemuaSekolah.length;

                if (kenaikanSekolah.length > 0 && kenaikanSekolah.length < totalSekolah) {
                    hasilKenaikanSekolah += kenaikanSekolah.join(', ') + ' dibandingkan tahun sebelumnya.';
                    sistem.hasil.push({
                        hasil: hasilKenaikanSekolah
                    });
                    sistem.rekomendasi.push({
                        rekomendasi: `Pertahankan hubungan baik dengan sekolah-sekolah asal yang mengalami kenaikan dan evaluasi sekolah-sekolah asal yang mengalami penurunan minat.`
                    });
                } else if (kenaikanSekolah.length == kenaikanSemuaSekolah.length) {
                    sistem.hasil.push({
                        hasil: `Terjadi kenaikan minat dari semua sekolah asal dengan rata-rata sebesar ${rataKenaikanSekolah.toFixed(2)}% dibandingkan tahun sebelumnya.`
                    });
                    sistem.rekomendasi.push({
                        rekomendasi: `Pertahankan hubungan baik dengan semua sekolah asal serta pertimbangkan untuk menjalin kerjasama dan melakukan sosialisasi dengan sekolah-sekolah baru untuk memperluas pertumbuhan peminat.`
                    });
                } else {
                    sistem.hasil.push({
                        hasil: `Hasil analisa tidak ditemukan`
                    });
                    sistem.rekomendasi.push({
                        rekomendasi: `Sistem tidak dapat memberikan rekomendasi`
                    });
                }

                /// aspek daerah asal

                //// hitung kenaikan dan penurunan daerah
                const kenaikanDaerah = [];
                const penurunanDaerah = {};

                Object.keys(analisaData.dataAlamat).forEach(alamat =>{
                    if(perbandinganData.dataAlamat2[alamat]){
                        const kenaikan = analisaData.dataAlamat[alamat] - perbandinganData.dataAlamat2[alamat];
                        console.log(`kenaikan: ${kenaikan}`)
                        if (kenaikan > 0) {
                            kenaikanDaerah.push(kenaikan);
                        } else if (kenaikan < 0 ){
                            penurunanDaerah[alamat] = kenaikan;
                        }
                    }
                })

                const totalPenurunanDaerah = Object.keys(penurunanDaerah).length;
                // console.log(`daerah turun : ${totalPenurunanDaerah}`)

                const totalAlamat = Object.keys(analisaData.dataAlamat).length;
                // console.log(`total alamat: ${totalAlamat}`)

                //hitung rata rata daerah naik
                console.log(`kenaikan daerah: ${kenaikanDaerah.length}`);

                let totalDaerahAsalNaik = 0;
                kenaikanDaerah.forEach(function(item) {
                    totalDaerahAsalNaik += item;
                });

                const rataKenaikanSemuaDaerah = totalDaerahAsalNaik / kenaikanDaerah.length;
                console.log(`rata kenaikan daerah: ${rataKenaikanSemuaDaerah}`)
                
                //hitung persentase
                const persentaseKenaikanDaerah = (kenaikanDaerah.length / totalAlamat) * 100;
                // console.log(`persentase kenaikan daerah: ${persentaseKenaikanDaerah.toFixed(2)}%`);

                //hitung persentase beberapa daerah yang naik
                let hasilKenaikanDaerah = 'Terjadi kenaikan peminat di daerah ';
                const kenaikanDaerahPersen = [];

                Object.keys(analisaData.dataAlamat).forEach(alamat => {
                    if (perbandinganData.dataAlamat2[alamat]) {
                        const kenaikan = analisaData.dataAlamat[alamat] - perbandinganData.dataAlamat2[alamat];
                        const persentaseKenaikan = (kenaikan / perbandinganData.dataAlamat2[alamat]) * 100;
                        if (persentaseKenaikan > 0) {
                            kenaikanDaerahPersen.push(`${alamat} sebesar ${persentaseKenaikan.toFixed(2)}%`);
                        }
                    }
                });

                if(totalPenurunanDaerah === 1){
                    sistem.hasil.push({
                        hasil: `Terjadi kenaikan peminat namun terjadi penurunan peminat di daerah ${Object.keys(penurunanDaerah)} dibandingkan tahun sebelumnya.`
                    })
                    sistem.rekomendasi.push({
                        rekomendasi: `Pertahankan upaya promosi yang telah dilakukan di beberapa daerah dan kembali tingkatkan promosi serta sosialisasi di daerah ${Object.keys(penurunanDaerah)}.`
                    })
                }else if(kenaikanDaerah.length == totalAlamat){
                    sistem.hasil.push({
                        hasil: `Terjadi kenaikan peminat secara merata di seluruh daerah sebesar ${persentaseKenaikanDaerah.toFixed(2)}% dibandingkan tahun sebelumnya`
                    })
                    sistem.rekomendasi.push({
                        rekomendasi: `Pertahankan strategi promosi yang telah dilakukan, dan identifikasi daerah baru yang berpotensi untuk penambahan siswa.`
                    })
                }else if(kenaikanDaerah.length > 0 && kenaikanDaerah.length < totalAlamat){
                    hasilKenaikanDaerah += kenaikanDaerahPersen.join(', ') + ' dibandingkan tahun sebelumnya.';
                    sistem.hasil.push({
                      hasil: hasilKenaikanDaerah  
                    });
                    sistem.rekomendasi.push({
                        rekomendasi: `Pertahankan upaya promosi yang telah dilakukan di beberapa daerah dan  tingkatkan promosi serta sosialisasi di beberapa daerah yang mengalami penurunan.`
                    })
                }


             } else if(analisaData.jurusanCount < 0) {

             }

             return sistem;

        } catch (error) {
            console.error('Error data', error);
            res.status(500).json({ message: 'Rekomendasi keputusan tidak ditemukan' });
        }
    }

    try {
        const tahun = req.params.tahun;
        const currentYear = parseInt(tahun, 10);
        const tahunData = currentYear - 1;
        const previousYear = tahunData - 1;

        //tahun yang di minta
        const siswaData = await Siswa.find({ tahun: tahunData })
            .populate('rombel')
            .populate('sekolahAsal');

        if (!siswaData || siswaData.length === 0) {
            throw new Error('Data siswa tidak ditemukan untuk tahun yang diminta.');
        }

        const previousSiswaData = await Siswa.find({ tahun: previousYear });

        const totalSiswa = siswaData.length;
        const totalSiswaPreviousYear = previousSiswaData.length;

        let totalKenaikan = 0;
        let totalPenurunan = 0;
        if (totalSiswaPreviousYear > 0) {
            if (siswaData.length > previousSiswaData.length) {
                const kenaikan = siswaData.length - previousSiswaData.length;
                totalPenurunan = 0;
                totalKenaikan = Math.round((kenaikan / previousSiswaData.length) * 100);
            } else if (siswaData.length < previousSiswaData.length) {
                const penurunan = previousSiswaData.length - siswaData.length;
                totalKenaikan = 0;
                totalPenurunan = Math.round((penurunan / previousSiswaData.length) * 100);
            } else{
                totalPenurunan = 0;
                totalKenaikan = 0;
            }
        }

        const totalLakiLaki = siswaData.filter(siswa => siswa.jenis_kelamin === 'Laki-laki').length;
        const totalPerempuan = siswaData.filter(siswa => siswa.jenis_kelamin === 'Perempuan').length;

        const jurusanCount = siswaData.reduce((count, siswa) => {
            let jurusan = siswa.rombel.jurusan;
            
            if (jurusan === 'Teknik Komputer dan Jaringan') {
            jurusan = 'TKJ';
            }else if(jurusan === 'Teknik dan Bisnis Sepeda Motor') {
                jurusan = 'TBSM';
            }else if(jurusan === 'Teknik Audio Video') {
                jurusan = 'TAV';
            }else if(jurusan === 'Teknik Bodi Otomotif') {
                jurusan = 'TBO';
            }
            
            count[jurusan] = (count[jurusan] || 0) + 1;
            return count;
        }, {});


        const sekolahCount = siswaData.reduce((count, siswa) => {
            let sekolah = siswa.sekolahAsal.nama_sekolah;

            count[sekolah] = (count[sekolah] || 0) + 1;
            return count;
        }, {})

        const dataAlamat = siswaData.reduce((count, siswa) => {
            let alamat = siswa.alamat_lengkap;

            let result = alamat.split(", ");
            let alamatSiswa = result[1];
            
            count[alamatSiswa] = (count[alamatSiswa] || 0) + 1;
            return count;
        }, {})

        const jenisSekolahCount = siswaData.reduce((count, siswa) => {
            let sekolah = siswa.sekolahAsal.nama_sekolah;
            let jenisSekolah = '';
        
            if (sekolah.includes('SMP')) {
            if (sekolah.includes('Negeri') || sekolah.includes('SMP N')) {
                jenisSekolah = 'SMPN';
            } else if (sekolah.includes('IT')) {
                jenisSekolah = 'SMP IT';
            } else if (sekolah.includes('Swasta') || sekolah.includes('S')) {
                jenisSekolah = 'SMPS';
            } else {
                jenisSekolah = sekolah
            }

            } else if (sekolah.includes('MTs') || sekolah.includes('MTS')) {
            if (sekolah.includes('Negeri') || sekolah.includes('N')) {
                jenisSekolah = 'MTsN';
            } else {
                jenisSekolah = 'MTsS';
            } 
            } else {
            jenisSekolah = 'PONTREN';
            }
        
            count[jenisSekolah] = (count[jenisSekolah] || 0) + 1;
            return count;
        }, {});


        //tahun sebelumnya

        const siswaData2 = await Siswa.find({ tahun: previousYear })
        .populate('rombel')
        .populate('sekolahAsal');

        if (!siswaData2 || siswaData2.length === 0) {
            throw new Error('Data siswa tidak ditemukan untuk tahun yang diminta.');
        }

        const jurusanCount2 = siswaData2.reduce((count, siswa) => {
            let jurusan = siswa.rombel.jurusan;
            
            if (jurusan === 'Teknik Komputer dan Jaringan') {
            jurusan = 'TKJ';
            }else if(jurusan === 'Teknik dan Bisnis Sepeda Motor') {
                jurusan = 'TBSM';
            }else if(jurusan === 'Teknik Audio Video') {
                jurusan = 'TAV';
            }else if(jurusan === 'Teknik Bodi Otomotif') {
                jurusan = 'TBO';
            }
            
            count[jurusan] = (count[jurusan] || 0) + 1;
            return count;
        }, {});


        const sekolahCount2 = siswaData2.reduce((count, siswa) => {
            let sekolah = siswa.sekolahAsal.nama_sekolah;

            count[sekolah] = (count[sekolah] || 0) + 1;
            return count;
        }, {})

        const dataAlamat2 = siswaData2.reduce((count, siswa) => {
            let alamat = siswa.alamat_lengkap;

            let result = alamat.split(", ");
            let alamatSiswa = result[1];
            
            count[alamatSiswa] = (count[alamatSiswa] || 0) + 1;
            return count;
        }, {})

        const jenisSekolahCount2 = siswaData.reduce((count, siswa) => {
            let sekolah = siswa.sekolahAsal.nama_sekolah;
            let jenisSekolah = '';
        
            if (sekolah.includes('SMP')) {
            if (sekolah.includes('Negeri') || sekolah.includes('SMP N')) {
                jenisSekolah = 'SMPN';
            } else if (sekolah.includes('IT')) {
                jenisSekolah = 'SMP IT';
            } else if (sekolah.includes('Swasta') || sekolah.includes('S')) {
                jenisSekolah = 'SMPS';
            } else {
                jenisSekolah = sekolah
            }

            } else if (sekolah.includes('MTs') || sekolah.includes('MTS')) {
            if (sekolah.includes('Negeri') || sekolah.includes('N')) {
                jenisSekolah = 'MTsN';
            } else {
                jenisSekolah = 'MTsS';
            } 
            } else {
            jenisSekolah = 'PONTREN';
            }
        
            count[jenisSekolah] = (count[jenisSekolah] || 0) + 1;
            return count;
        }, {});

        // console.log({
        //     totalSiswaBaru: siswaData.length,
        //     totalKenaikan: `${totalKenaikan}%`,
        //     totalPenurunan: `${totalPenurunan}%`,
        //     jurusanCount,
        //     sekolahCount,
        //     dataAlamat,
        //     jenisSekolahCount
        // })

        const hasilAnalisaCurrent = {
            totalSiswaBaru: siswaData.length,
            totalKenaikan: totalKenaikan,
            totalPenurunan: totalPenurunan,
            jurusanCount,
            sekolahCount,
            dataAlamat,
            jenisSekolahCount
        }

        const hasilAnalisaPrevious = {
          totalSiswaBaru: siswaData2.length,
          jurusanCount2,
          sekolahCount2,
          dataAlamat2,
          jenisSekolahCount2
        }

        const rekomendasi = await generateRekomendasiStrategi(hasilAnalisaCurrent, hasilAnalisaPrevious);
        // console.log({hasilAnalisaPrevious, hasilAnalisaCurrent})
        console.log({rekomendasi})
        res.json({ rekomendasi })

    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Error fetching recommendation data' });
    }
}

module.exports = { generateRekomendasi }
// const calculateWSS = (data, k) => {
//     const kmeans = new KMeans();
//     const clusters = kmeans.cluster(data, k);
//     // console.log(clusters)

//     let wss = 0;
//     for (let i = 0; i < k; i++) {
//       const cluster = clusters[i];
//       console.log('cluster :')
//       console.log(cluster)

//       const centroid = kmeans.centroids[i];
//       console.log('centroid :')
//       console.log(centroid)

//       for (let j = 0; j < clusters.length; j++) {
//         // Pastikan poin dalam cluster valid dan tidak undefined
//         const point = clusters[j];
//         console.log('Point :')
//         console.log(point)
//         if (!point || isNaN(point[0]) || isNaN(point[1]) || isNaN(point[2])) {
//           console.error(`Invalid point in cluster ${i}: ${point}`);
//           continue;
//         }
//         wss += Math.pow(point[0] - centroid[0], 2) + Math.pow(point[1] - centroid[1], 2) + Math.pow(point[2] - centroid[2], 2);
//       }
//     }
//     console.log(`nilai wss = ${wss}`)
//     return wss;
//   };
  
//   const getOptimalK = (data) => {
//     const maxK = 5;
//     const wssValues = [];
//     for (let k = 1; k <= maxK; k++) {
//       const wss = calculateWSS(data, k);
//       if (!isNaN(wss)) {
//         wssValues.push(wss);
//         console.log('wss Value :')
//         console.log(wssValues)
//       }
//     }
//     if (wssValues.length === 0) {
//       throw new Error('Tidak ada nilai WSS yang valid');
//     }
//     const optimalK = wssValues.indexOf(Math.min(...wssValues)) + 1;
//     return optimalK;
//   };

// const cluster = (siswaData) => {
//     const allJurusan = siswaData.map(siswa => siswa.rombel.jurusan);
//     const uniqueJurusan = Array.from(new Set(allJurusan));
//     const encodeJurusan = (jurusan) => uniqueJurusan.indexOf(jurusan);

//     const allSekolah = siswaData.map(siswa => siswa.sekolahAsal.nama_sekolah);
//     const uniqueSekolah = Array.from(new Set(allSekolah));
//     const encodeSekolah = (sekolah) => uniqueSekolah.indexOf(sekolah);

//     const allAlamat = siswaData.map(siswa => {
//         let alamat = siswa.alamat_lengkap.split(", ");
//         return alamat[1]; 
//     });
//     const uniqueAlamat = Array.from(new Set(allAlamat));
//     const encodeAlamat = (alamat) => uniqueAlamat.indexOf(alamat);

//     return siswaData.map(siswa => {
//         const encodedJurusan = encodeJurusan(siswa.rombel.jurusan);
//         const encodedSekolah = encodeSekolah(siswa.sekolahAsal.nama_sekolah);
//         const encodedAlamat = encodeAlamat(siswa.alamat_lengkap.split(", ")[1]);

//         // console.log(`Encoded Values - Jurusan: ${encodedJurusan}, Sekolah: ${encodedSekolah}, Alamat: ${encodedAlamat}`);

//         if (encodedJurusan === -1 || encodedSekolah === -1 || encodedAlamat === -1) {
//             throw new Error('Terjadi kesalahan dalam proses encoding.');
//         }

//         return {
//             jurusan: encodedJurusan,
//             sekolah: encodedSekolah,
//             alamat: encodedAlamat
//         };
//     });
// };


// const getRecommendation = async (req, res) => {
//     try {
//         const tahun = req.params.tahun;
//         const currentYear = parseInt(tahun, 10);
//         const previousYear = currentYear - 1;

//         const siswaData = await Siswa.find({ tahun: previousYear })
//             .populate('rombel')
//             .populate('sekolahAsal');

//         if (!siswaData || siswaData.length === 0) {
//             throw new Error('Data siswa tidak ditemukan untuk tahun yang diminta.');
//         }

//         let encodedData = cluster(siswaData);

//         encodedData = encodedData.map(item => [item.jurusan, item.sekolah, item.alamat]);
//         console.log(encodedData)

//         if (!Array.isArray(encodedData) || encodedData.length === 0 || !Array.isArray(encodedData[0])) {
//             throw new Error('Data yang dienkode tidak valid.');
//         }

//         const optimalK = getOptimalK(encodedData);
//         console.log(`optimal K = ${optimalK}`)

//         const kmeans = new KMeans();
//         const clusters = kmeans.cluster(encodedData, optimalK);
//         console.log(clusters)

//         res.json({ clusters });

//     } catch (error) {
//         console.error('Error fetching data:', error);
//         res.status(500).json({ message: 'Error fetching recommendation data' });
//     }
// };

// module.exports = { getRecommendation };
