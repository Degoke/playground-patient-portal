import axios from 'axios';

const fhirClient = axios.create({
  baseURL: 'https://hapi.fhir.org/baseR4', // Public HAPI FHIR server
  headers: {
    'Content-Type': 'application/fhir+json',
    'Accept': 'application/fhir+json',
  },
});


// Generic function to fetch resources related to a patient
const getPatientResources = async (patientId: string, resourceType: string, params: object = {}) => {
  try {
    const response = await fhirClient.get(`/${resourceType}`, {
      params: { patient: patientId, ...params },
    });
    return response.data.entry?.map((e: any) => e.resource) || [];
  } catch (error: any) {
    console.error(`Error fetching ${resourceType} for patient ${patientId}:`, error.message);
    return [];
  }
};

// Fetch patient demographics
export const getPatientById = async (patientId: string) => {
  try {
    const response = await fhirClient.get(`/Patient/${patientId}`);
    return response.data;
  } catch (error: any) {
    console.error(`Error fetching Patient/${patientId}:`, error.message);
    return null;
  }
};

// Fetch patient summary
export const getPatientSummary = async (patientId: string) => {
  try {
    const response = await fhirClient.get(`/Patient/${patientId}/$summary`);
    return response.data;
    console.log(response.data);
  } catch (error: any) {
    console.error(`Error fetching Patient/${patientId}/$summary:`, error.message);
    return null;
  }
};

// Specific functions for different resources
export const getPatientAppointments = (patientId: string) => 
  getPatientResources(patientId, 'Appointment', { _sort: '-date' });

export const getPatientAppointmentRequests = (patientId: string) => 
  getPatientResources(patientId, 'AppointmentRequest', { _sort: '-date' });

export const getPatientMedications = (patientId: string) => 
  getPatientResources(patientId, 'MedicationRequest');

export const getPatientConditions = (patientId: string) => 
  getPatientResources(patientId, 'Condition');
