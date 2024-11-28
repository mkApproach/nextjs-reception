import Form from '@/app/ui/receptions/create-form';
import Breadcrumbs from '@/app/ui/receptions/breadcrumbs';
import { fetchClubs } from '@/app/lib/data';
 
export default async function Page() {
  const clubs = await fetchClubs();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: '受付処理', href: '/dashboard' },
          {
            label: '受付　作成',
            href: '/dashboard/create',
            active: true,
          },
        ]}
      />
      <Form clubs={clubs} />
    </main>
  );
}