const ACCOUNT_STORAGE_KEY = 'shopco-accounts';

function readAccounts() {
  const savedAccounts = localStorage.getItem(ACCOUNT_STORAGE_KEY);
  if (!savedAccounts) return [];

  const parsedAccounts = JSON.parse(savedAccounts);
  if (
    !Array.isArray(parsedAccounts) ||
    !parsedAccounts.every(
      (account) =>
        account &&
        typeof account.name === 'string' &&
        typeof account.email === 'string' &&
        typeof account.salt === 'string' &&
        typeof account.passwordHash === 'string',
    )
  ) {
    throw new Error('Saved account data has an invalid format.');
  }

  let migrated = false;
  const accounts = parsedAccounts.map((account) => {
    if (typeof account.id === 'string') return account;
    migrated = true;
    return { ...account, id: crypto.randomUUID() };
  });

  if (migrated) {
    localStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(accounts));
  }

  return accounts;
}

async function hashPassword(password, salt) {
  const data = new TextEncoder().encode(`${salt}:${password}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, '0'),
  ).join('');
}

export async function registerAccount({ name, email, password }) {
  const accounts = readAccounts();
  const normalizedEmail = email.trim().toLowerCase();

  if (accounts.some((account) => account.email === normalizedEmail)) {
    throw new Error('An account with this email already exists. Please sign in.');
  }

  const salt = Array.from(crypto.getRandomValues(new Uint8Array(16)), (byte) =>
    byte.toString(16).padStart(2, '0'),
  ).join('');
  const account = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: normalizedEmail,
    salt,
    passwordHash: await hashPassword(password, salt),
  };

  localStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify([...accounts, account]));
  return { id: account.id, name: account.name, email: account.email };
}

export async function authenticateAccount({ email, password }) {
  const normalizedEmail = email.trim().toLowerCase();
  const account = readAccounts().find((item) => item.email === normalizedEmail);

  if (!account || (await hashPassword(password, account.salt)) !== account.passwordHash) {
    throw new Error('Email or password is incorrect.');
  }

  return { id: account.id, name: account.name, email: account.email };
}

export function getPublicSellers() {
  return readAccounts().map(({ id, name, email }) => ({
    id,
    name,
    email,
  }));
}
