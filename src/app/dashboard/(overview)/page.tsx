import { fetchFilteredTournaments } from '@/app/lib/data';
import TournamentsTable from '@/app/ui/tournaments/table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tournaments',
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';

  const tournaments = await fetchFilteredTournaments(query);

  return (
    <main>
      <TournamentsTable tournaments={tournaments} />
    </main>
  );
}
