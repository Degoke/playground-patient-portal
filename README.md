# Playground Patient Portal

A modern, responsive patient portal built with React Router v7, TypeScript, and FHIR integration. This is a **playground project** for testing FHIR features and experimenting with healthcare data interoperability. A good starting point for developers working with FHIR and patient portal applications.

## 🏥 Features

### Core Functionality
- **Patient Authentication**: Simple patient ID-based login system for easy testing
- **Dashboard**: Personalized overview with upcoming appointments and health summary
- **Profile Management**: View and manage patient demographics and personal information
- **Appointment Management**: View scheduled appointments and appointment history
- **Medication Tracking**: Access current medications and medication history
- **Condition Management**: View active and historical medical conditions

### Technical Features
- **FHIR Integration**: Full FHIR R4 compliance for healthcare data interoperability
- **Playground Environment**: Perfect for testing new FHIR features and standards
- **Responsive Design**: Mobile-first design with Mantine UI components
- **Type Safety**: Full TypeScript implementation with strict type checking
- **Modern Routing**: File-based routing with React Router v7
- **Real-time Updates**: Dynamic data loading with proper error handling
- **Accessibility**: WCAG compliant UI components
- **Community-Driven**: Open for contributions and feature experimentation

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 with React Router v7
- **UI Library**: Mantine v8 with Tailwind CSS v4
- **Language**: TypeScript 5.8
- **Build Tool**: Vite 6.3
- **HTTP Client**: Axios
- **Icons**: Tabler Icons React
- **Date Handling**: Moment.js
- **Healthcare Standards**: FHIR R4

## 📁 Project Structure

```
app/
├── components/           # Reusable UI components
│   └── PortalLayout.tsx # Main portal layout with navigation
├── routes/              # File-based routing
│   ├── home.tsx         # Login/landing page
│   └── portal/          # Patient portal routes
│       ├── $patientId.tsx                    # Portal wrapper
│       ├── $patientId.dashboard.tsx          # Dashboard overview
│       ├── $patientId.profile.tsx            # Patient profile
│       ├── $patientId.appointments.tsx       # Appointments management
│       ├── $patientId.medications.tsx        # Medications tracking
│       └── $patientId.conditions.tsx         # Medical conditions
├── services/            # API and business logic
│   └── fhir.service.ts  # FHIR API integration
├── types/               # TypeScript type definitions
├── app.css              # Global styles
├── root.tsx             # Root component and layout
└── routes.ts            # Route configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn package manager
- Access to a FHIR R4 compliant server

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd playground-patient-portal
   ```

2. **Install dependencies**
```bash
npm install
```

3. **Set up a FHIR Server on ByteEngine**
   
   **Option A: Quick Setup with ByteEngine (Recommended for Playground)**
   
   ByteEngine provides an easy way to spin up FHIR servers for testing and development:
   
   a. **Sign up/Login** to [ByteEngine](https://bytenegine.boolbyte.com)
   
   b. **Create a new FHIR server**:
      - Choose "FHIR R4" as the server type
      - Select your preferred region
      - Give it a memorable name (e.g., "playground-patient-portal")
   
   c. **Get your server credentials**:
      - Copy the **Server URL** (e.g., `https://your-server.bytenegine.com/fhir`)
      - Copy the **API Key** from the server dashboard
   
   d. **Create environment file**:
      Create a `.env` file in the root directory:
      ```env
      VITE_FHIR_BASE_URL=https://your-server.bytenegine.com/fhir
      VITE_FHIR_TOKEN=your-api-key-here
      ```
   
   **Option B: Use Your Own FHIR Server**
   ```env
   VITE_FHIR_BASE_URL=https://your-fhir-server.com/fhir
   VITE_FHIR_TOKEN=your-bearer-token-here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

6. **Test with Sample Data**
   - Use patient ID `1280381` (pre-configured for testing)
   - Or create your own test patients in your FHIR server

### Building for Production

```bash
# Build the application
npm run build

# Start the production server
npm run start

# Run type checking
npm run typecheck
```

## 🔧 Configuration

### FHIR Server Setup

The application requires a FHIR R4 compliant server. Configure the following environment variables:

- `VITE_FHIR_BASE_URL`: Base URL of your FHIR server
- `VITE_FHIR_TOKEN`: Bearer token for authentication (optional)

### Supported FHIR Resources

The application integrates with the following FHIR resources:

- **Patient**: Patient demographics and basic information
- **Appointment**: Scheduled appointments and availability
- **AppointmentRequest**: Appointment booking requests
- **MedicationRequest**: Current and historical medications
- **Condition**: Active and resolved medical conditions

## 🏗️ Architecture

### Routing System
- **File-based routing** with React Router v7
- **Nested routes** for portal sections
- **Dynamic parameters** for patient-specific pages
- **Type-safe route definitions**

### State Management
- **Server-side data loading** with React Router loaders
- **Client-side form state** with Mantine forms
- **Navigation state** with React Router navigation hooks

### FHIR Integration
- **Generic resource fetching** with patient context
- **Error handling** for network and server errors
- **Type-safe API responses** with proper error boundaries

## 🎨 UI/UX Design

### Design System
- **Mantine UI components** for consistent design
- **Tailwind CSS** for utility-first styling
- **Inter font** for improved readability
- **Responsive breakpoints** for all device sizes

### User Experience
- **Intuitive navigation** with clear visual hierarchy
- **Loading states** for better perceived performance
- **Error boundaries** for graceful error handling
- **Accessibility features** for inclusive design

## 🧪 Testing

### Development Testing
```bash
# Run type checking
npm run typecheck

# Start development server with hot reload
npm run dev
```

### Production Testing
```bash
# Build and test production bundle
npm run build
npm run start
```

## 🚀 Deployment

### Docker Deployment
The project includes a multi-stage Dockerfile for optimized production builds:

```bash
# Build Docker image
docker build -t patient-portal .

# Run container
docker run -p 3000:3000 patient-portal
```

### Environment Variables for Production
Ensure the following environment variables are set in your production environment:

- `VITE_FHIR_BASE_URL`: Production FHIR server URL
- `VITE_FHIR_TOKEN`: Production authentication token

## 📋 API Reference

### FHIR Service Methods

#### `getPatientById(patientId: string)`
Fetches patient demographics by ID.

#### `getPatientSummary(patientId: string)`
Retrieves a comprehensive patient summary.

#### `getPatientAppointments(patientId: string)`
Fetches all appointments for a patient, sorted by date.

#### `getPatientAppointmentRequests(patientId: string)`
Retrieves appointment requests for a patient.

#### `getPatientMedications(patientId: string)`
Fetches medication requests, sorted by authored date.

#### `getPatientConditions(patientId: string)`
Retrieves medical conditions, sorted by onset date.

## 🔒 Security Considerations

- **Environment Variables**: Sensitive configuration stored in environment variables
- **FHIR Authentication**: Bearer token authentication for API access
- **Error Handling**: No sensitive information exposed in error messages
- **Input Validation**: Form validation with Mantine form hooks

## 🤝 Contributing

This is a **community-driven playground project**! We welcome contributions from developers, healthcare professionals, FHIR enthusiasts, and anyone interested in exploring healthcare technology.

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Experiment and build**:
   - Add new FHIR resource integrations
   - Implement new patient portal features
   - Test new FHIR standards and profiles
   - Improve UI/UX components
   - Add new healthcare workflows
4. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
5. **Push to the branch** (`git push origin feature/amazing-feature`)
6. **Open a Pull Request**

### Ideas for Contributions

- **New FHIR Resources**: Integrate additional FHIR resources (Observations, DiagnosticReports, etc.)
- **Advanced Features**: Add telehealth, lab results, prescription management
- **UI Enhancements**: Improve accessibility, add dark mode, mobile optimizations
- **Testing Tools**: Add FHIR validation, test data generators
- **Documentation**: Improve guides, add tutorials, create video demos
- **Performance**: Optimize data loading, add caching, improve bundle size

### Community Guidelines

- Be respectful and inclusive
- Test your changes thoroughly
- Document new features
- Follow existing code style
- Ask questions in issues or discussions

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the FHIR server connectivity
- Verify environment variable configuration
- Review the browser console for error messages

## 🔮 Future Enhancements

This playground is perfect for experimenting with these ideas and more:

- **Real-time notifications** for appointment reminders
- **Telehealth integration** for virtual appointments
- **Lab results viewing** with FHIR DiagnosticReport
- **Prescription management** with medication ordering
- **Multi-language support** for internationalization
- **Advanced search and filtering** for health records
- **Export functionality** for patient data portability
- **FHIR R5 features** as they become available
- **SMART on FHIR** app integration
- **FHIR Bulk Data** for large dataset handling
- **Custom FHIR profiles** and extensions
- **AI-powered health insights** using FHIR data

**Have an idea?** Open an issue or start building! This playground is designed for experimentation and innovation.