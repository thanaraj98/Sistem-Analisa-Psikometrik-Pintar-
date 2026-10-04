export interface DomainStructure {
  id: string;
  nama: string;
  kategori: string;
  tahun: number[];
  definisiKPM: string;
  interpretasiAI: string;
  kekuatan: string[];
  penambahbaikan: string[];
  aktivitiPdP: string[];
  cadanganGuru: string[];
  cadanganGBK: string[];
  cadanganMurid: string[];
  cadanganWaris: string[];
  bidangBerkaitan: string[];
  metadata: {
    createdDate?: string;
    updatedDate?: string;
    version: string;
  };
}

export const emptyDomainTemplate: DomainStructure = {
  id: '',
  nama: '',
  kategori: '',
  tahun: [],
  definisiKPM: '',
  interpretasiAI: '',
  kekuatan: [],
  penambahbaikan: [],
  aktivitiPdP: [],
  cadanganGuru: [],
  cadanganGBK: [],
  cadanganMurid: [],
  cadanganWaris: [],
  bidangBerkaitan: [],
  metadata: {
    version: '1.0.0',
  },
};
