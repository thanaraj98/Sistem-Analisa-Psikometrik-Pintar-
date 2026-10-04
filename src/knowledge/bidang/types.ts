export interface BidangStructure {
  id: string;
  namaBidang: string;
  kategori: string;
  deskripsi: string;
  domainBerkaitan: string[];
  metadata: {
    version: string;
  };
}

export const createEmptyBidang = (id: string, namaBidang: string): BidangStructure => ({
  id,
  namaBidang,
  kategori: '',
  deskripsi: '',
  domainBerkaitan: [],
  metadata: {
    version: '1.0.0',
  },
});
