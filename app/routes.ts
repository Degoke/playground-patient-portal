import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("portal/:patientId", "routes/portal.$patientId.tsx", [
    route("dashboard", "routes/portal.$patientId.dashboard.tsx"),
    route("profile", "routes/portal.$patientId.profile.tsx"),
    route("appointments", "routes/portal.$patientId.appointments.tsx"),
    route("medications", "routes/portal.$patientId.medications.tsx"),
    route("conditions", "routes/portal.$patientId.conditions.tsx"),
  ]),
] satisfies RouteConfig;
