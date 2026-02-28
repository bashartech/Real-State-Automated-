import bcrypt from 'bcryptjs';
import { sanityClient } from './sanity';

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Verify password
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Check if email already exists
export async function checkEmailExists(email: string): Promise<boolean> {
  const users = await sanityClient.fetch(
    `*[_type == "userRegistration" && email == $email]`,
    { email: email.toLowerCase() }
  );
  return users.length > 0;
}

// Register new user
export async function registerNewUser(data: {
  fullName: string;
  email: string;
  password: string;
  registrationType: 'email' | 'google' | 'github';
  oauthId?: string;
}) {
  // Check if email already exists
  const emailExists = await checkEmailExists(data.email);
  if (emailExists) {
    throw new Error('Email already registered');
  }

  // Hash password if email registration
  let passwordHash = '';
  if (data.registrationType === 'email' && data.password) {
    passwordHash = await hashPassword(data.password);
  }

  // Create user in Sanity
  return await sanityClient.create({
    _type: 'userRegistration',
    fullName: data.fullName,
    email: data.email.toLowerCase(),
    passwordHash: passwordHash,
    registrationType: data.registrationType,
    oauthId: data.oauthId || '',
    registeredAt: new Date().toISOString(),
    status: 'active',
  });
}

// Login user
export async function loginUser(email: string, password: string) {
  // Fetch user by email
  const users = await sanityClient.fetch(
    `*[_type == "userRegistration" && email == $email && registrationType == "email"][0]{
      _id,
      fullName,
      email,
      passwordHash,
      status
    }`,
    { email: email.toLowerCase() }
  );

  if (!users) {
    throw new Error('Invalid email or password');
  }

  if (users.status !== 'active') {
    throw new Error('Account is inactive or suspended');
  }

  // Verify password
  const isValid = await verifyPassword(password, users.passwordHash);
  if (!isValid) {
    throw new Error('Invalid email or password');
  }

  // Update last login
  await sanityClient
    .patch(users._id)
    .set({ lastLogin: new Date().toISOString() })
    .commit();

  // Return user data (without password hash)
  return {
    _id: users._id,
    fullName: users.fullName,
    email: users.email,
    status: users.status,
  };
}

// OAuth login/register
export async function oauthLogin(data: {
  fullName: string;
  email: string;
  provider: 'google' | 'github';
  oauthId: string;
}) {
  // Check if user exists
  const existingUser = await sanityClient.fetch(
    `*[_type == "userRegistration" && email == $email][0]{
      _id,
      fullName,
      email,
      status
    }`,
    { email: data.email.toLowerCase() }
  );

  if (existingUser) {
    // Update last login
    await sanityClient
      .patch(existingUser._id)
      .set({ lastLogin: new Date().toISOString() })
      .commit();

    return existingUser;
  }

  // Create new user
  const newUser = await sanityClient.create({
    _type: 'userRegistration',
    fullName: data.fullName,
    email: data.email.toLowerCase(),
    registrationType: data.provider,
    oauthId: data.oauthId,
    registeredAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    status: 'active',
  });

  return {
    _id: newUser._id,
    fullName: data.fullName,
    email: data.email,
    status: 'active',
  };
}

// Get current user from localStorage
export function getCurrentUser() {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
}

// Save user to localStorage
export function saveCurrentUser(user: any) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('currentUser', JSON.stringify(user));
}

// Logout user
export function logoutUser() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('currentUser');
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}
