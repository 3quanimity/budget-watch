import { PieChart } from '@mantine/charts';
import { Box, Group, Paper, Progress, Stack, Text } from '@mantine/core';
import { useBudget } from '../../contexts/BudgetContext';
import { useAppColors } from '../../hooks/useAppColors';

const CATEGORY_COLORS = [
  '#228BE6', // Blue
  '#15AABF', // Cyan
  '#12B886', // Teal
  '#40C057', // Green
  '#7950F2', // Violet
  '#FA5252', // Red
  '#E64980', // Pink
  '#868E96', // Gray
];

export function BudgetAnalysis() {
  const { budget, expenses } = useBudget();
  const { getColor, getColorWithOpacity } = useAppColors();

  const totalBudget = budget?.totalBudget || 0;
  const allExpenses = [...expenses.fixed, ...expenses.variable];
  const totalExpenses = allExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  // Calculate fixed and variable totals
  const totalFixed = expenses.fixed.reduce((sum, exp) => sum + exp.amount, 0);
  const totalVariable = expenses.variable.reduce(
    (sum, exp) => sum + exp.amount,
    0
  );
  const fixedPercentage = (totalFixed / totalExpenses) * 100 || 0;
  const variablePercentage = (totalVariable / totalExpenses) * 100 || 0;

  // Calculate budget usage
  const budgetUsagePercentage =
    totalBudget > 0 ? (totalExpenses / totalBudget) * 100 : 0;
  const isOverBudget = budgetUsagePercentage > 100;

  // Group expenses by category for pie chart
  const expensesByCategory = allExpenses.reduce((acc, expense) => {
    const category = expense.category || 'Other';
    acc[category] = (acc[category] || 0) + expense.amount;
    return acc;
  }, {});

  // Prepare data for pie chart
  const chartData = Object.entries(expensesByCategory)
    .map(([category, amount], index) => ({
      name: category,
      value: amount,
      color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <Paper
      p="md"
      style={{ backgroundColor: getColorWithOpacity('primary', 0.05) }}
    >
      <Stack spacing="lg">
        <Text size="xl" fw={700} c={getColor('text')}>
          Budget Analysis
        </Text>

        <Box>
          <Group
            grow
            align="stretch"
            spacing="md"
            w="100%"
            breakpoints={[
              { maxWidth: 'md', cols: 1, spacing: 'md' },
              { maxWidth: 'lg', cols: 2, spacing: 'lg' },
            ]}
          >
            {/* Left Column: Pie Chart */}
            <Paper p="md" radius="md" withBorder>
              <Stack align="center" spacing="xs" h="100%">
                <Text size="lg" fw={600} c={getColor('text')}>
                  Expense Distribution
                </Text>
                {totalExpenses > 0 ? (
                  <Box
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      justifyContent: 'center',
                    }}
                  >
                    <PieChart
                      data={chartData}
                      withLabels
                      withTooltip
                      tooltipDataSource="segment"
                      size={250}
                      valueFormatter={value => `$${value.toFixed(2)}`}
                      colors={chartData.map(item => item.color)}
                    />
                  </Box>
                ) : (
                  <Box
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text c="dimmed" size="sm">
                      No expenses recorded yet
                    </Text>
                  </Box>
                )}
              </Stack>
            </Paper>

            {/* Right Column: Fixed vs Variable and Budget Usage */}
            <Stack spacing="md">
              {/* Fixed vs Variable */}
              <Paper p="md" radius="md" withBorder>
                <Stack spacing="md">
                  <Text size="lg" fw={600} c={getColor('text')}>
                    Fixed vs Variable
                  </Text>

                  {/* Fixed Expenses */}
                  <Stack spacing="xs">
                    <Group position="apart">
                      <Group spacing="xs">
                        <div
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            backgroundColor: '#228BE6',
                          }}
                        />
                        <Text size="sm">Fixed Expenses</Text>
                      </Group>
                      <Text size="sm" fw={500}>
                        ${totalFixed.toFixed(2)}
                      </Text>
                    </Group>
                    <Progress
                      value={fixedPercentage}
                      color="#228BE6"
                      size="xl"
                      radius="xl"
                    />
                    <Text size="xs" c="dimmed" align="right">
                      {fixedPercentage.toFixed(1)}% of total
                    </Text>
                  </Stack>

                  {/* Variable Expenses */}
                  <Stack spacing="xs">
                    <Group position="apart">
                      <Group spacing="xs">
                        <div
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            backgroundColor: '#7950F2',
                          }}
                        />
                        <Text size="sm">Variable Expenses</Text>
                      </Group>
                      <Text size="sm" fw={500}>
                        ${totalVariable.toFixed(2)}
                      </Text>
                    </Group>
                    <Progress
                      value={variablePercentage}
                      color="#7950F2"
                      size="xl"
                      radius="xl"
                    />
                    <Text size="xs" c="dimmed" align="right">
                      {variablePercentage.toFixed(1)}% of total
                    </Text>
                  </Stack>
                </Stack>
              </Paper>

              {/* Budget Usage */}
              <Paper p="md" radius="md" withBorder style={{ flex: 1 }}>
                <Stack spacing="xs">
                  <Text size="lg" fw={600} c={getColor('text')}>
                    Overall Budget Usage
                  </Text>
                  <Progress
                    value={Math.min(budgetUsagePercentage, 100)}
                    color={isOverBudget ? 'red' : 'teal'}
                    size="xl"
                    radius="xl"
                    striped
                    animated={isOverBudget}
                  />
                  <Group position="apart">
                    <Text size="sm">
                      Total Expenses: ${totalExpenses.toFixed(2)}
                    </Text>
                    <Text size="sm" c={isOverBudget ? 'red' : 'teal'} fw={500}>
                      {budgetUsagePercentage.toFixed(1)}% of budget
                      {isOverBudget && ' (Over Budget!)'}
                    </Text>
                  </Group>

                  {/* Additional Budget Info */}
                  <Group position="apart" mt="xs">
                    <Text size="sm">Budget Limit:</Text>
                    <Text size="sm" fw={500}>
                      ${totalBudget.toFixed(2)}
                    </Text>
                  </Group>
                  <Group position="apart">
                    <Text size="sm">Remaining:</Text>
                    <Text size="sm" fw={500} c={isOverBudget ? 'red' : 'teal'}>
                      ${(totalBudget - totalExpenses).toFixed(2)}
                    </Text>
                  </Group>
                </Stack>
              </Paper>
            </Stack>
          </Group>
        </Box>
      </Stack>
    </Paper>
  );
}
