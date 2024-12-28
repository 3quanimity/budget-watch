import { Paper, Text, Stack, Group } from '@mantine/core';
import { useAppColors } from '../../hooks/useAppColors';
import { AreaChart } from '@mantine/charts';
import { useBudget } from '../../contexts/BudgetContext';
import { useState, useRef } from 'react';
import './BudgetBurndown.css';

export function BudgetBurndown() {
  const { budget, totalFixedExpenses, totalVariableExpenses, calculateSurvivalMonths } = useBudget();
  const { getColor } = useAppColors();
  const [tooltip, setTooltip] = useState(null);
  const chartContainerRef = useRef(null);
  
  const generateBurndownData = () => {
    const survivalMonths = calculateSurvivalMonths();
    const monthsToShow = Math.min(Math.ceil(survivalMonths) + 1, 12); // Show up to 12 months
    const data = [];
    
    const totalBudget = budget?.totalBudget || 0;
    const monthlyBurn = totalFixedExpenses + totalVariableExpenses;
    
    for (let month = 0; month <= monthsToShow; month++) {
      const remainingBudget = Math.max(0, totalBudget - (monthlyBurn * month));
      const fixedExpenseTotal = Math.min(remainingBudget, totalFixedExpenses * month);
      const variableExpenseTotal = Math.min(
        remainingBudget - fixedExpenseTotal,
        totalVariableExpenses * month
      );
      
      data.push({
        month: month === 0 ? 'Start' : `Month ${month}`,
        'Remaining Budget': remainingBudget,
        'Fixed Expenses': fixedExpenseTotal,
        'Variable Expenses': variableExpenseTotal,
      });
    }
    
    return data;
  };

  const chartData = generateBurndownData();
  const series = [
    { name: 'Remaining Budget', color: getColor('success') },
    { name: 'Fixed Expenses', color: getColor('error') },
    { name: 'Variable Expenses', color: getColor('warning') },
  ];

  const CustomLegend = () => (
    <Group gap="xl" justify="center" mt="sm">
      {series.map((item) => (
        <Group key={item.name} gap="xs">
          <div
            style={{
              width: 12,
              height: 12,
              backgroundColor: item.color,
              borderRadius: 2,
            }}
          />
          <Text size="sm" c={getColor('text')}>
            {item.name}
          </Text>
        </Group>
      ))}
    </Group>
  );

  const handleMouseMove = (event, point) => {
    if (!point || !chartContainerRef.current) return;

    const containerRect = chartContainerRef.current.getBoundingClientRect();
    const x = event.nativeEvent.clientX - containerRect.left;
    const y = event.nativeEvent.clientY - containerRect.top;

    const tooltipData = {
      x,
      y,
      month: point.data.month,
      remainingBudget: point.data['Remaining Budget'],
      fixedExpenses: point.data['Fixed Expenses'],
      variableExpenses: point.data['Variable Expenses'],
    };

    setTooltip(tooltipData);
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <Paper p="md" style={{ backgroundColor: getColor('surface') }}>
      <Stack>
        <Text size="lg" fw={500} c={getColor('text')}>Budget Burndown Analysis</Text>
        <Text size="sm" c={getColor('secondary')}>
          Visualization of how your budget will be consumed over time
        </Text>
        
        <div 
          ref={chartContainerRef}
          style={{ 
            height: 400, 
            position: 'relative',
            margin: '20px 0'
          }}
        >
          <AreaChart
            h="100%"
            data={chartData}
            xAxisLabel="Time"
            yAxisLabel="Amount ($)"
            dataKey="month"
            type="stacked"
            series={series}
            connectNulls
            curveType="monotone"
            gridProps={{ strokeDasharray: '3 3' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            valueFormatter={(value) => `$${value.toFixed(2)}`}
          />
          {tooltip && (
            <div
              className="chart-tooltip"
              style={{
                left: `${tooltip.x}px`,
                top: `${tooltip.y}px`,
              }}
            >
              <div style={{ marginBottom: 5, fontWeight: 'bold' }}>{tooltip.month}</div>
              <div style={{ color: getColor('success') }}>
                Remaining: ${tooltip.remainingBudget.toFixed(2)}
              </div>
              <div style={{ color: getColor('error') }}>
                Fixed Expenses: ${tooltip.fixedExpenses.toFixed(2)}
              </div>
              <div style={{ color: getColor('warning') }}>
                Variable Expenses: ${tooltip.variableExpenses.toFixed(2)}
              </div>
              <div style={{ marginTop: 5, borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: 5 }}>
                Total Spent: ${(tooltip.fixedExpenses + tooltip.variableExpenses).toFixed(2)}
              </div>
            </div>
          )}
        </div>
        
        <CustomLegend />
      </Stack>
    </Paper>
  );
}
