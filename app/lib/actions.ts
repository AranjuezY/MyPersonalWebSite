'use server';

import { signIn } from 'next-auth/react'

export async function authenticate(_currentState: unknown, formData: FormData) {
  try {
    const response = await signIn('credentials', {
      redirect: false,  // Ensure it doesn't redirect automatically
      ...Object.fromEntries(formData.entries()) // Convert FormData to plain object
    });

    if (!response || response.error) {
      switch (response?.error) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }

    return 'Authenticated successfully!';
  } catch (error) {
    console.error('Authentication error:', error);
    return 'Something went wrong.';
  }
}
