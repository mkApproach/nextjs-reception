'use server'

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { error } from 'console';
import { User, } from './definitions';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';

// 正規表現を使用して、有効な文字だけを含む文字列を定義します。
const pattern = /^[\u0021-\u007e]+$/u
 
const FormSchema = z.object({
  id: z.number(),
  clubId: z.string({
    invalid_type_error: 'クラブ（または個人）を選択してください。',
  }),
  categoryId: z.string({
    invalid_type_error: '種目を選択してください。',
  }),
  name: z.string()
  .max(255, '255文字以下で入力してください。' )
  .min(1, '必須です'),
  age: z.string(),
  email: z
  .string()
  .email('正しいメールアドレスを入力してください。') // メールアドレス形式のバリデーション
  .regex(pattern), // 追加の正規表現によるバリデーション
  user_id: z.string(),
  date: z.string(),
});

const FormUser = z.object({
  id: z.string(),
  name: z.string()
  .max(255, '255文字以下で入力してください。' )
  .min(1, '必須です'),
  email: z
  .string()
  .email('正しいメールアドレスを入力してください。') // メールアドレス形式のバリデーション
  .regex(pattern), // 追加の正規表現によるバリデーション
  password: z.string(),
});

export type State = {
  errors?: {
    clubId?: string[];
    categoryId?: string[];
    name?: string[];
    age?: string[];
    email?: string[];
  };
  message?: string | null;
};
 
const CreateReception = FormSchema.omit({ id: true, date: true });
const UpdateReception = FormSchema.omit({ id: true, date: true });
const CreateUser = FormUser.omit({ id: true });

export async function createReception(prevState: State, formData: FormData) {
    // Validate form using Zod
    const validatedFields = CreateReception.safeParse({
      clubId: formData.get('clubId'),
      categoryId: formData.get('categoryId'),
      name: formData.get('name'),
      age: formData.get('age'),
      email: formData.get('email'),
      user_id: formData.get('user_id'),
    });
   
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Reception.',
      };
    }
   
    // Prepare data for insertion into the database
    const { clubId, categoryId, name, age, email, user_id } = validatedFields.data;
  
    const date = new Date().toISOString().split('T')[0];
   
    // Insert data into the database
    try {
      await sql`
        INSERT INTO receptions (name, age, email, club_Id, category_Id, user_id, date)
        VALUES (${name}, ${age}, ${email}, ${clubId}, ${categoryId}, ${user_id}, ${date})
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
    revalidatePath('/dashboard');
    redirect('/dashboard');
  }
  
  export async function updateReception(id: number, formData: FormData) {
    const { clubId, categoryId, name, age, email, user_id } = UpdateReception.parse({
      clubId: formData.get('clubId'),
      categoryId: formData.get('categoryId'),
      name: formData.get('name'),
      age: formData.get('age'),
      email: formData.get('email'),
      user_id: formData.get('user_id'),
    });
   
    console.log('update quary', (typeof clubId), categoryId, name, age, email, user_id);
  
    const date = new Date().toISOString().split('T')[0];
   
    try {
      await sql`
          UPDATE receptions
          SET name = ${name}, age = ${age}, email = ${email}, club_Id = ${clubId}, category_Id = ${categoryId}, user_id = ${user_id}, date = ${date}
          WHERE id = ${id}
        `;
    } catch (error) {
      console.log('error', error)
      return { message: 'Database Error: Failed to Update Reception.' };
    }
   
    revalidatePath('/dashboard');
    redirect('/dashboard');
  }
  
  
  export async function deleteReception(id: number) {
  //  throw new Error('Failed to Delete Reception');
    try {
      await sql`DELETE FROM receptions WHERE id = ${id}`;
      revalidatePath('/dashboard');
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

  export async function userRegistration(
    prevState: string | undefined,
    formData: FormData,
  ) {
        // Validate form using Zod
    const validatedFields = CreateUser.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    });
   
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      return 'Missing Fields. Failed to Create Reception.'
    }
       
    // Prepare data for insertion into the database
    const { name, email, password } = validatedFields.data;

    try {
      const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;

      if (user.rows[0]) {
        return 'すでに、登録済です.';
      } else {
        // ここからユーザー登録処理
        try {
          const hashedPassword = await bcrypt.hash(password, 10);
          await sql`
            INSERT INTO users (name, email, password)
            VALUES (${name}, ${email}, ${hashedPassword})
          `;
        } catch (error) {
          // If a database error occurs, return a more specific error.
          console.log('error', error)
          return 'ユーザー登録ができませんでした'          
        }
      }
    } catch (error) {
      console.error('ユーザーの取得に失敗しました:', error);

      return 'ユーザーの取得に失敗しましたr'
      throw error;
    }

    redirect('/login');
  }