import {
  ActionIcon,
  Badge,
  Button,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
} from '@mantine/core';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useBudget } from '../../contexts/BudgetContext';
import { useAppColors } from '../../hooks/useAppColors';
import { ExpenseModal } from './ExpenseModal';

export function ExpensesList() {
  const { expenses, removeExpense } = useBudget();
  const { getColor, getCategoryColor } = useAppColors();
  const [modalOpen, setModalOpen] = useState(false);
  const [expenseType, setExpenseType] = useState('fixed');
  const [editExpense, setEditExpense] = useState(null);

  const handleAddExpense = type => {
    setExpenseType(type);
    setEditExpense(null);
    setModalOpen(true);
  };

  const handleEditExpense = (expense, type) => {
    setExpenseType(type);
    setEditExpense(expense);
    setModalOpen(true);
  };

  const handleRemoveExpense = (expenseId, type) => {
    removeExpense(expenseId, type);
  };

  const renderExpenseList = (expensesList, type) => (
    <Stack gap="sm">
      {expensesList.map(expense => (
        <Paper
          key={expense.id}
          shadow="xs"
          p="sm"
          withBorder
          style={{
            backgroundColor: getColor('surface'),
            borderColor: getColor('border'),
          }}
        >
          <Group justify="space-between" wrap="nowrap">
            <Stack gap={4}>
              <Group gap="xs">
                <Text size="sm" fw={500}>
                  {expense.name}
                </Text>
                <Badge
                  size="sm"
                  variant="filled"
                  style={{
                    backgroundColor: getCategoryColor(expense.category, 0.8),
                    color: getColor('surface'),
                  }}
                >
                  {expense.category}
                </Badge>
              </Group>
              <Text size="xs" c="dimmed">
                ${expense.amount?.toFixed(2) || '0.00'} / month
              </Text>
            </Stack>
            <Group gap="xs">
              <ActionIcon
                variant="subtle"
                color="blue"
                onClick={() => handleEditExpense(expense, type)}
              >
                <IconEdit size={16} />
              </ActionIcon>
              <ActionIcon
                variant="subtle"
                color="red"
                onClick={() => handleRemoveExpense(expense.id, type)}
              >
                <IconTrash size={16} />
              </ActionIcon>
            </Group>
          </Group>
        </Paper>
      ))}
      {expensesList.length === 0 && (
        <Text size="sm" c="dimmed" ta="center" py="xl">
          No {type.toLowerCase()} expenses added yet
        </Text>
      )}
    </Stack>
  );

  return (
    <>
      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Paper
            p="md"
            style={{ backgroundColor: getCategoryColor('primary', 0.05) }}
          >
            <Stack gap="md">
              <Group justify="space-between">
                <Stack gap={4}>
                  <Text size="xl" fw={500}>
                    Fixed Expenses
                  </Text>
                  <Text size="sm" c="dimmed">
                    Regular monthly payments
                  </Text>
                </Stack>
                <Button
                  leftSection={<IconPlus size={16} />}
                  variant="light"
                  onClick={() => handleAddExpense('fixed')}
                >
                  Add Fixed
                </Button>
              </Group>
              {renderExpenseList(expenses.fixed || [], 'fixed')}
            </Stack>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Paper
            p="md"
            style={{ backgroundColor: getCategoryColor('interactive', 0.05) }}
          >
            <Stack gap="md">
              <Group justify="space-between">
                <Stack gap={4}>
                  <Text size="xl" fw={500}>
                    Variable Expenses
                  </Text>
                  <Text size="sm" c="dimmed">
                    Fluctuating monthly costs
                  </Text>
                </Stack>
                <Button
                  leftSection={<IconPlus size={16} />}
                  variant="light"
                  onClick={() => handleAddExpense('variable')}
                >
                  Add Variable
                </Button>
              </Group>
              {renderExpenseList(expenses.variable || [], 'variable')}
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>

      <ExpenseModal
        opened={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditExpense(null);
        }}
        editExpense={editExpense}
        expenseType={expenseType}
      />
    </>
  );
}
