import { useLoaderData, useNavigation } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { Title, Table, Badge, Text, Tabs, Paper, Loader, Center } from "@mantine/core";
// @ts-ignore
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { getPatientAppointments, getPatientAppointmentRequests } from "~/services/fhir.service";
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export async function loader({ params }: LoaderFunctionArgs) {
  const [appointments, appointmentRequests] = await Promise.all([
    getPatientAppointments(params.patientId!),
    getPatientAppointmentRequests(params.patientId!)
  ]);
  return { appointments, appointmentRequests };
}

export default function AppointmentsPage() {
  const { appointments, appointmentRequests } = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  if (navigation.state === 'loading') {
    return (
      <Center h={400}>
        <Loader size="lg" />
      </Center>
    );
  }

  // Convert appointments to calendar events
  const calendarEvents = appointments.map((appointment: any) => ({
    id: appointment.id,
    title: appointment.description || 'Appointment',
    start: new Date(appointment.start),
    end: new Date(appointment.end || appointment.start),
    resource: appointment
  }));

  // Appointment requests table rows
  const requestRows = appointmentRequests.map((request: any) => (
    <Table.Tr key={request.id}>
      <Table.Td>{request.start ? new Date(request.start).toLocaleDateString() : 'TBD'}</Table.Td>
      <Table.Td>{request.start ? new Date(request.start).toLocaleTimeString() : 'TBD'}</Table.Td>
      <Table.Td>{request.description || request.reasonCode?.[0]?.text || 'No description'}</Table.Td>
      <Table.Td>
        <Badge color={
          request.status === 'confirmed' ? 'green' : 
          request.status === 'proposed' ? 'blue' : 
          request.status === 'cancelled' ? 'red' : 'yellow'
        }>
          {request.status}
        </Badge>
      </Table.Td>
    </Table.Tr>
  ));

  // Confirmed appointments table rows
  const appointmentRows = appointments.map((appointment: any) => (
    <Table.Tr key={appointment.id}>
      <Table.Td>{new Date(appointment.start).toLocaleDateString()}</Table.Td>
      <Table.Td>{new Date(appointment.start).toLocaleTimeString()}</Table.Td>
      <Table.Td>{appointment.description || 'No description'}</Table.Td>
      <Table.Td>
        <Badge color={appointment.status === 'confirmed' ? 'green' : 'yellow'}>
          {appointment.status}
        </Badge>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Title order={2} mb="md">My Appointments</Title>
      
      <Tabs defaultValue="calendar">
        <Tabs.List>
          <Tabs.Tab value="calendar">Calendar View</Tabs.Tab>
          <Tabs.Tab value="requests">Appointment Requests</Tabs.Tab>
          <Tabs.Tab value="confirmed">Confirmed Appointments</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="calendar" pt="md">
          <Paper withBorder p="md" radius="md">
            <Title order={3} mb="md">Appointment Calendar</Title>
            {appointments.length > 0 ? (
              <div style={{ height: '600px' }}>
                <Calendar
                  localizer={localizer}
                  events={calendarEvents}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: '100%' }}
                  views={['month', 'week', 'day']}
                  defaultView="month"
                />
              </div>
            ) : (
              <Text c="dimmed">No appointments to display in calendar.</Text>
            )}
          </Paper>
        </Tabs.Panel>

        <Tabs.Panel value="requests" pt="md">
          <Paper withBorder p="md" radius="md">
            <Title order={3} mb="md">Appointment Requests</Title>
            {appointmentRequests.length > 0 ? (
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Requested Date</Table.Th>
                    <Table.Th>Requested Time</Table.Th>
                    <Table.Th>Description</Table.Th>
                    <Table.Th>Status</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{requestRows}</Table.Tbody>
              </Table>
            ) : (
              <Text c="dimmed">No appointment requests found.</Text>
            )}
          </Paper>
        </Tabs.Panel>

        <Tabs.Panel value="confirmed" pt="md">
          <Paper withBorder p="md" radius="md">
            <Title order={3} mb="md">Confirmed Appointments</Title>
            {appointments.length > 0 ? (
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Date</Table.Th>
                    <Table.Th>Time</Table.Th>
                    <Table.Th>Description</Table.Th>
                    <Table.Th>Status</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{appointmentRows}</Table.Tbody>
              </Table>
            ) : (
              <Text c="dimmed">No confirmed appointments found.</Text>
            )}
          </Paper>
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
