# BudgetWatch 💰

A sophisticated expense tracking and budget management application built with modern web technologies. BudgetWatch empowers users to take control of their finances through intuitive visualization, real-time tracking, and smart budget analysis.

## 🌟 Key Features

### 📊 Expense Management
- **Smart Categorization**: Organize expenses into fixed and variable categories
- **Quick Entry**: Streamlined expense entry with category selection and amount input
- **Bulk Operations**: Add multiple expenses efficiently
- **Expense History**: View and manage past expenses with filtering options

### 📈 Budget Analysis
- **Interactive Pie Charts**: Visual breakdown of expenses by category
- **Fixed vs Variable Analysis**: Clear distinction between fixed and variable expenses
- **Budget Usage Tracking**: Real-time monitoring of budget utilization
- **Remaining Budget Calculator**: Instantly see remaining budget and overspending alerts

### 📊 Data Visualization
- **Dynamic Charts**: Real-time updates as you add or modify expenses
- **Category Distribution**: Visual representation of spending patterns
- **Percentage Breakdowns**: See exactly where your money is going
- **Color-Coded Insights**: Intuitive color scheme for different expense categories

### ⚡ Smart Features
- **Local Storage**: Secure data persistence in the browser
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-Time Updates**: Instant recalculation of budgets and statistics
- **Intuitive Interface**: Clean, modern UI built with Mantine components

## 🛠️ Technical Implementation

### 🏗️ Frontend Architecture
- **React 18**: Utilizing the latest React features for optimal performance
- **Vite**: Lightning-fast build tool for modern web development
- **Context API**: Global state management for budgets and expenses
- **Custom Hooks**: Reusable logic for colors, calculations, and data management

### 🎨 UI Components
- **Mantine UI**: Modern component library for consistent design
- **Mantine Charts**: Powerful charting library for data visualization
- **Custom Components**: Purpose-built components for budget management
- **Responsive Layout**: Fluid grid system for all screen sizes

### 💾 State Management
- **React Context**: Centralized state management for budget data
- **Local Storage**: Persistent data storage between sessions
- **Real-Time Calculations**: Dynamic updates for budget analysis
- **Type Safety**: TypeScript implementation for robust code

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
```

### Development
Run the development server:
```bash
npm run dev
```

### Production Build
Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Budget/
│   │   ├── BudgetAnalysis.jsx    # Budget visualization and analysis
│   │   ├── BudgetForm.jsx        # Budget input and management
│   │   └── ...
│   ├── Expenses/
│   │   ├── ExpenseList.jsx       # Expense display and management
│   │   ├── ExpenseForm.jsx       # Expense input form
│   │   └── ...
│   └── ...
├── contexts/
│   └── BudgetContext.jsx         # Global state management
├── hooks/
│   └── useAppColors.js           # Custom color management
└── ...
```

## 🎯 Future Enhancements

- Export functionality for expense reports
- Multiple budget periods management
- Budget goals and savings tracking
- Expense receipt image upload
- Budget recommendations based on spending patterns

## 🔒 Security

- All data is stored locally in the browser
- No external API calls or data transmission
- Private user data remains on the client side

## 📝 License

This project is private and not licensed for public use.

---

*Built with ❤️ using React, Vite, and Mantine UI*
