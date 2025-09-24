import { Form, useNavigate, useNavigation } from "react-router";
import { TextInput, Button, Title, Paper, Text, Loader } from '@mantine/core';
import { useForm } from '@mantine/form';
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Patient Portal - Login" },
    { name: "description", content: "FHIR Patient Portal Login" },
  ];
}

export default function LoginPage() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const form = useForm({
    initialValues: { patientId: '1280381' }, // A default patient ID for easy testing
  });

  const handleSubmit = (values: { patientId: string }) => {
    if (values.patientId) {
      // In a real app, you'd set a cookie or token. Here we just navigate.
      navigate(`/portal/${values.patientId}/dashboard`);
    }
  };

  return (
    <Paper withBorder shadow="md" p={30} mt={100} radius="md" style={{ maxWidth: 420, margin: 'auto' }}>
      <Title ta="center">Patient Portal</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Enter a Patient ID to continue
      </Text>
      <Form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Patient ID"
          placeholder="e.g., 1280381"
          required
          mt="md"
          {...form.getInputProps('patientId')}
        />
        <Button 
          fullWidth 
          mt="xl" 
          type="submit" 
          loading={navigation.state === 'loading'}
          disabled={navigation.state === 'loading'}
        >
          {navigation.state === 'loading' ? 'Logging in...' : 'Login'}
        </Button>
      </Form>
    </Paper>
  );
}
