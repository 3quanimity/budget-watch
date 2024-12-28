import { Paper, Text, Stack, Grid, Progress } from '@mantine/core';
import { useBudget } from '../../contexts/BudgetContext';
import { useAppColors } from '../../hooks/useAppColors';

export function BudgetAnalysis() {
  const { budget, totalFixedExpenses, totalVariableExpenses } = useBudget();
  const { getColor, getColorWithOpacity } = useAppColors();

  const totalBudget = budget?.totalBudget || 0;
  const totalExpenses = totalFixedExpenses + totalVariableExpenses;
  const monthlyBurn = totalExpenses;
  
  // Calculate percentages
  const fixedExpensePercentage = (totalFixedExpenses / monthlyBurn) * 100 || 0;
  const variableExpensePercentage = (totalVariableExpenses / monthlyBurn) * 100 || 0;
  
  // Calculate budget usage with proper handling of edge cases
  const rawBudgetPercentage = totalBudget > 0 ? (totalExpenses / totalBudget) * 100 : 0;
  const budgetUsagePercentage = isFinite(rawBudgetPercentage) ? rawBudgetPercentage : 0;
  const isOverBudget = budgetUsagePercentage > 100;
  const progressValue = isOverBudget ? 100 : budgetUsagePercentage;

  const ExpenseBar = ({ label, value, percentage, color }) => (
    <Stack gap="xs">
      <Grid align="center">
        <Grid.Col span={8}>
          <Text size="sm" fw={500} c={getColor('text')}>
            {label}
          </Text>
        </Grid.Col>
        <Grid.Col span={4} ta="right">
          <Text size="sm" fw={700} c={getColor(color)}>
            ${value.toFixed(2)}
          </Text>
        </Grid.Col>
      </Grid>
      <Progress 
        value={percentage} 
        color={color}
        size="lg"
        radius="xl"
      />
      <Text size="xs" c={getColor('secondary')} ta="right">
        {percentage.toFixed(1)}% of monthly expenses
      </Text>
    </Stack>
  );

  return (
    <Paper p="md" style={{ backgroundColor: getColor('surface') }}>
      <Stack>
        <Text size="lg" fw={500} c={getColor('text')}>Budget Analysis</Text>
        <Text size="sm" c={getColor('secondary')}>
          Breakdown of your monthly expenses
        </Text>

        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="md">
              <Text fw={500} size="sm" c={getColor('text')}>Monthly Burn Rate</Text>
              <Paper p="md" style={{ backgroundColor: getColorWithOpacity('primary', 0.1) }}>
                <Stack gap="xs" align="center">
                  <Text size="sm" c={getColor('secondary')}>Total Monthly Expenses</Text>
                  <Text size="xl" fw={700} c={getColor(isOverBudget ? 'error' : 'primary')}>
                    ${monthlyBurn.toFixed(2)}
                  </Text>
                  <Progress 
                    value={progressValue}
                    color={isOverBudget ? 'error' : 'primary'}
                    size="xl"
                    radius="xl"
                    style={{ width: '100%' }}
                  />
                  <Text size="xs" c={getColor('secondary')}>
                    {budgetUsagePercentage.toFixed(1)}% of total budget
                  </Text>
                </Stack>
              </Paper>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 8 }}>
            <Stack gap="md">
              <Text fw={500} size="sm" c={getColor('text')}>Expense Distribution</Text>
              <ExpenseBar 
                label="Fixed Expenses"
                value={totalFixedExpenses}
                percentage={fixedExpensePercentage}
                color="error"
              />
              <ExpenseBar 
                label="Variable Expenses"
                value={totalVariableExpenses}
                percentage={variableExpensePercentage}
                color="warning"
              />
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Paper>
  );
}
