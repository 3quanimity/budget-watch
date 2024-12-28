export const calculateTotalMonthlyExpenses = (fixedExpenses, variableExpenses) => {
  const fixedTotal = fixedExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const variableTotal = variableExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  return {
    total: fixedTotal + variableTotal,
    fixedTotal,
    variableTotal
  };
};

export const calculateMonthlyBreakdown = (totalBudget, monthlyExpenses) => {
  const { total, fixedTotal, variableTotal } = monthlyExpenses;
  
  // Calculate percentages of total expenses (not total budget)
  const fixedPercentage = (fixedTotal / total) * 100 || 0;
  const variablePercentage = (variableTotal / total) * 100 || 0;
  
  // Calculate survival metrics
  const monthlySavingsPotential = totalBudget - total;
  const monthsOfSurvival = totalBudget / total || 0;
  const fullMonthsOfSurvival = Math.floor(monthsOfSurvival);
  const remainingBudgetAfterFullMonths = totalBudget - (fullMonthsOfSurvival * total);

  // Financial health indicators
  const recommendedSavings = totalBudget * 0.2; // 20% recommended savings
  const isOverspending = total > totalBudget;
  const isSavingEnough = monthlySavingsPotential >= recommendedSavings;

  return {
    monthlyIncome: totalBudget,
    totalExpenses: total,
    fixedExpenses: fixedTotal,
    variableExpenses: variableTotal,
    monthlySavings: monthlySavingsPotential,
    survival: {
      months: Number(monthsOfSurvival.toFixed(1)),
      fullMonths: fullMonthsOfSurvival,
      remainingBudget: Number(remainingBudgetAfterFullMonths.toFixed(2))
    },
    percentages: {
      fixed: Number(fixedPercentage.toFixed(1)),
      variable: Number(variablePercentage.toFixed(1))
    },
    recommendations: {
      isOverspending,
      isSavingEnough,
      recommendedSavings,
      suggestedCuts: isOverspending ? Number((total - totalBudget).toFixed(2)) : 0,
      additionalSavingsPossible: !isSavingEnough ? Number((recommendedSavings - monthlySavingsPotential).toFixed(2)) : 0
    }
  };
};
