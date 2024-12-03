import Form from '@/app/ui/receptions/edit-form';
import Breadcrumbs from '@/app/ui/receptions/breadcrumbs';
import { fetchReceptionById, fetchClubs } from '@/app/lib/data';
import { notFound } from 'next/navigation';
 
export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [reception, clubs] = await Promise.all([
      fetchReceptionById(id),
      fetchClubs(),
    ]);

    if (!reception) {
      notFound();
    }
       
  return (

    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: '受付処理', href: '/dashboard/receptions' },
          {
            label: '受付　編集',
            href: `/dashboard/receptions/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form reception={reception} clubs={clubs} />
    </main>
  );
}