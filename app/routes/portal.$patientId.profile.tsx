import { useLoaderData, useNavigation } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { Title, Text, Paper, Stack, Loader, Center } from "@mantine/core";
import { getPatientById, getPatientSummary } from "~/services/fhir.service";

export async function loader({ params }: LoaderFunctionArgs) {
  const [patient, summary] = await Promise.all([
    getPatientById(params.patientId!),
    getPatientSummary(params.patientId!)
  ]);
  
  if (!patient) throw new Response("Patient Not Found", { status: 404 });
  return { patient, summary };
}

export default function ProfilePage() {
  const { patient, summary } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const name = `${patient.name?.[0]?.given?.join(' ')} ${patient.name?.[0]?.family}`;
  
  if (navigation.state === 'loading') {
    return (
      <Center h={400}>
        <Loader size="lg" />
      </Center>
    );
  }
  
  return (
     <>
      <Title order={2} mb="md">My Profile</Title>
      <Stack gap="md">
        <Paper withBorder p="lg" radius="md">
          <Title order={3} mb="sm">Demographics</Title>
          <Text><strong>Name:</strong> {name}</Text>
          <Text><strong>Gender:</strong> {patient.gender}</Text>
          <Text><strong>Date of Birth:</strong> {patient.birthDate}</Text>
          <Text><strong>Contact:</strong> {patient.telecom?.find((t: any) => t.system === 'phone')?.value}</Text>
          <Text><strong>Address:</strong> {`${patient.address?.[0]?.line?.[0]}, ${patient.address?.[0]?.city}`}</Text>
        </Paper>
        
        <Paper withBorder p="lg" radius="md">
          <Title order={3} mb="sm">Patient Summary</Title>
          {summary ? (
            <div>
              {(() => {
                // Extract the Composition resource from the Bundle
                const composition = summary.entry?.find((entry: any) => 
                  entry.resource?.resourceType === 'Composition'
                )?.resource;
                
                if (composition?.text?.div) {
                  return (
                    <div>
                      {composition.title && (
                        <Text fw={500} mb="md" size="lg">{composition.title}</Text>
                      )}
                      <div dangerouslySetInnerHTML={{ __html: composition.text.div }} />
                      
                      {/* Display all sections from the Composition */}
                      {composition.section?.map((section: any, index: number) => (
                        <div key={index} style={{ marginTop: '1.5rem' }}>
                          {section.title && (
                            <Title order={4} mb="sm">{section.title}</Title>
                          )}
                          {section.text?.div && (
                            <div dangerouslySetInnerHTML={{ __html: section.text.div }} />
                          )}
                        </div>
                      ))}
                    </div>
                  );
                } else if (composition?.title) {
                  return (
                    <div>
                      <Text fw={500} mb="sm">{composition.title}</Text>
                      <Text c="dimmed">Summary document available but no detailed text provided.</Text>
                    </div>
                  );
                } else {
                  return <Text c="dimmed">No summary text available.</Text>;
                }
              })()}
            </div>
          ) : (
            <Text c="dimmed">Unable to load patient summary. The FHIR server may be temporarily unavailable.</Text>
          )}
        </Paper>
      </Stack>
     </>
  );
}
