export type SasaranPrompt =
  | 'Tahun 4'
  | 'Tahun 5'
  | 'Tahun 6'
  | 'Guru'
  | 'GBK'
  | 'Murid'
  | 'Waris';

export interface AIPromptStructure {
  id: string;
  sasaran: SasaranPrompt;
  systemPromptTemplate: string;
  userPromptTemplate: string;
  parameterKeys: string[];
  metadata: {
    version: string;
  };
}
