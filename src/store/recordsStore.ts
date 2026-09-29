export interface PlantRecord {
  id: string;
  recordId: string;
  scientificName: string;
  commonName: string;
  family: string;
  height?: string;
  morphology?: string;
  notes?: string;
  locationName: string;
  gpsCoordination: string;
  photoUri?: string;
  status: 'Pending' | 'Synced' | 'Failed';
  createdAt: string;
}

let records: PlantRecord[] = [];
let listeners: Array<() => void> = [];

export const RecordsStore = {
  getRecords: (): PlantRecord[] => records,

  addRecord: (record: Omit<PlantRecord, 'id' | 'createdAt'>): PlantRecord => {
    const newEntry: PlantRecord = {
      ...record,
      id: Date.now().toString(),
      createdAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
    };
    records = [newEntry, ...records];
    listeners.forEach((l) => l());
    return newEntry;
  },

  syncAllPending: () => {
    records = records.map((r) => (r.status === 'Pending' ? { ...r, status: 'Synced' } : r));
    listeners.forEach((l) => l());
  },

  subscribe: (listener: () => void) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
};