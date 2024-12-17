'use client';

import { useSession } from "next-auth/react"

export default function LoginUserInfo() {
    const { data: session } = useSession();
    console.log('session?.user', session?.user);
    return (
        <div>
            {session?.user?.name}
        </div>
      
    )
}