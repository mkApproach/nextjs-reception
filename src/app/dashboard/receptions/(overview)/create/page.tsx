import Form from '@/app/ui/receptions/create-form';
import Breadcrumbs from '@/app/ui/receptions/breadcrumbs';
import { fetchClubs, fetchCategorys } from '@/app/lib/data';
 
export default async function Page() {
  const clubs = await fetchClubs();
  const categorys = await fetchCategorys();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: '申し込み処理', href: '/dashboard/receptions' },
          {
            label: '受付　作成',
            href: '/dashboard/create',
            active: true,
          },
        ]}
      />
      <Form clubs={clubs} categorys={categorys} />
    </main>
  );
}