require('dotenv').config();

const { NODE_ENV, INITIAL_DATA_PASSWORD, INITIAL_DATA_EMAIL, RECREATE_DATABASE } = process.env;

// Lets not hardcode password, even for test data
const adminPassword = INITIAL_DATA_PASSWORD;
const adminEmail    = INITIAL_DATA_EMAIL;
const PASSWORD_MIN_LENGTH = 8;

// You can force a re-init in development with the RECREATE_DATABASE
// environment variable.
const shouldRecreateDatabase = () => NODE_ENV !== 'production' && RECREATE_DATABASE;

const validatePassword = () => {
  if (!adminPassword) {
    throw new Error(`To seed initial data, set the 'INITIAL_DATA_PASSWORD' environment variable`);
  } else if (adminPassword.length < PASSWORD_MIN_LENGTH) {
    throw new Error(
      `To seed initial data, the 'INITIAL_DATA_PASSWORD' environment variable must be at least ${PASSWORD_MIN_LENGTH} characters`
    );
  }
};

export const initializeData = async keystone => {
  // Check the users list to see if there are any; if we find none, assume
  // it's a new database and initialise the demo data set.
  const users = await keystone.lists.User.adapter.findAll();
  if (!users.length || shouldRecreateDatabase()) {
    // Ensure a valid initial password is available to be used
    validatePassword();
    // Drop the connected database to ensure no existing collections remain
    Object.values(keystone.adapters).forEach(async adapter => {
      await adapter.dropDatabase();
    });
    console.log('Creating initial data...');
    await keystone.createItems(initialData);
  }
};

const initialData = {
  User: [
    { name: 'Admin User', email: adminEmail, password: adminPassword, isAdmin: true },
  ],
};
