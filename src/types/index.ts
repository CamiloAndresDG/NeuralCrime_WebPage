export interface Prediction {
  id: string;
  zone: string;
  date: string;
  crimeCount: number;
  crimeType: CrimeType;
  latitude: number;
  longitude: number;
  riskLevel: RiskLevel;
}

export type CrimeType = 
  | 'ASSAULT'
  | 'BURGLARY'
  | 'THEFT'
  | 'ROBBERY'
  | 'VEHICLE_THEFT'
  | 'HOMICIDE'
  | 'VANDALISM'
  | 'OTHER';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface Zone {
  id: string;
  name: string;
  code: string;
  boundaries: [number, number][];
}

export interface ZoneStatistics {
  zoneId: string;
  zoneName: string;
  totalPredictedCrimes: number;
  crimeTypeDistribution: Record<CrimeType, number>;
  riskLevelDistribution: Record<RiskLevel, number>;
}

export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface HuggingFaceResponse {
  predictions: Prediction[];
  timestamp: string;
  modelVersion: string;
}

export interface PredictionFilters {
  crimeTypes: CrimeType[];
  riskLevels: RiskLevel[];
  zones: string[];
  dateRange: DateRange;
}

export interface MapSettings {
  showHeatmap: boolean;
  showZoneBoundaries: boolean;
  showPredictionMarkers: boolean;
}