import axios from 'axios';
import { Prediction, DateRange, HuggingFaceResponse } from '../types';

// This is a mock service that would normally connect to your HuggingFace model
// In a real implementation, this would make API calls to your deployed model

// Mock data generator for development
const generateMockPredictions = (dateRange: DateRange): Prediction[] => {
  const crimeTypes = ['ASSAULT', 'BURGLARY', 'THEFT', 'ROBBERY', 'VEHICLE_THEFT', 'HOMICIDE', 'VANDALISM', 'OTHER'];
  const riskLevels = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
  const zones = ['Central', 'Rampart', 'Southwest', 'Hollywood', 'Harbor', 'West LA', 'Van Nuys', 'Northeast'];
  
  // LA area coordinates (approximate)
  const laCoordinates = {
    lat: { min: 33.7, max: 34.3 },
    lng: { min: -118.6, max: -118.1 }
  };
  
  const mockPredictions: Prediction[] = [];
  
  // Generate 30-50 random predictions
  const count = Math.floor(Math.random() * 20) + 30;
  
  for (let i = 0; i < count; i++) {
    const riskLevel = riskLevels[Math.floor(Math.random() * riskLevels.length)] as any;
    const crimeType = crimeTypes[Math.floor(Math.random() * crimeTypes.length)] as any;
    const zone = zones[Math.floor(Math.random() * zones.length)];
    
    // Make high risk crimes more common in certain areas
    let latOffset = 0;
    let lngOffset = 0;
    
    if (riskLevel === 'HIGH' || riskLevel === 'CRITICAL') {
      // Cluster high risk crimes in south-central area
      latOffset = -0.1;
      lngOffset = 0.1;
    }
    
    const latitude = laCoordinates.lat.min + 
                     (Math.random() * (laCoordinates.lat.max - laCoordinates.lat.min)) + 
                     latOffset;
    
    const longitude = laCoordinates.lng.min + 
                      (Math.random() * (laCoordinates.lng.max - laCoordinates.lng.min)) + 
                      lngOffset;
    
    // Higher crime counts for higher risk levels
    let crimeCount = 1;
    if (riskLevel === 'MEDIUM') crimeCount = Math.floor(Math.random() * 3) + 2;
    if (riskLevel === 'HIGH') crimeCount = Math.floor(Math.random() * 5) + 3;
    if (riskLevel === 'CRITICAL') crimeCount = Math.floor(Math.random() * 7) + 5;
    
    mockPredictions.push({
      id: `pred-${i}`,
      zone,
      date: dateRange.startDate, // Using start date for simplicity
      crimeCount,
      crimeType,
      latitude,
      longitude,
      riskLevel
    });
  }
  
  return mockPredictions;
};

// This function would fetch predictions from your HuggingFace model
export const fetchPredictions = async (dateRange: DateRange): Promise<Prediction[]> => {
  try {
    // In a real implementation, this would call your HuggingFace model API
    // const response = await axios.post('https://api-inference.huggingface.co/models/YOUR_MODEL', {
    //   inputs: {
    //     startDate: dateRange.startDate,
    //     endDate: dateRange.endDate
    //   }
    // }, {
    //   headers: {
    //     Authorization: `Bearer ${process.env.HUGGINGFACE_TOKEN}`
    //   }
    // });
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For development, return mock data
    return generateMockPredictions(dateRange);
    
    // In production, you'd parse the real response:
    // return response.data.predictions;
  } catch (error) {
    console.error('Error fetching predictions:', error);
    throw new Error('Failed to fetch predictions');
  }
};

// This function would be implemented to fetch data for specific zones
export const fetchZoneData = async (zoneId: string): Promise<any> => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // For development, return mock data
    return {
      id: zoneId,
      statistics: {
        crimeCount: Math.floor(Math.random() * 100) + 50,
        highRiskAreas: Math.floor(Math.random() * 5) + 1,
        mostCommonCrime: 'THEFT'
      }
    };
  } catch (error) {
    console.error('Error fetching zone data:', error);
    throw new Error('Failed to fetch zone data');
  }
};