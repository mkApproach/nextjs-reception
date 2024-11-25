import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
 
export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [invoice, customers] = await Promise.all([
      fetchInvoiceById(id),
      fetchCustomers(),
    ]);

    if (!invoice) {
      notFound();
    }
       
  return (

    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: '請求処理', href: '/dashboard/invoices' },
          {
            label: '請求書　編集',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}