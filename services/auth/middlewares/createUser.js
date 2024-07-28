const { User, Profile, sequelize } = require('../models'); // Adjust the path as needed
const bcrypt = require('bcrypt');

async function createUserWithProfile(userData, profileData) {
  const t = await sequelize.transaction();
  
  try {
    // Hash the user's password
    const passwordHash = await bcrypt.hash(userData.password, 10);
    userData.passwordHash = passwordHash;
    delete userData.password; // Remove the plain password from the data

    // Create the user
    const user = await User.create(userData, { transaction: t });

    // Add the userId to the profile data
    profileData.userId = user.userId;

    // Create the profile
    await Profile.create(profileData, { transaction: t });

    // Commit the transaction
    await t.commit();

    return user;
  } catch (error) {
    // Rollback the transaction if any error occurred
    await t.rollback();
    throw error;
  }
}

// Example usage
const userData = {
  email: 'user@example.com',
  password: 'securepassword',
  role: 'customer'
};

const profileData = {
  firstName: 'John',
  lastName: 'Doe',
  phone: '+1234567890',
  address: {
    street: '123 Main St',
    city: 'Anytown',
    state: 'Anystate',
    postalCode: '12345',
    country: 'USA'
  },
  dateOfBirth: '1990-01-01',
  profilePictureUrl: 'http://example.com/profile.jpg',
  preferences: {
    language: 'en',
    currency: 'USD'
  }
};

module.exports = {createUserWithProfile, userData, profileData}



// createUserWithProfile(userData, profileData)
//   .then(user => {
//     console.log('User created successfully:', user);
//   })
//   .catch(error => {
//     console.error('Error creating user:', error);
//   });
