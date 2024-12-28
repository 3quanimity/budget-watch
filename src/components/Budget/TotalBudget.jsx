import { Paper, Text, Group, Stack, Grid } from '@mantine/core';
import { useState } from 'react';
import { useBudget } from '../../contexts/BudgetContext';
import { useAppColors } from '../../hooks/useAppColors';
import { AccountModal } from './AccountModal';
import { AccountsList } from './AccountsList';

export function TotalBudget() {
  const { 
    budget, 
    totalFixedExpenses, 
    totalVariableExpenses, 
    addAccount, 
    updateAccount, 
    deleteAccount,
    calculateSurvivalMonths 
  } = useBudget();
  const { getColor, getColorWithOpacity } = useAppColors();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);

  const totalExpenses = totalFixedExpenses + totalVariableExpenses;
  const remainingBudget = budget.totalBudget - totalExpenses;
  const survivalMonths = calculateSurvivalMonths();

  const handleAddAccount = (accountData) => {
    try {
      addAccount(accountData);
    } catch (error) {
      console.error('Error adding account:', error);
      alert('Failed to add account. Please try again.');
    }
  };

  const handleEditAccount = (accountData) => {
    try {
      updateAccount(editingAccount.id, accountData);
      setEditingAccount(null);
    } catch (error) {
      console.error('Error updating account:', error);
      alert('Failed to update account. Please try again.');
    }
  };

  const handleDeleteAccount = (accountId) => {
    try {
      deleteAccount(accountId);
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Failed to delete account. Please try again.');
    }
  };

  const formatSurvivalTime = (months) => {
    if (months === Infinity) return 'N/A (no expenses)';
    if (months === 0) return '0 months';
    
    const fullMonths = Math.floor(months);
    const remainingDays = Math.round((months - fullMonths) * 30);
    
    if (fullMonths === 0) {
      return `${remainingDays} days`;
    } else if (remainingDays === 0) {
      return `${fullMonths} month${fullMonths !== 1 ? 's' : ''}`;
    } else {
      return `${fullMonths} month${fullMonths !== 1 ? 's' : ''} and ${remainingDays} days`;
    }
  };

  const StatCard = ({ title, value, color = 'text', size = 'xl', subtitle = null }) => (
    <Paper p="md" h="100%" style={{ backgroundColor: getColor('surface') }}>
      <Stack gap={4} align="center" justify="center" h="100%">
        <Text size="sm" c={getColor('secondary')}>{title}</Text>
        <Text size={size} fw={700} c={getColor(color)} style={{ lineHeight: 1.2 }}>
          {value}
        </Text>
        {subtitle && (
          <Text size="xs" c={getColor('secondary')} ta="center">
            {subtitle}
          </Text>
        )}
      </Stack>
    </Paper>
  );

  return (
    <Paper p="md" style={{ backgroundColor: getColorWithOpacity('primary', 0.05) }}>
      <Stack gap="md">
        <Group position="apart" align="center">
          <Stack gap={0}>
            <Text size="xl" fw={500} c={getColor('text')}>Total Budget</Text>
            <Text size="sm" c={getColor('secondary')}>Overview of your financial runway</Text>
          </Stack>
          {budget.lastUpdated && (
            <Text size="xs" c={getColor('secondary')}>
              Last updated: {new Date(budget.lastUpdated).toLocaleString()}
            </Text>
          )}
        </Group>

        <Grid>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Total Budget"
              value={`$${budget.totalBudget.toFixed(2)}`}
              color="primary"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Monthly Expenses"
              value={`$${totalExpenses.toFixed(2)}`}
              color="error"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Remaining Budget"
              value={`$${remainingBudget.toFixed(2)}`}
              color={remainingBudget >= 0 ? 'success' : 'error'}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Financial Runway"
              value={formatSurvivalTime(survivalMonths)}
              color={survivalMonths > 6 ? 'success' : survivalMonths > 3 ? 'warning' : 'error'}
              size="lg"
              subtitle={`Based on monthly expenses of $${totalExpenses.toFixed(2)}`}
            />
          </Grid.Col>
        </Grid>

        <AccountsList
          accounts={budget.accounts}
          onEditAccount={(account) => {
            setEditingAccount(account);
            setIsModalOpen(true);
          }}
          onDeleteAccount={handleDeleteAccount}
          onAddAccount={() => {
            setEditingAccount(null);
            setIsModalOpen(true);
          }}
        />

        <AccountModal
          opened={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingAccount(null);
          }}
          onSubmit={editingAccount ? handleEditAccount : handleAddAccount}
          initialValues={editingAccount}
        />
      </Stack>
    </Paper>
  );
}
