import { ActionIcon, Button, Group, Paper, Stack, Text } from '@mantine/core';
import {
  IconBuildingBank,
  IconEdit,
  IconPigMoney,
  IconTrash,
  IconWallet,
} from '@tabler/icons-react';
import { useAppColors } from '../../hooks/useAppColors';

const ACCOUNT_ICONS = {
  bank: IconBuildingBank,
  cash: IconWallet,
  savings: IconPigMoney,
};

export function AccountsList({
  accounts = [],
  onEditAccount,
  onDeleteAccount,
  onAddAccount,
}) {
  const { getColor } = useAppColors();

  const handleDelete = (accountId, accountName) => {
    const confirmMessage = `Are you sure you want to delete the account "${accountName}"? This action cannot be undone.`;
    if (window.confirm(confirmMessage)) {
      onDeleteAccount(accountId);
    }
  };

  return (
    <Paper p="md" style={{ backgroundColor: getColor('surface') }}>
      <Stack gap="md">
        <Group justify="space-between">
          <Stack gap={4}>
            <Text size="lg" fw={500} c={getColor('text')}>Accounts</Text>
            <Text size="sm" c={getColor('secondary')}>Manage your financial accounts</Text>
          </Stack>
          <Button variant="light" onClick={onAddAccount}>
            <Group gap="xs">
              <IconBuildingBank size={16} />
              <span>Add Account</span>
            </Group>
          </Button>
        </Group>

        <Stack gap="sm">
          {accounts.map(account => {
            const Icon = ACCOUNT_ICONS[account.type] || IconBuildingBank;

            return (
              <Paper
                key={account.id}
                p="sm"
                style={{
                  backgroundColor: getColor('background'),
                  transition: 'transform 0.2s ease',
                  cursor: 'default',
                  '&:hover': {
                    transform: 'translateX(4px)',
                  },
                }}
              >
                <Group justify="space-between" wrap="nowrap">
                  <Group gap="sm" wrap="nowrap">
                    <Icon size={24} color={getColor('primary')} />
                    <Stack gap={2}>
                      <Text size="sm" fw={500} c={getColor('text')}>
                        {account.name}
                      </Text>
                      <Text size="xs" c={getColor('secondary')}>
                        {account.type.charAt(0).toUpperCase() +
                          account.type.slice(1)}
                      </Text>
                    </Stack>
                  </Group>

                  <Group gap="sm">
                    <Text fw={500} c={getColor('text')}>
                      ${account.balance.toFixed(2)}
                    </Text>
                    <ActionIcon
                      variant="subtle"
                      color="blue"
                      onClick={() => onEditAccount(account)}
                      title="Edit account"
                    >
                      <IconEdit size={16} />
                    </ActionIcon>
                    <ActionIcon
                      variant="subtle"
                      color="red"
                      onClick={() => handleDelete(account.id, account.name)}
                      title="Delete account"
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                </Group>
              </Paper>
            );
          })}
        </Stack>

        {accounts.length === 0 && (
          <Paper
            p="xl"
            style={{
              backgroundColor: getColor('background'),
              border: `1px dashed ${getColor('secondary')}`,
            }}
          >
            <Stack align="center" gap="md">
              <IconBuildingBank size={32} color={getColor('secondary')} />
              <Text c={getColor('secondary')} ta="center">
                No accounts added yet. Click "Add Account" to get started.
              </Text>
            </Stack>
          </Paper>
        )}
      </Stack>
    </Paper>
  );
}
