import { createContext, useContext, useState, useEffect } from 'react';

const BudgetContext = createContext();

const DEFAULT_BUDGET = {
  totalBudget: 0,
  accounts: [],
  lastUpdated: new Date().toISOString()
};

const DEFAULT_EXPENSES = {
  fixed: [],
  variable: []
};

export function BudgetProvider({ children }) {
  const [budget, setBudget] = useState(() => {
    try {
      const savedBudget = localStorage.getItem('budget');
      if (!savedBudget) return DEFAULT_BUDGET;
      
      const parsedBudget = JSON.parse(savedBudget);
      return {
        ...DEFAULT_BUDGET,
        ...parsedBudget,
        accounts: Array.isArray(parsedBudget.accounts) ? parsedBudget.accounts : [],
      };
    } catch (error) {
      console.error('Error loading budget from localStorage:', error);
      return DEFAULT_BUDGET;
    }
  });

  const [expenses, setExpenses] = useState(() => {
    try {
      const savedExpenses = localStorage.getItem('expenses');
      if (!savedExpenses) return DEFAULT_EXPENSES;
      
      const parsedExpenses = JSON.parse(savedExpenses);
      return {
        fixed: Array.isArray(parsedExpenses.fixed) ? parsedExpenses.fixed : [],
        variable: Array.isArray(parsedExpenses.variable) ? parsedExpenses.variable : []
      };
    } catch (error) {
      console.error('Error loading expenses from localStorage:', error);
      return DEFAULT_EXPENSES;
    }
  });

  // Save budget and expenses to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('budget', JSON.stringify(budget));
    } catch (error) {
      console.error('Error saving budget to localStorage:', error);
    }
  }, [budget]);

  useEffect(() => {
    try {
      localStorage.setItem('expenses', JSON.stringify(expenses));
    } catch (error) {
      console.error('Error saving expenses to localStorage:', error);
    }
  }, [expenses]);

  // Expense management functions
  const addExpense = (expense, type) => {
    setExpenses(prev => ({
      ...prev,
      [type]: [...prev[type], {
        ...expense,
        amount: parseFloat(expense.amount) || 0
      }]
    }));
  };

  const updateExpense = (updatedExpense, type) => {
    setExpenses(prev => ({
      ...prev,
      [type]: prev[type].map(expense => 
        expense.id === updatedExpense.id 
          ? { ...updatedExpense, amount: parseFloat(updatedExpense.amount) || 0 }
          : expense
      )
    }));
  };

  const removeExpense = (expenseId, type) => {
    setExpenses(prev => ({
      ...prev,
      [type]: prev[type].filter(expense => expense.id !== expenseId)
    }));
  };

  // Account management functions
  const addAccount = (accountData) => {
    setBudget(prev => {
      const currentAccounts = Array.isArray(prev.accounts) ? prev.accounts : [];
      const newAccount = {
        ...accountData,
        id: Date.now().toString(),
        balance: parseFloat(accountData.balance) || 0
      };
      
      const updatedAccounts = [...currentAccounts, newAccount];
      const newTotalBudget = updatedAccounts.reduce((sum, acc) => sum + (parseFloat(acc.balance) || 0), 0);

      return {
        ...prev,
        accounts: updatedAccounts,
        totalBudget: newTotalBudget,
        lastUpdated: new Date().toISOString()
      };
    });
  };

  const updateAccount = (accountId, accountData) => {
    setBudget(prev => {
      const currentAccounts = Array.isArray(prev.accounts) ? prev.accounts : [];
      const updatedAccounts = currentAccounts.map(acc => 
        acc.id === accountId 
          ? { ...acc, ...accountData, balance: parseFloat(accountData.balance) || 0 }
          : acc
      );
      
      return {
        ...prev,
        accounts: updatedAccounts,
        totalBudget: updatedAccounts.reduce((sum, acc) => sum + (parseFloat(acc.balance) || 0), 0),
        lastUpdated: new Date().toISOString()
      };
    });
  };

  const deleteAccount = (accountId) => {
    setBudget(prev => {
      const currentAccounts = Array.isArray(prev.accounts) ? prev.accounts : [];
      const remainingAccounts = currentAccounts.filter(acc => acc.id !== accountId);
      return {
        ...prev,
        accounts: remainingAccounts,
        totalBudget: remainingAccounts.reduce((sum, acc) => sum + (parseFloat(acc.balance) || 0), 0),
        lastUpdated: new Date().toISOString()
      };
    });
  };

  // Calculate total fixed and variable expenses
  const totalFixedExpenses = expenses.fixed
    .reduce((sum, expense) => sum + (parseFloat(expense.amount) || 0), 0);

  const totalVariableExpenses = expenses.variable
    .reduce((sum, expense) => sum + (parseFloat(expense.amount) || 0), 0);

  const calculateSurvivalMonths = () => {
    const monthlyExpenses = totalFixedExpenses + totalVariableExpenses;
    if (monthlyExpenses === 0) return Infinity;
    return budget.totalBudget / monthlyExpenses;
  };

  const value = {
    budget,
    expenses,
    totalFixedExpenses,
    totalVariableExpenses,
    addAccount,
    updateAccount,
    deleteAccount,
    addExpense,
    updateExpense,
    removeExpense,
    calculateSurvivalMonths,
  };

  return (
    <BudgetContext.Provider value={value}>
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
}
