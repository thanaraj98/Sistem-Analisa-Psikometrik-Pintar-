import { StudentPsychometricRecord, SystemSettings, SystemAuditLog } from '../types';

export const INITIAL_SETTINGS: SystemSettings = {
  schoolName: 'SEKOLAH KEBANGSAAN SERI BINTANG UTAMA',
  schoolCode: 'WBA0088',
  academicYear: 'Sesi Persekolahan 2026/2027',
  ppsiStatus: 'Aktif',
  highThreshold: 75,
  mediumThreshold: 50,
  gbkHeadName: 'Puan Siti Nurhaliza binti Ahmad (GBK Sepenuh Masa)',
  ppdName: 'PPD Bangsar & Pudu',
  jpnName: 'Jabatan Pendidikan Wilayah Persekutuan Kuala Lumpur',
};

export const MOCK_STUDENTS: StudentPsychometricRecord[] = [
  // --- TAHUN 4 ---
  {
    id: 'M-401',
    icNumber: '140512-10-1234', // Easy test IC
    name: 'Ahmad Daniel bin Razak',
    year: 4,
    className: '4 Cemerlang',
    gender: 'Lelaki',
    schoolName: 'SK Seri Bintang Utama',
    counselorName: 'Puan Siti Nurhaliza binti Ahmad',
    assessmentDate: '14 April 2026',
    overallStatus: 'Selesai',
    topIntelligences: ['Logik Matematik', 'Ruang Visual', 'Verbal Linguistik'],
    counselorRemarks: 'Murid menunjukkan minat yang sangat tinggi dalam bidang sains dan penaakulan nombor. Sangat aktif dalam aktiviti kumpulan dan projek binaan STEM.',
    ikpScores: [
      {
        domain: 'Logik Matematik',
        score: 88,
        level: 'Tinggi',
        description: 'Keupayaan menaakul secara sistematik, menyelesaikan masalah nombor dan operasi logik dengan sangat cekap.',
        recommendationHome: 'Galakkan anak bermain permainan berasaskan strategi seperti catur, teka-teki Sudoku, dan eksperimen sains ringkas di rumah.',
        recommendationSchool: 'Berikan cabaran matematik aras tinggi (KBAT) dan libatkan dalam kelab STEM atau Olympiad Matematik.'
      },
      {
        domain: 'Ruang Visual',
        score: 82,
        level: 'Tinggi',
        description: 'Peka terhadap warna, garisan, bentuk, dan ruang. Berupaya membayangkan struktur 3D dengan baik.',
        recommendationHome: 'Sediakan bahan seperti blok LEGO, lukisan grafik, dan pemetaan konsep semasa belajar di rumah.',
        recommendationSchool: 'Manfaatkan alat bantuan visual, peta minda berwarna, dan diagram interaktif semasa sesi PdP.'
      },
      {
        domain: 'Verbal Linguistik',
        score: 78,
        level: 'Tinggi',
        description: 'Penguasaan kosa kata yang baik, gemar membaca buku cerita dan menyampaikan idea secara lisan.',
        recommendationHome: 'Sediakan bahan bacaan kepelbagaian genre dan luangkan masa berdiskusi tentang buku yang dibaca.',
        recommendationSchool: 'Galakkan murid menyertai aktiviti bercerita, debat sekolah rendah, dan penulisan kreatif.'
      },
      { domain: 'Interpersonal', score: 68, level: 'Sederhana', description: 'Boleh bekerjasama dalam pasukan dan berkomunikasi secara baik dengan rakan sekelas.', recommendationHome: 'Galakkan komunikasi terbuka di rumah dan aktiviti kemasyarakatan.', recommendationSchool: 'Lantik sebagai ketua kumpulan dalam tugasan berasaskan projek.' },
      { domain: 'Naturalis', score: 65, level: 'Sederhana', description: 'Menunjukkan kepekaan terhadap tumbuhan dan persekitaran alam semula jadi.', recommendationHome: 'Ajak anak berkebun atau melawat zoo dan taman negara.', recommendationSchool: 'Libatkan dalam Kelab Alam Sekitar.' },
      { domain: 'Intrapersonal', score: 62, level: 'Sederhana', description: 'Mempunyai kesedaran kendiri yang memuaskan dan faham kekuatan diri.', recommendationHome: 'Bantu anak menetapkan matlamat harian ringkas.', recommendationSchool: 'Sediakan sesi refleksi diri selepas sesuatu tugasan.' },
      { domain: 'Muzik', score: 55, level: 'Sederhana', description: 'Mampu mengecam irama asas dan melodi lagu.', recommendationHome: 'Pendedahan kepada instrumen muzik ringkas.', recommendationSchool: 'Gunakan lagu ilmiah dalam proses pengajaran.' },
      { domain: 'Kinestetik', score: 50, level: 'Sederhana', description: 'Koordinasi pergerakan fizikal pada tahap asas.', recommendationHome: 'Aktiviti riadah bersama keluarga pada hujung minggu.', recommendationSchool: 'Sertai sukan permainan asas sekolah.' },
      { domain: 'Eksistensial', score: 45, level: 'Rendah', description: 'Memerlukan bimbingan untuk memahami nilai murni dan matlamat kehidupan yang lebih abstrak.', recommendationHome: 'Penerapan nilai murni menerusi kisah teladan.', recommendationSchool: 'Bimbingan kaunseling kelompok mengenai adab dan sahsiah.' }
    ],
    imkTopCodes: ['I', 'R', 'S'],
    imkScores: [
      { code: 'I', category: 'Investigatif', score: 85 },
      { code: 'R', category: 'Realistik', score: 78 },
      { code: 'S', category: 'Sosial', score: 65 },
      { code: 'E', category: 'Enterprising (Usahawan)', score: 50 },
      { code: 'A', category: 'Artistik', score: 45 },
      { code: 'K', category: 'Konvensional', score: 40 }
    ],
    suggestedCareers: ['Saintis Muda', 'Jurutera Komputer', 'Penyelidik Alam Sekitar', 'Guru Sains'],
    aptitudeScores: [
      { component: 'Verbal', score: 80 },
      { component: 'Numerikal', score: 92 },
      { component: 'Penaakulan', score: 86 },
      { component: 'Kreativiti', score: 75 },
      { component: 'Penyelesaian Masalah', score: 88 }
    ]
  },

  {
    id: 'M-402',
    icNumber: '140822-14-5678', // Easy test IC 2
    name: 'Nur Aina Sofea binti Zulkifli',
    year: 4,
    className: '4 Cemerlang',
    gender: 'Perempuan',
    schoolName: 'SK Seri Bintang Utama',
    counselorName: 'Puan Siti Nurhaliza binti Ahmad',
    assessmentDate: '15 April 2026',
    overallStatus: 'Selesai',
    topIntelligences: ['Verbal Linguistik', 'Interpersonal', 'Muzik'],
    counselorRemarks: 'Sangat berbakat dalam penyampaian lisan dan kepimpinan murid. Mesra, disukai rakan-rakan, dan berkebolehan menyertai pertandingan pidato.',
    ikpScores: [
      {
        domain: 'Verbal Linguistik',
        score: 92,
        level: 'Tinggi',
        description: 'Sangat petah berkata-kata, bertutur dengan tatabahasa yang tepat, dan cepat menguasai bahasa baharu.',
        recommendationHome: 'Galakkan latihan pengucapan awam, penulisan diari kreatif, dan perbahasan berhemah di rumah.',
        recommendationSchool: 'Berikan peluang memimpin perhimpunan murid, menjadi pengacara majlis atau wakil sekolah dalam pertandingan syarahan.'
      },
      {
        domain: 'Interpersonal',
        score: 86,
        level: 'Tinggi',
        description: 'Empati yang tinggi terhadap perasaan rakan, mudah berteman, dan pandai menyelesaikan konflik secara berhemah.',
        recommendationHome: 'Galakkan aktiviti sukarela dan interaksi sosial yang sihat bersama komuniti setempat.',
        recommendationSchool: 'Lantik sebagai Pembimbing Rakan Sebaya (PRS) sekolah.'
      },
      {
        domain: 'Muzik',
        score: 80,
        level: 'Tinggi',
        description: 'Keupayaan mendengar dan meniru irama serta melodi dengan penuh penghayatan.',
        recommendationHome: 'Sokong minat dalam kelas alat muzik seperti rekorder, ukulele, atau nyanyian nasyid/koral.',
        recommendationSchool: 'Libatkan dalam kelab kebudayaan dan ko-kurikulum kelab muzik.'
      },
      { domain: 'Ruang Visual', score: 70, level: 'Sederhana', description: 'Memahami gambaran visual ringkas.', recommendationHome: 'Aktiviti melukis dan mewarna.', recommendationSchool: 'Penggunaan peta minda.' },
      { domain: 'Logik Matematik', score: 65, level: 'Sederhana', description: 'Penguasaan nombor pada tahap baik.', recommendationHome: 'Latihan pengukuhan matematik harian.', recommendationSchool: 'Teknik latih tubi berasaskan permainan.' },
      { domain: 'Intrapersonal', score: 64, level: 'Sederhana', description: 'Mampu mengawal emosi sendiri.', recommendationHome: 'Bimbing refleksi harian.', recommendationSchool: 'Beri dorongan motivasi.' },
      { domain: 'Naturalis', score: 58, level: 'Sederhana', description: 'Menyukai haiwan peliharaan.', recommendationHome: 'Penjagaan haiwan peliharaan.', recommendationSchool: 'Aktiviti landskap sekolah.' },
      { domain: 'Kinestetik', score: 52, level: 'Sederhana', description: 'Pergerakan fizikal terkawal.', recommendationHome: 'Tarian berasaskan kebudayaan.', recommendationSchool: 'Senaman pagi.' },
      { domain: 'Eksistensial', score: 48, level: 'Rendah', description: 'Perlu bimbingan pemahaman nilai abstrak.', recommendationHome: 'Pendedahan ikhtibar moral.', recommendationSchool: 'Penerapan nilai sivik.' }
    ],
    imkTopCodes: ['S', 'A', 'E'],
    imkScores: [
      { code: 'S', category: 'Sosial', score: 90 },
      { code: 'A', category: 'Artistik', score: 82 },
      { code: 'E', category: 'Enterprising (Usahawan)', score: 75 },
      { code: 'I', category: 'Investigatif', score: 55 },
      { code: 'K', category: 'Konvensional', score: 50 },
      { code: 'R', category: 'Realistik', score: 40 }
    ],
    suggestedCareers: ['Penyiar / Wartawan', 'Kaunselor', 'Guru Bahasa', 'Pegawai Hubungan Awam'],
    aptitudeScores: [
      { component: 'Verbal', score: 94 },
      { component: 'Numerikal', score: 68 },
      { component: 'Penaakulan', score: 76 },
      { component: 'Kreativiti', score: 88 },
      { component: 'Penyelesaian Masalah', score: 78 }
    ]
  },

  {
    id: 'M-403',
    icNumber: '141005-08-9012',
    name: 'Muhammad Harith bin Asyraf',
    year: 4,
    className: '4 Gemilang',
    gender: 'Lelaki',
    schoolName: 'SK Seri Bintang Utama',
    counselorName: 'Puan Siti Nurhaliza binti Ahmad',
    assessmentDate: '16 April 2026',
    overallStatus: 'Selesai',
    topIntelligences: ['Kinestetik', 'Naturalis', 'Ruang Visual'],
    counselorRemarks: 'Sangat tangkas dalam bidang sukan dan olahraga. Menunjukkan minat mendalam terhadap aktiviti praktikal di luar bilik darjah.',
    ikpScores: [
      { domain: 'Kinestetik', score: 90, level: 'Tinggi', description: 'Kemahiran koordinasi motor kasar dan halus yang cemerlang.', recommendationHome: 'Galakkan aktiviti sukan, berbasikal, dan seni pertukangan kayu ringkas.', recommendationSchool: 'Wakilkan murid dalam kejohanan MSSD sukan/olahraga.' },
      { domain: 'Naturalis', score: 84, level: 'Tinggi', description: 'Sangat peka terhadap alam sekitar, flora, dan fauna.', recommendationHome: 'Ajak berkhemah dan meneroka alam semula jadi.', recommendationSchool: 'Jadikan pembantu taman sains sekolah.' },
      { domain: 'Ruang Visual', score: 76, level: 'Tinggi', description: 'Keupayaan memetakan laluan dan mereka bentuk struktur.', recommendationHome: 'Bantu reka bentuk model kit binaan.', recommendationSchool: 'Aktiviti geografi ringkas dan pemetaan.' },
      { domain: 'Interpersonal', score: 65, level: 'Sederhana', description: 'Mudah menyesuaikan diri dalam pasukan sukan.', recommendationHome: 'Main sukan berpasukan di taman.', recommendationSchool: 'Kapten pasukan permainan.' },
      { domain: 'Muzik', score: 60, level: 'Sederhana', description: 'Boleh mengikut rentak drumband.', recommendationHome: 'Mendengar muzik bertempo pantas.', recommendationSchool: 'Kelab persatuan kompang/drumband.' },
      { domain: 'Logik Matematik', score: 55, level: 'Sederhana', description: 'Penguasaan konsep pengiraan asas.', recommendationHome: 'Permainan pengiraan markah sukan.', recommendationSchool: 'Gunakan bahan konkrit semasaPdP Matematik.' },
      { domain: 'Verbal Linguistik', score: 52, level: 'Sederhana', description: 'Memerlukan latihan perbendaharaan kata tambahan.', recommendationHome: 'Amalkan membaca cerpen pendek bersama-sama.', recommendationSchool: 'Bimbingan pemahaman bacaan.' },
      { domain: 'Intrapersonal', score: 50, level: 'Sederhana', description: 'Faham emosi asas diri.', recommendationHome: 'Bual bicara santai tentang emosi.', recommendationSchool: 'Bimbingan kawalan kendiri.' },
      { domain: 'Eksistensial', score: 40, level: 'Rendah', description: 'Peringkat perkembangan pemikiran abstrak awal.', recommendationHome: 'Teladan moral ikhlas.', recommendationSchool: 'Penerapan sivik asas.' }
    ],
    imkTopCodes: ['R', 'S', 'E'],
    imkScores: [
      { code: 'R', category: 'Realistik', score: 88 },
      { code: 'S', category: 'Sosial', score: 70 },
      { code: 'E', category: 'Enterprising (Usahawan)', score: 62 },
      { code: 'A', category: 'Artistik', score: 50 },
      { code: 'I', category: 'Investigatif', score: 48 },
      { code: 'K', category: 'Konvensional', score: 42 }
    ],
    suggestedCareers: ['Atlet / Jurulatih Sukan', 'Pegawai Perhutanan', 'Juruteknik Bertauliah', 'Pegawai Pertahanan Awam'],
    aptitudeScores: [
      { component: 'Verbal', score: 62 },
      { component: 'Numerikal', score: 70 },
      { component: 'Penaakulan', score: 78 },
      { component: 'Kreativiti', score: 82 },
      { component: 'Penyelesaian Masalah', score: 85 }
    ]
  },

  // --- TAHUN 5 ---
  {
    id: 'M-501',
    icNumber: '130315-10-3456', // Easy test IC 3
    name: 'Siti Sarah binti Amiruddin',
    year: 5,
    className: '5 Cemerlang',
    gender: 'Perempuan',
    schoolName: 'SK Seri Bintang Utama',
    counselorName: 'Puan Siti Nurhaliza binti Ahmad',
    assessmentDate: '10 Mei 2026',
    overallStatus: 'Selesai',
    topIntelligences: ['Intrapersonal', 'Logik Matematik', 'Naturalis'],
    counselorRemarks: 'Murid yang amat fokus, berdisiplin tinggi, dan mempunyai motivasi kendiri yang cemerlang. Sangat teliti dalam tugasan individu.',
    ikpScores: [
      { domain: 'Intrapersonal', score: 94, level: 'Tinggi', description: 'Kesedaran kendiri yang tinggi, mampu merancang strategi belajar sendiri, dan mengawal emosi dengan matang.', recommendationHome: 'Galakkan penulisan jurnal harian dan memberi ruang peribadi untuk refleksi kendiri.', recommendationSchool: 'Sediakan tugasan penyelidikan individu dan pengajian kendiri.' },
      { domain: 'Logik Matematik', score: 86, level: 'Tinggi', description: 'Mampu menganalisis masalah kompleks dan menghubungkan pelbagai konsep sains.', recommendationHome: 'Sediakan teka-teki pemikiran kritis dan permainan strategi nombor.', recommendationSchool: 'Libatkan dalam Kuiz Sains & Matematik peringkat PPD/JPN.' },
      { domain: 'Naturalis', score: 80, level: 'Tinggi', description: 'Meminati sains botani dan pemeliharaan ekosistem.', recommendationHome: 'Sokong minat mengumpul spesimen tumbuhan atau fotografi alam.', recommendationSchool: 'Lantik sebagai pengerusi Kelab Pencinta Alam sekolah.' },
      { domain: 'Verbal Linguistik', score: 75, level: 'Tinggi', description: 'Kemahiran penulisan karangan yang tersusun rapat.', recommendationHome: 'Beli buku ensiklopedia atau fiksyen ilmiah.', recommendationSchool: 'Bimbing untuk penulisan esei Sains.' },
      { domain: 'Ruang Visual', score: 70, level: 'Sederhana', description: 'Boleh memahami graf dan peta konsep.', recommendationHome: 'Gunakan peta visual semasa belajar.', recommendationSchool: 'Bantu buat infografik ringkas.' },
      { domain: 'Interpersonal', score: 62, level: 'Sederhana', description: 'Berkomunikasi secara sopan dan tenang.', recommendationHome: 'Ajak berdiskusi hal semasa.', recommendationSchool: 'Tugasan berpasangan.' },
      { domain: 'Muzik', score: 58, level: 'Sederhana', description: 'Peka pada tempo muzik tenang.', recommendationHome: 'Latar muzik klasik semasa belajar.', recommendationSchool: 'Integrasi elemen audio.' },
      { domain: 'Kinestetik', score: 50, level: 'Sederhana', description: 'Gaya hidup sihat asas.', recommendationHome: 'Senaman yoga atau renggangan.', recommendationSchool: 'Sukan gimnastik asas.' },
      { domain: 'Eksistensial', score: 65, level: 'Sederhana', description: 'Menghayati nilai murni dan ikhtibar.', recommendationHome: 'Perbincangan tentang ikhtibar kehidupan.', recommendationSchool: 'Penerapan Pendidikan Moral/Islam.' }
    ],
    imkTopCodes: ['I', 'K', 'A'],
    imkScores: [
      { code: 'I', category: 'Investigatif', score: 92 },
      { code: 'K', category: 'Konvensional', score: 80 },
      { code: 'A', category: 'Artistik', score: 72 },
      { code: 'S', category: 'Sosial', score: 60 },
      { code: 'R', category: 'Realistik', score: 50 },
      { code: 'E', category: 'Enterprising (Usahawan)', score: 45 }
    ],
    suggestedCareers: ['Doktor Perubatan', 'Penyelidik Biologi', 'Penganalisis Data', 'Penulis Ilmiah'],
    aptitudeScores: [
      { component: 'Verbal', score: 88 },
      { component: 'Numerikal', score: 90 },
      { component: 'Penaakulan', score: 94 },
      { component: 'Kreativiti', score: 78 },
      { component: 'Penyelesaian Masalah', score: 92 }
    ]
  },

  {
    id: 'M-502',
    icNumber: '130718-01-7890',
    name: 'Adam Rayyan bin Khairul',
    year: 5,
    className: '5 Gemilang',
    gender: 'Lelaki',
    schoolName: 'SK Seri Bintang Utama',
    counselorName: 'Puan Siti Nurhaliza binti Ahmad',
    assessmentDate: '11 Mei 2026',
    overallStatus: 'Selesai',
    topIntelligences: ['Ruang Visual', 'Logik Matematik', 'Kinestetik'],
    counselorRemarks: 'Cenderung kepada mereka cipta model, animasi digital ringkas, dan membaiki barang peranti. Mempunyai potensi tinggi dalam reka bentuk.',
    ikpScores: [
      { domain: 'Ruang Visual', score: 92, level: 'Tinggi', description: 'Sangat imaginatif dalam aspek seni visual, reka bentuk grafik, dan pemetaan ruang.', recommendationHome: 'Sediakan perisian seni lukis digital Kanak-kanak atau perisian rekabentuk 3D berasaskan blok (Minecraft Edu/Tinkercad).', recommendationSchool: 'Galakkan menyertai kelab reka bentuk dan reka cipta sekolah.' },
      { domain: 'Logik Matematik', score: 82, level: 'Tinggi', description: 'Keupayaan menyelesaikan teka-teki berasaskan corak visual dan nombor.', recommendationHome: 'Beli permainan blok strategi dan teka geometri.', recommendationSchool: 'Gunakan aplikasi Scratch untuk asas pengaturcaraan.' },
      { domain: 'Kinestetik', score: 78, level: 'Tinggi', description: 'Kemahiran menggunakan tangan untuk membina model fizikal.', recommendationHome: 'Sediakan bengkel reka cipta kecil di rumah.', recommendationSchool: 'Libatkan dalam projek Reka Bentuk dan Teknologi (RBT).' },
      { domain: 'Naturalis', score: 65, level: 'Sederhana', description: 'Boleh menghayati bentuk alam semula jadi.', recommendationHome: 'Kaji corak daun dan bentuk batu.', recommendationSchool: 'Eksperimen RBT berasaskan bahan kitar semula.' },
      { domain: 'Verbal Linguistik', score: 60, level: 'Sederhana', description: 'Mampu menjelaskan idea menerusi lukisan.', recommendationHome: 'Galakkan melukis komik berserta skrip ringkas.', recommendationSchool: 'Sediakan pembentangan berasaskan visual.' },
      { domain: 'Interpersonal', score: 58, level: 'Sederhana', description: 'Boleh bekerjasama dalam projek reka bentuk.', recommendationHome: 'Bina projek keluarga.', recommendationSchool: 'Kerja kumpulan RBT.' },
      { domain: 'Intrapersonal', score: 60, level: 'Sederhana', description: 'Refleksi terhadap hasil seni sendiri.', recommendationHome: 'Berikan sokongan pada karya anak.', recommendationSchool: 'Pameran hasil seni murid.' },
      { domain: 'Muzik', score: 52, level: 'Sederhana', description: 'Kefahaman irama asas.', recommendationHome: 'Muzik sampingan semasa melukis.', recommendationSchool: 'Penggunaan audio latar semasa pameran.' },
      { domain: 'Eksistensial', score: 45, level: 'Rendah', description: 'Kefahaman nilai asas kehidupan.', recommendationHome: 'Penerapan nilai bersyukur.', recommendationSchool: 'Bimbingan sivik.' }
    ],
    imkTopCodes: ['A', 'R', 'I'],
    imkScores: [
      { code: 'A', category: 'Artistik', score: 90 },
      { code: 'R', category: 'Realistik', score: 84 },
      { code: 'I', category: 'Investigatif', score: 76 },
      { code: 'E', category: 'Enterprising (Usahawan)', score: 55 },
      { code: 'K', category: 'Konvensional', score: 45 },
      { code: 'S', category: 'Sosial', score: 40 }
    ],
    suggestedCareers: ['Pereka Grafik / Animasi', 'Aktivis Reka Bentuk 3D', 'Jurutera Rekabentuk', 'Pereka Hiasan Dalaman'],
    aptitudeScores: [
      { component: 'Verbal', score: 70 },
      { component: 'Numerikal', score: 84 },
      { component: 'Penaakulan', score: 88 },
      { component: 'Kreativiti', score: 96 },
      { component: 'Penyelesaian Masalah', score: 86 }
    ]
  },

  // --- TAHUN 6 ---
  {
    id: 'M-601',
    icNumber: '120108-14-1122', // Easy test IC 4
    name: 'Muhammad Faris bin Imran',
    year: 6,
    className: '6 Cemerlang',
    gender: 'Lelaki',
    schoolName: 'SK Seri Bintang Utama',
    counselorName: 'Puan Siti Nurhaliza binti Ahmad',
    assessmentDate: '02 Mac 2026',
    overallStatus: 'Selesai',
    topIntelligences: ['Verbal Linguistik', 'Interpersonal', 'Logik Matematik'],
    counselorRemarks: 'Ketua Murid Sekolah. Kepimpinan yang amat cemerlang, petah berucap, dan cemerlang akademik. Calon potensi untuk Anugerah Murid Cemerlang PPsi PPD.',
    ikpScores: [
      { domain: 'Verbal Linguistik', score: 96, level: 'Tinggi', description: 'Sangat petah, kosa kata yang luas dan penguasaan bahasa Melayu dan Inggeris secara matang.', recommendationHome: 'Dedahkan kepada penulisan artikel, buku motivasi kepimpinan, dan pengucapan awam lanjutan.', recommendationSchool: 'Galakkan memimpin badan wakil murid, perbahasan sekolah rendah, dan wakil PPD.' },
      { domain: 'Interpersonal', score: 94, level: 'Tinggi', description: 'Kebolehan memimpin kumpulan, mendengar pandangan rakan, dan membina suasana harmoni.', recommendationHome: 'Libatkan dalam aktiviti khidmat masyarakat dan kepimpinan belia tempatan.', recommendationSchool: 'Dilantik sebagai Ketua Murid dan Pengawas Sekolah.' },
      { domain: 'Logik Matematik', score: 88, level: 'Tinggi', description: 'Mampu menghubungkan fakta sains dan matematik secara strategik.', recommendationHome: 'Beri soalan KBAT dan analitik kehidupan.', recommendationSchool: 'Libatkan dalam Olympiad Matematik & Bahasa.' },
      { domain: 'Intrapersonal', score: 85, level: 'Tinggi', description: 'Memiliki disiplin diri dan matlamat persekolahan yang sangat jelas.', recommendationHome: 'Sokong perancangan ke Sekolah Berprestasi Tinggi / SBP.', recommendationSchool: 'Sesi kaunseling hala tuju Tingkatan 1.' },
      { domain: 'Eksistensial', score: 80, level: 'Tinggi', description: 'Peka terhadap moral, etika, dan keharmonian sejagat.', recommendationHome: 'Bincangkan nilai kepimpinan berintegriti.', recommendationSchool: 'Jadikan ikon sahsiah terpuji sekolah.' },
      { domain: 'Ruang Visual', score: 75, level: 'Tinggi', description: 'Memahami carta visual perancangan program.', recommendationHome: 'Galakkan membuat jadual visual.', recommendationSchool: 'Aktiviti carta alir program.' },
      { domain: 'Muzik', score: 70, level: 'Sederhana', description: 'Apresiasi seni dan muzik kebudayaan.', recommendationHome: 'Dedahkan kepada persembahan kebudayaan.', recommendationSchool: 'Penglibatan majlis rasmi.' },
      { domain: 'Naturalis', score: 68, level: 'Sederhana', description: 'Menghargai kebersihan persekitaran sekolah.', recommendationHome: 'Aktiviti gotong-royong keluarga.', recommendationSchool: 'Kempen Sekolah Dalam Taman.' },
      { domain: 'Kinestetik', score: 65, level: 'Sederhana', description: 'Aktif dalam badminton dan sukan tara.', recommendationHome: 'Sukan badminton bersama keluarga.', recommendationSchool: 'Wakil kelab badminton.' }
    ],
    imkTopCodes: ['E', 'S', 'I'],
    imkScores: [
      { code: 'E', category: 'Enterprising (Usahawan)', score: 95 },
      { code: 'S', category: 'Sosial', score: 92 },
      { code: 'I', category: 'Investigatif', score: 84 },
      { code: 'K', category: 'Konvensional', score: 75 },
      { code: 'A', category: 'Artistik', score: 60 },
      { code: 'R', category: 'Realistik', score: 50 }
    ],
    suggestedCareers: ['Pegawai Tadbir & Diplomatik (PTD)', 'Peguam', 'Usahawan Teknologi', 'Pengarah Eksekutif / Pemimpin Korporat'],
    aptitudeScores: [
      { component: 'Verbal', score: 98 },
      { component: 'Numerikal', score: 90 },
      { component: 'Penaakulan', score: 96 },
      { component: 'Kreativiti', score: 88 },
      { component: 'Penyelesaian Masalah', score: 94 }
    ]
  },

  {
    id: 'M-602',
    icNumber: '120520-08-3344',
    name: 'Nurul Imān binti Badrul',
    year: 6,
    className: '6 Cemerlang',
    gender: 'Perempuan',
    schoolName: 'SK Seri Bintang Utama',
    counselorName: 'Puan Siti Nurhaliza binti Ahmad',
    assessmentDate: '03 Mac 2026',
    overallStatus: 'Selesai',
    topIntelligences: ['Muzik', 'Verbal Linguistik', 'Interpersonal'],
    counselorRemarks: 'Bakat seni muzik yang mengagumkan, kerap menjadi vokalis nasyid/koral dan mempunyai daya ingatan yang sangat baik menerusi irama.',
    ikpScores: [
      { domain: 'Muzik', score: 95, level: 'Tinggi', description: 'Peka terhadap pic, irama, ton, dan harmoni muzik secara luar biasa.', recommendationHome: 'Daftarkan kelas latihan vokal atau alat muzik klasikal.', recommendationSchool: 'Lantik sebagai ketua kumpulan nasyid/koir sekolah.' },
      { domain: 'Verbal Linguistik', score: 88, level: 'Tinggi', description: 'Pandai mengubah lirik dan menulis sajak ringkas.', recommendationHome: 'Galakkan penulisan puisi dan gubahan lagu kanak-kanak.', recommendationSchool: 'Libatkan dalam pertandingan deklamasi sajak PPD.' },
      { domain: 'Interpersonal', score: 82, level: 'Tinggi', description: 'Mesra, berbudi bahasa, dan cepat membina ukhuwah.', recommendationHome: 'Aktiviti kemasyarakatan.', recommendationSchool: 'Pembimbing rakan sebaya.' },
      { domain: 'Intrapersonal', score: 75, level: 'Tinggi', description: 'Sangat memahami minat dan cita-cita diri.', recommendationHome: 'Bimbing matlamat seni.', recommendationSchool: 'Kembangkan potensi seni.' },
      { domain: 'Ruang Visual', score: 68, level: 'Sederhana', description: 'Apresiasi warna dan pentas.', recommendationHome: 'Gubahan pentas kecil.', recommendationSchool: 'Persembahan visual.' },
      { domain: 'Logik Matematik', score: 65, level: 'Sederhana', description: 'Kefahaman asas nota muzik dan matematik.', recommendationHome: 'Latihan matematik harian.', recommendationSchool: 'Aplikasi matematik dlm muzik.' },
      { domain: 'Naturalis', score: 60, level: 'Sederhana', description: 'Suka keindahan alam.', recommendationHome: 'Aktiviti riadah.', recommendationSchool: 'Kelab landskap.' },
      { domain: 'Kinestetik', score: 62, level: 'Sederhana', description: 'Pergerakan kreatif pentas.', recommendationHome: 'Latihan tarian kebudayaan.', recommendationSchool: 'Persembahan gimrama/tarian.' },
      { domain: 'Eksistensial', score: 55, level: 'Sederhana', description: 'Penghayatan lirik bermoral.', recommendationHome: 'Perbincangan Maksud lirik.', recommendationSchool: 'Aktiviti kerohanian.' }
    ],
    imkTopCodes: ['A', 'S', 'E'],
    imkScores: [
      { code: 'A', category: 'Artistik', score: 94 },
      { code: 'S', category: 'Sosial', score: 85 },
      { code: 'E', category: 'Enterprising (Usahawan)', score: 70 },
      { code: 'I', category: 'Investigatif', score: 55 },
      { code: 'K', category: 'Konvensional', score: 50 },
      { code: 'R', category: 'Realistik', score: 40 }
    ],
    suggestedCareers: ['Komposer / Guru Muzik', 'Penulis Skrip & Lirik', 'Pengurus Acara Seni', 'Penterjemah Bahasa'],
    aptitudeScores: [
      { component: 'Verbal', score: 90 },
      { component: 'Numerikal', score: 68 },
      { component: 'Penaakulan', score: 78 },
      { component: 'Kreativiti', score: 95 },
      { component: 'Penyelesaian Masalah', score: 80 }
    ]
  },

  {
    id: 'M-603',
    icNumber: '120911-10-5566',
    name: 'Muhammad Luqman bin Syukri',
    year: 6,
    className: '6 Gemilang',
    gender: 'Lelaki',
    schoolName: 'SK Seri Bintang Utama',
    counselorName: 'Puan Siti Nurhaliza binti Ahmad',
    assessmentDate: '04 Mac 2026',
    overallStatus: 'Selesai',
    topIntelligences: ['Naturalis', 'Kinestetik', 'Intrapersonal'],
    counselorRemarks: 'Sangat berminat dalam projek sains pertanian moden (hidroponik sekolah). Rajin, berdikari, dan cermat mengendalikan peralatan.',
    ikpScores: [
      { domain: 'Naturalis', score: 92, level: 'Tinggi', description: 'Kecenderungan yang sangat tinggi terhadap pemeliharaan flora, fauna, dan projek kelestarian.', recommendationHome: 'Sediakan ruang berkebun hidroponik kecil atau mini terrarium di rumah.', recommendationSchool: 'Jadikan pengerusi Kelab Pertanian / Eco-School.' },
      { domain: 'Kinestetik', score: 84, level: 'Tinggi', description: 'Kemahiran fizikal dan kerja tangan yang cekap.', recommendationHome: 'Aktiviti kerja tangan dan sukan luar.', recommendationSchool: 'Libatkan dalam amali Sains & RBT.' },
      { domain: 'Intrapersonal', score: 76, level: 'Tinggi', description: 'Gemar bekerja secara bersendirian dengan tenang dan teratur.', recommendationHome: 'Beri tugasan berkebun individu.', recommendationSchool: 'Beri projek sains berdikari.' },
      { domain: 'Logik Matematik', score: 70, level: 'Sederhana', description: 'Boleh mengira nisbah baja dan PH air.', recommendationHome: 'Kira sukatan baja bersama.', recommendationSchool: 'Pengiraan eksperimen sains.' },
      { domain: 'Ruang Visual', score: 68, level: 'Sederhana', description: 'Lakaran susun atur taman.', recommendationHome: 'Melukis pelan taman.', recommendationSchool: 'Lakaran projek RBT.' },
      { domain: 'Interpersonal', score: 60, level: 'Sederhana', description: 'Komunikasi mesra bertema.', recommendationHome: 'Kongsikan hasil kebun dgn jiran.', recommendationSchool: 'Jualan hasil kebun sekolah.' },
      { domain: 'Verbal Linguistik', score: 58, level: 'Sederhana', description: 'Menulis jurnal tanaman.', recommendationHome: 'Galakkan buat catatan kebun.', recommendationSchool: 'Laporan projek sains.' },
      { domain: 'Muzik', score: 50, level: 'Sederhana', description: 'Mendengar bunyi alam.', recommendationHome: 'Mendengar audio bunyi alam.', recommendationSchool: 'Integrasi terapi bunyi.' },
      { domain: 'Eksistensial', score: 55, level: 'Sederhana', description: 'Kefahaman kitaran hayat.', recommendationHome: 'Bincang penciptaan alam.', recommendationSchool: 'Sains kitaran hayat.' }
    ],
    imkTopCodes: ['R', 'I', 'K'],
    imkScores: [
      { code: 'R', category: 'Realistik', score: 92 },
      { code: 'I', category: 'Investigatif', score: 80 },
      { code: 'K', category: 'Konvensional', score: 72 },
      { code: 'S', category: 'Sosial', score: 55 },
      { code: 'E', category: 'Enterprising (Usahawan)', score: 50 },
      { code: 'A', category: 'Artistik', score: 42 }
    ],
    suggestedCareers: ['Pegawai Pertanian Moden', 'Veterinar / Doktor Haiwan', 'Penyelidik Bioteknologi', 'Pegawai Geologi'],
    aptitudeScores: [
      { component: 'Verbal', score: 68 },
      { component: 'Numerikal', score: 76 },
      { component: 'Penaakulan', score: 84 },
      { component: 'Kreativiti', score: 72 },
      { component: 'Penyelesaian Masalah', score: 88 }
    ]
  }
];

export const INITIAL_AUDIT_LOGS: SystemAuditLog[] = [
  {
    id: 'LOG-001',
    timestamp: '2026-08-01 10:15:22',
    userType: 'Waris',
    action: 'Semakan Keputusan PPsi',
    details: 'Semakan No MyKid 140512-10-1234 (Ahmad Daniel bin Razak)'
  },
  {
    id: 'LOG-002',
    timestamp: '2026-08-01 09:30:00',
    userType: 'Guru',
    action: 'Akses Portal Guru',
    details: 'Melihat Analisa Keseluruhan Tahun 4, 5 & 6'
  },
  {
    id: 'LOG-003',
    timestamp: '2026-08-01 08:45:10',
    userType: 'Pentadbir',
    action: 'Penyelenggaraan Sistem',
    details: 'Pengesahan Status Penguncian Data PPsi Sesi 2026/2027'
  }
];

export function findStudentByIC(icRaw: string): StudentPsychometricRecord | undefined {
  const cleanIC = icRaw.replace(/[^0-9]/g, '');
  return MOCK_STUDENTS.find(s => s.icNumber.replace(/[^0-9]/g, '') === cleanIC);
}
