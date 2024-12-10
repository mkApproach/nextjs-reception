import { fetchFilteredClubs } from '@/app/lib/data';
import ClubsTable from '@/app/ui/clubs/table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Clubs',
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';

  const clubs = await fetchFilteredClubs(query);

  return (
    <main>
      <ClubsTable clubs={clubs} />
    </main>
  );
}
