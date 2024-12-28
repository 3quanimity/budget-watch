import { Paper, Text, Stack, Group } from '@mantine/core';
import { useBudget } from '../../contexts/BudgetContext';
import { useAppColors } from '../../hooks/useAppColors';

export function BudgetProjections() {
  const { budget, totalFixedExpenses, totalVariableExpenses } = useBudget();
  const { getColor, getColorWithOpacity } = useAppColors();

  const monthlyIncome = budget.monthlyIncome || 0;
  const monthlyExpenses = totalFixedExpenses + totalVariableExpenses;
  const monthlySavings = monthlyIncome - monthlyExpenses;

  // Calculate survival months (assuming no income)
  const currentSavings = monthlySavings * 3; // Example: 3 months of savings
  const survivalMonths = monthlyExpenses > 0 
    ? Math.floor(currentSavings / monthlyExpenses)
    : 0;

  // Create the expense visualization
  const maxBarWidth = 85; // percentage - reduced to leave room for labels
  const incomeBarWidth = monthlyIncome > 0 ? maxBarWidth : 0;
  const fixedExpenseWidth = monthlyIncome > 0 
    ? (totalFixedExpenses / monthlyIncome) * maxBarWidth 
    : 0;
  const variableExpenseWidth = monthlyIncome > 0 
    ? (totalVariableExpenses / monthlyIncome) * maxBarWidth 
    : 0;
  const savingsWidth = monthlySavings > 0 
    ? (monthlySavings / monthlyIncome) * maxBarWidth 
    : 0;

  const barStyle = (width, color) => ({
    height: '24px',
    width: `${width}%`,
    backgroundColor: getColorWithOpacity(color, 0.15),
    borderRadius: '4px',
    position: 'relative',
    border: `1px solid ${getColorWithOpacity(color, 0.3)}`,
  });

  const BarWithLabel = ({ label, value, width, color }) => (
    <Stack gap="xs">
      <Group justify="space-between" wrap="nowrap">
        <Text size="sm" fw={500} c={getColor('text')}>{label}</Text>
        <Text size="sm" c={getColor('text')}>${value.toFixed(2)}</Text>
      </Group>
      <div style={barStyle(width, color)} />
    </Stack>
  );

  return (
    <Paper p="md" style={{ backgroundColor: getColor('surface') }}>
      <Stack gap="md">
        <Text size="xl" fw={500} c={getColor('text')}>Budget Analysis</Text>

        <BarWithLabel 
          label="Monthly Income"
          value={monthlyIncome}
          width={incomeBarWidth}
          color="success"
        />

        <BarWithLabel 
          label="Fixed Expenses"
          value={totalFixedExpenses}
          width={fixedExpenseWidth}
          color="primary"
        />

        <BarWithLabel 
          label="Variable Expenses"
          value={totalVariableExpenses}
          width={variableExpenseWidth}
          color="interactive"
        />

        <BarWithLabel 
          label="Monthly Savings"
          value={monthlySavings}
          width={savingsWidth}
          color={monthlySavings >= 0 ? 'success' : 'error'}
        />

        {/* Financial Health Indicator */}
        <Stack gap={4} mt="md">
          <Text size="sm" fw={500} c={getColor('text')}>Financial Health</Text>
          <Text size="sm" c={getColor('secondary')}>
            {survivalMonths > 6 
              ? 'Excellent! You have a healthy emergency fund.'
              : survivalMonths > 3
              ? 'Good. Consider building your emergency fund further.'
              : survivalMonths > 0
              ? 'Warning: Your emergency fund is low.'
              : 'Critical: Start building an emergency fund.'
            }
          </Text>
          <Text size="xs" c={getColor('secondary')}>
            Emergency Fund: {survivalMonths} months of expenses covered
          </Text>
        </Stack>
      </Stack>
    </Paper>
  );
}
