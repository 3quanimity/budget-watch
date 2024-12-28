import { useMemo } from 'react';
import { useBudget } from '../contexts/BudgetContext';
import {
  calculateTotalMonthlyExpenses,
  calculateMonthlyBreakdown,
} from '../utils/calculations';

export const useBudgetCalculations = () => {
  const { budget } = useBudget();
  const { totalBudget, fixedExpenses, variableExpenses } = budget;

  const calculations = useMemo(() => {
    const monthlyExpenses = calculateTotalMonthlyExpenses(fixedExpenses, variableExpenses);
    const breakdown = calculateMonthlyBreakdown(totalBudget, monthlyExpenses);

    return breakdown;
  }, [totalBudget, fixedExpenses, variableExpenses]);

  return calculations;
};
