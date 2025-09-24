import { useLoaderData, useNavigation } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { Title, Table, Badge, Text, Loader, Center } from "@mantine/core";
import { getPatientMedications } from "~/services/fhir.service";

export async function loader({ params }: LoaderFunctionArgs) {
  const medications = await getPatientMedications(params.patientId!);
  return { medications };
}

export default function MedicationsPage() {
  const { medications } = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  if (navigation.state === 'loading') {
    return (
      <Center h={400}>
        <Loader size="lg" />
      </Center>
    );
  }

  const rows = medications.map((medication: any) => (
    <Table.Tr key={medication.id}>
      <Table.Td>
        {medication.medicationCodeableConcept?.text || 
         medication.medicationReference?.display || 
         'Unknown medication'}
      </Table.Td>
      <Table.Td>
        {medication.dosageInstruction?.[0]?.text || 'No dosage specified'}
      </Table.Td>
      <Table.Td>
        <Badge color={medication.status === 'active' ? 'green' : 'yellow'}>
          {medication.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        {medication.authoredOn ? new Date(medication.authoredOn).toLocaleDateString() : 'N/A'}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Title order={2} mb="md">My Medications</Title>
      {medications.length > 0 ? (
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Medication</Table.Th>
              <Table.Th>Dosage</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Prescribed</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      ) : (
        <Text c="dimmed">Unable to load medications. The FHIR server may be temporarily unavailable.</Text>
      )}
    </>
  );
}
