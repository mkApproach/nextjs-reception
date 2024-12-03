'use server'

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { error } from 'console';
 
const FormSchema = z.object({
  id: z.string(),
  clubId: z.string({
    invalid_type_error: 'クラブ（または個人）を選択してください。',
  }),
  categoryId: z.string({
    invalid_type_error: '種目を選択してください。',
  }),
  name: z.string(),
  age: z.string(),
  date: z.string(),
});

export type State = {
  errors?: {
    clubId?: string[];
    categoryId?: string[];
    name?: string[];
    age?: string[];
  };
  message?: string | null;
};
 
const CreateReception = FormSchema.omit({ id: true, date: true });
const UpdateReception = FormSchema.omit({ id: true, date: true });

export async function createReception(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateReception.safeParse({
    clubId: formData.get('clubId'),
    name: formData.get('name'),
    age: formData.get('age'),
  });
 
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Reception.',
    };
  }
 
  // Prepare data for insertion into the database
  const { clubId, categoryId, age } = validatedFields.data;
//  const nameInCents = name * 100;
  const date = new Date().toISOString().split('T')[0];
 
  // Insert data into the database
  try {
    await sql`
      INSERT INTO receptions (club_id, catgory_id, name, age, date)
      VALUES (${clubId}, ${categoryId}, ${age}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log('error', error)
    return {
      message: 'Database Error: Failed to Create Reception.',
    };
  }
 
  // Revalidate the cache for the receptions page and redirect the user.
  console.log('error', error)
  revalidatePath('/dashboard/receptions');
  redirect('/dashboard/receptions');
}

export async function updateReception(id: string, formData: FormData) {
  const { clubId } = UpdateReception.parse({
    clubId: formData.get('clubId'),
    name: formData.get('name'),
    age: formData.get('age'),
  });
 
  const nameInCents = name;
 
  try {
    await sql`
        UPDATE receptions
        WHERE id = ${id}
      `;
  } catch (error) {
    console.log('error', error)
    return { message: 'Database Error: Failed to Update Reception.' };
  }
 
  revalidatePath('/dashboard/receptions');
  redirect('/dashboard/receptions');
}


export async function deleteReception(id: string) {
//  throw new Error('Failed to Delete Reception');
  try {
    await sql`DELETE FROM receptions WHERE id = ${id}`;
    revalidatePath('/dashboard/receptions');
    return { message: 'Deleted Reception.' };
  } catch (error) {
    console.log('error', error)
    return { message: 'Database Error: Failed to Delete Reception.' };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}