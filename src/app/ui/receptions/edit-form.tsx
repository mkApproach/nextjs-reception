'use client';

import { ClubField, CategoryField,  ReceptionForm } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateReception } from '@/app/lib/actions';
import { useSession } from "next-auth/react"

export default function EditReceptionForm({
  reception,
  clubs,
  categorys,
}: {
  reception: ReceptionForm;
  clubs: ClubField[];
  categorys: CategoryField[];
}) {
  const { data: session } = useSession();
  
  const updateReceptionWithId = updateReception.bind(null, reception.id);
  const user_id = session?.user?.id

  return (
    <form action={updateReceptionWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Club Name */}
        <div className="mb-4">
          <label htmlFor="club" className="mb-2 block text-sm font-medium">
            得意先・顧客の選択
          </label>
          <div className="relative">
            <select
              id="club"
              name="clubId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={reception.club_id}
            >
              <option value="" disabled>
              --- 選択して下さい ---
              </option>
              {clubs.map((club) => (
                <option key={club.id} value={club.id}>
                  {club.club_name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Category Name */}
        <div className="mb-4">
          <label htmlFor="category" className="mb-2 block text-sm font-medium">
            種　目
          </label>
          <div className="relative">
            <select
              id="category"
              name="categoryId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={reception.category_id}
            >
              <option value="" disabled>
              --- 選択して下さい ---
              </option>
              {categorys.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.category_name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Reception Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            氏　名
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                step="0.01"
                defaultValue={reception.name}
                placeholder="選手の名前を入力して下さい"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Reception Age */}
        <div className="mb-4">
          <label htmlFor="age" className="mb-2 block text-sm font-medium">
            年令（または学年）
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="age"
                name="age"
                type="text"
                step="0.01"
                defaultValue={reception.age}
                placeholder="選手の年令（または学年）を入力して下さい"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Reception Email */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="text"
                step="0.01"
                defaultValue={reception.email}
                placeholder="メールアドレスを入力して下さい"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Reception user_id */}
        <div className="mb-4">
          <div>
            <div>
              <input type="hidden"
                id="user_id"
                name="user_id"
                value= {user_id}
                className="w-full"
              />
            </div>
          </div>
        </div>

 
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/reception"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">更　新</Button>
      </div>
    </form>
  );
}
