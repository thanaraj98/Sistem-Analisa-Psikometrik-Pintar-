export interface TahapPenguasaanRule {
  julatSkor: string;
  tahap: string;
  penerangan: string;
}

export interface InterpretationStructure {
  tahun: number;
  tahapPenguasaanRules: TahapPenguasaanRule[];
  thresholds: Record<string, unknown>;
  metadata: {
    version: string;
  };
}
