import Pagination from '@/app/ui/receptions/pagination';
import Search from '@/app/ui/search';
import ReceptionsTable from '@/app/ui/receptions/table';
import { CreateReception } from '@/app/ui/receptions/buttons';
import { lusitana } from '@/app/ui/fonts';
import { ReceptionsTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchReceptionsPages } from '@/app/lib/data';
import { Metadata } from 'next';
import { auth } from '@/auth';


export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default async function Page(
    props: {
        searchParams?: Promise<{
        query?: string;
        page?: string;
        }>;
    }
    
    ) {

    const session = await auth();
    const user_id = session?.user?.id || '';

    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await fetchReceptionsPages(query, user_id); 

    console.log('query', query)


    return (
        <div className="w-full">
          <div className="flex w-full items-center justify-between">
            <h1 className={`${lusitana.className} text-2xl`}>受付一覧</h1>
          </div>
          <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <Search placeholder="受付の検索..." />
            <CreateReception />  { /* 新規受付処理 */ }
          </div>
          <Suspense key={query + currentPage} fallback={<ReceptionsTableSkeleton />}>
            <ReceptionsTable query={query} currentPage={currentPage} user_id={user_id}/>  { /* 受付の一覧表示（更新・削除）*/}
          </Suspense>
          <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={totalPages} />
          </div>
        </div>
      );
    }