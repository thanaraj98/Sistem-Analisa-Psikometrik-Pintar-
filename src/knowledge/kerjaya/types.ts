export interface KerjayaItem {
  id: string;
  namaKerjaya: string;
  deskripsi: string;
  kelayakanMinima: string;
}

export interface KerjayaMappingStructure {
  bidangId: string;
  namaBidang: string;
  contohKerjaya: KerjayaItem[];
  metadata: {
    version: string;
  };
}

export const emptyKerjayaMapping: KerjayaMappingStructure = {
  bidangId: '',
  namaBidang: '',
  contohKerjaya: [],
  metadata: {
    version: '1.0.0',
  },
};
