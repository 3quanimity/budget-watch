import { Modal, TextInput, Button, Stack } from '@mantine/core';
import { useState } from 'react';
import { useBudget } from '../../contexts/BudgetContext';

export function IncomeModal({ opened, onClose }) {
  const { budget, updateMonthlyIncome } = useBudget();
  const [income, setIncome] = useState(budget.monthlyIncome?.toString() || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMonthlyIncome(income);
    onClose();
  };

  return (
    <Modal 
      opened={opened} 
      onClose={onClose}
      title="Edit Monthly Income"
      size="sm"
    >
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            label="Monthly Income"
            placeholder="Enter your monthly income"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            type="number"
            min={0}
            step="0.01"
            required
          />
          <Button type="submit" fullWidth>
            Save Changes
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
