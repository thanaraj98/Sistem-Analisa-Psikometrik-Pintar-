export type PerananIntervensi = 'Guru' | 'GBK' | 'Murid' | 'Waris';

export interface IntervensiItem {
  id: string;
  kategori: string;
  tindakan: string;
  objektif: string;
  domainTarget: string[];
}

export interface InterventionStructure {
  peranan: PerananIntervensi;
  senaraiIntervensi: IntervensiItem[];
  metadata: {
    version: string;
  };
}
