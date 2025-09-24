import { useLoaderData, useNavigation } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { Title, Table, Badge, Text, Loader, Center } from "@mantine/core";
import { getPatientConditions } from "~/services/fhir.service";

export async function loader({ params }: LoaderFunctionArgs) {
  const conditions = await getPatientConditions(params.patientId!);
  return { conditions };
}

export default function ConditionsPage() {
  const { conditions } = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  if (navigation.state === 'loading') {
    return (
      <Center h={400}>
        <Loader size="lg" />
      </Center>
    );
  }

  const rows = conditions.map((condition: any) => (
    <Table.Tr key={condition.id}>
      <Table.Td>
        {condition.code?.text || 
         condition.code?.coding?.[0]?.display || 
         'Unknown condition'}
      </Table.Td>
      <Table.Td>
        <Badge color={condition.clinicalStatus?.coding?.[0]?.code === 'active' ? 'red' : 'gray'}>
          {condition.clinicalStatus?.coding?.[0]?.display || condition.clinicalStatus?.coding?.[0]?.code || 'Unknown'}
        </Badge>
      </Table.Td>
      <Table.Td>
        {condition.onsetDateTime ? new Date(condition.onsetDateTime).toLocaleDateString() : 'N/A'}
      </Table.Td>
      <Table.Td>
        {condition.verificationStatus?.coding?.[0]?.display || 'Unknown'}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Title order={2} mb="md">My Conditions</Title>
      {conditions.length > 0 ? (
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Condition</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Onset Date</Table.Th>
              <Table.Th>Verification</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      ) : (
        <Text c="dimmed">Unable to load conditions. The FHIR server may be temporarily unavailable.</Text>
      )}
    </>
  );
}
