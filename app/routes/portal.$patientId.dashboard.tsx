import { useLoaderData, useNavigation } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { Title, Text, Card, SimpleGrid, Badge, Loader, Center } from "@mantine/core";
import { getPatientById, getPatientAppointments } from "~/services/fhir.service";

export async function loader({ params }: LoaderFunctionArgs) {
  const patientId = params.patientId!;
  const [patient, appointments] = await Promise.all([
      getPatientById(patientId),
      getPatientAppointments(patientId)
  ]);
  
  if (!patient) throw new Response("Patient Not Found", { status: 404 });

  // Find the next upcoming appointment
  const upcomingAppointment = appointments
    .filter((a: any) => new Date(a.start) > new Date())
    .sort((a: any, b: any) => new Date(a.start).getTime() - new Date(b.start).getTime())[0];

  return { patient, upcomingAppointment, appointments };
}

export default function DashboardPage() {
  const { patient, upcomingAppointment, appointments } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const name = patient.name?.[0]?.given?.[0] || 'there';

  if (navigation.state === 'loading') {
    return (
      <Center h={400}>
        <Loader size="lg" />
      </Center>
    );
  }

  return (
    <>
      <Title order={2}>Welcome back, {name}!</Title>
      <SimpleGrid cols={2} mt="lg">
        <Card withBorder radius="md" padding="xl">
            <Text fz="lg" fw={500}>Next Appointment</Text>
            {upcomingAppointment ? (
                <>
                    <Text>{new Date(upcomingAppointment.start).toLocaleString()}</Text>
                    <Text size="sm">{upcomingAppointment.description}</Text>
                    <Badge mt="xs">{upcomingAppointment.status}</Badge>
                </>
            ) : appointments.length === 0 ? (
                <Text c="dimmed">Unable to load appointments. The FHIR server may be temporarily unavailable.</Text>
            ) : (
                <Text>No upcoming appointments scheduled.</Text>
            )}
        </Card>
      </SimpleGrid>
    </>
  );
}
