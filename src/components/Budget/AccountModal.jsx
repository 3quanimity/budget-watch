import { Modal, TextInput, Select, Button, Group, Stack } from '@mantine/core';
import { IconBuildingBank, IconWallet, IconPigMoney } from '@tabler/icons-react';
import { useState, forwardRef } from 'react';

const SelectItem = forwardRef(({ label, icon: Icon, ...others }, ref) => (
  <Group ref={ref} {...others}>
    <Icon size={16} />
    <span>{label}</span>
  </Group>
));

SelectItem.displayName = 'SelectItem';

const ACCOUNT_TYPES = [
  { 
    value: 'bank', 
    label: 'Bank Account',
    icon: IconBuildingBank 
  },
  { 
    value: 'cash', 
    label: 'Cash',
    icon: IconWallet 
  },
  { 
    value: 'savings', 
    label: 'Savings',
    icon: IconPigMoney 
  },
];

const accountTypeData = ACCOUNT_TYPES.map(({ value, label }) => ({
  value,
  label,
}));

export function AccountModal({ opened, onClose, onSubmit, initialValues = null }) {
  const [formData, setFormData] = useState({
    name: initialValues?.name || '',
    type: initialValues?.type || 'bank',
    balance: initialValues?.balance?.toString() || '',
  });

  const [error, setError] = useState({
    name: '',
    balance: '',
  });

  const validateForm = () => {
    const newError = {
      name: '',
      balance: '',
    };

    if (!formData.name.trim()) {
      newError.name = 'Account name is required';
    }

    const balance = parseFloat(formData.balance);
    if (isNaN(balance) || balance < 0) {
      newError.balance = 'Please enter a valid positive amount';
    }

    setError(newError);
    return !newError.name && !newError.balance;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        balance: parseFloat(formData.balance),
        id: initialValues?.id,
      });
      onClose();
    }
  };

  const renderOption = (option) => {
    const accountType = ACCOUNT_TYPES.find(type => type.value === option.value);
    const Icon = accountType?.icon || IconBuildingBank;
    return (
      <Group spacing="xs">
        <Icon size={16} />
        <span>{option.label}</span>
      </Group>
    );
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={initialValues ? "Edit Account" : "Add New Account"}
      size="sm"
    >
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            label="Account Name"
            placeholder="Enter account name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (error.name) setError({ ...error, name: '' });
            }}
            error={error.name}
            required
          />
          
          <Select
            label="Account Type"
            data={accountTypeData}
            value={formData.type}
            onChange={(value) => setFormData({ ...formData, type: value })}
            renderOption={renderOption}
            maxDropdownHeight={400}
            required
          />

          <TextInput
            label="Current Balance"
            placeholder="Enter current balance"
            type="number"
            step="0.01"
            min="0"
            value={formData.balance}
            onChange={(e) => {
              setFormData({ ...formData, balance: e.target.value });
              if (error.balance) setError({ ...error, balance: '' });
            }}
            error={error.balance}
            required
          />

          <Group justify="flex-end" mt="md">
            <Button variant="light" onClick={onClose}>Cancel</Button>
            <Button type="submit">{initialValues ? "Save Changes" : "Add Account"}</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
