import axios from 'axios';
// Resolve base URL and optional token from environment (Vite requires direct property access)
const FHIR_BASE_URL = import.meta.env.VITE_FHIR_BASE_URL as string | undefined;
const FHIR_TOKEN = import.meta.env.VITE_FHIR_TOKEN as string | undefined;

if (!FHIR_BASE_URL) {
  console.error("Missing VITE_FHIR_BASE_URL. Set it in your .env file.");
}

const defaultHeaders: Record<string, string> = {
  'Content-Type': 'application/fhir+json',
  'Accept': 'application/fhir+json',
};

if (FHIR_TOKEN) {
  defaultHeaders['Authorization'] = `Bearer ${FHIR_TOKEN}`;
}

const fhirClient = axios.create({
  baseURL: FHIR_BASE_URL,
  headers: defaultHeaders,
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
  getPatientResources(patientId, 'MedicationRequest', { _sort: '-authoredOn' });

export const getPatientConditions = (patientId: string) => 
  getPatientResources(patientId, 'Condition', { _sort: '-onset-date' });
