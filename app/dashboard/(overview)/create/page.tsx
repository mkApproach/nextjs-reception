import Form from '@/app/ui/receptions/create-form';
import Breadcrumbs from '@/app/ui/receptions/breadcrumbs';
import { fetchClubs } from '@/app/lib/data';
 
export default async function Page() {
  const clubs = await fetchClubs();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: '請求処理', href: '/dashboard/receptions' },
          {
            label: '請求書　作成',
            href: '/dashboard/receptions/create',
            active: true,
          },
        ]}
      />
      <Form clubs={clubs} />
    </main>
  );
}