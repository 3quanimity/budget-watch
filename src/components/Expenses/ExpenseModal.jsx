import { Modal, TextInput, Select, Button, Group, Stack } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useBudget } from '../../contexts/BudgetContext';

const EXPENSE_CATEGORIES = [
  { value: 'housing', label: 'Housing' },
  { value: 'utilities', label: 'Utilities' },
  { value: 'food', label: 'Food & Groceries' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'other', label: 'Other' }
];

const DEFAULT_EXPENSE = {
  name: '',
  amount: '',
  category: 'other'
};

export function ExpenseModal({ opened, onClose, editExpense, expenseType }) {
  const { addExpense, updateExpense } = useBudget();
  const [expense, setExpense] = useState(DEFAULT_EXPENSE);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editExpense) {
      setExpense({
        name: editExpense.name,
        amount: editExpense.amount.toString(),
        category: editExpense.category
      });
    } else {
      setExpense(DEFAULT_EXPENSE);
    }
  }, [editExpense, opened]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validate inputs
    if (!expense.name.trim()) {
      setError('Please enter an expense name');
      return;
    }

    const amount = parseFloat(expense.amount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    const newExpense = {
      id: editExpense?.id || Date.now().toString(),
      name: expense.name.trim(),
      amount: amount,
      category: expense.category
    };

    if (editExpense) {
      updateExpense(newExpense, expenseType);
    } else {
      addExpense(newExpense, expenseType);
    }

    handleClose();
  };

  const handleClose = () => {
    setExpense(DEFAULT_EXPENSE);
    setError('');
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={`${editExpense ? 'Edit' : 'Add'} ${expenseType === 'fixed' ? 'Fixed' : 'Variable'} Expense`}
      size="md"
    >
      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <TextInput
            label="Expense Name"
            placeholder="Enter expense name"
            value={expense.name}
            onChange={(e) => setExpense({ ...expense, name: e.target.value })}
            error={error && !expense.name.trim() ? error : null}
            data-autofocus
          />

          <TextInput
            label="Amount"
            placeholder="Enter amount"
            value={expense.amount}
            onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
            error={error && (!expense.amount || isNaN(parseFloat(expense.amount))) ? error : null}
            type="number"
            min="0"
            step="0.01"
          />

          <Select
            label="Category"
            placeholder="Select a category"
            data={EXPENSE_CATEGORIES}
            value={expense.category}
            onChange={(value) => setExpense({ ...expense, category: value })}
          />

          <Group justify="flex-end" mt="md">
            <Button variant="light" onClick={handleClose}>Cancel</Button>
            <Button type="submit">{editExpense ? 'Update' : 'Add'} Expense</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
