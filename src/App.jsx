import '@mantine/core/styles.css';
import { MantineProvider, AppShell, Container, Stack, Text, Group } from '@mantine/core';
import { TotalBudget } from './components/Budget/TotalBudget';
import { BudgetBurndown } from './components/Budget/BudgetBurndown';
import { BudgetAnalysis } from './components/Budget/BudgetAnalysis';
import { ExpensesList } from './components/Expenses/ExpensesList';
import { BudgetProvider } from './contexts/BudgetContext';
import { createThemeConfig } from './theme/colors';
import { IconWallet } from '@tabler/icons-react';

export default function App() {
  return (
    <MantineProvider theme={createThemeConfig()}>
      <BudgetProvider>
        <AppShell
          padding="md"
          header={
            <Container size="lg" h="100%" style={{ height: 60 }}>
              <Group h="100%" px="md">
                <Group gap="xs">
                  <IconWallet size={24} />
                  <Text size="lg" fw={500}>BudgetWatch</Text>
                </Group>
              </Group>
            </Container>
          }
        >
          <Container size="lg" py="xl">
            <Stack gap="xl">
              <TotalBudget />
              <BudgetAnalysis />
              <BudgetBurndown />
              <ExpensesList />
            </Stack>
          </Container>
        </AppShell>
      </BudgetProvider>
    </MantineProvider>
  );
}
