import { AppShell, Burger, Group, NavLink, Title, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link, Outlet, useParams, useNavigate } from 'react-router';
import { IconLayoutDashboard, IconUser, IconCalendar, IconPill, IconMedicalCross } from '@tabler/icons-react';

export function PortalLayout() {
  const [opened, { toggle }] = useDisclosure();
  const { patientId } = useParams();
  const navigate = useNavigate();

  const navLinks = [
    { href: `/portal/${patientId}/dashboard`, label: 'Dashboard', icon: <IconLayoutDashboard size="1rem" stroke={1.5} /> },
    { href: `/portal/${patientId}/profile`, label: 'My Profile', icon: <IconUser size="1rem" stroke={1.5} /> },
    { href: `/portal/${patientId}/appointments`, label: 'Appointments', icon: <IconCalendar size="1rem" stroke={1.5} /> },
    { href: `/portal/${patientId}/medications`, label: 'Medications', icon: <IconPill size="1rem" stroke={1.5} /> },
    { href: `/portal/${patientId}/conditions`, label: 'Conditions', icon: <IconMedicalCross size="1rem" stroke={1.5} /> },
  ];

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
             <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
             <Title order={3}>My Health Portal</Title>
          </Group>
          <Button variant="light" onClick={() => navigate('/')}>Logout</Button>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        {navLinks.map((link) => (
           <NavLink
              key={link.label}
              component={Link}
              to={link.href}
              label={link.label}
              leftSection={link.icon}
            />
        ))}
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
