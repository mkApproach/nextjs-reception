'use client';

import { useSession } from "next-auth/react"

export async function LoginUserId() {
    const { data: session } = useSession();
    const user_id = session?.user?.id;

    return user_id;

}