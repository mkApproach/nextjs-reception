//import Image from 'next/image';
import { UpdateReception, DeleteReception } from '@/app/ui/receptions/buttons';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredReceptions } from '@/app/lib/data';


export default async function ReceptionsTable({
  query,
  currentPage,
  user_id,
  tourn_id,
}: {
  query: string;
  currentPage: number;
  user_id: string;
  tourn_id: number;
}) {

  const receptions = await fetchFilteredReceptions(query, currentPage, user_id, tourn_id);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-200 p-2 md:pt-2">
          <div className="md:hidden">
            {receptions?.map((reception) => (
              <div
                key={reception.id}
                className="mb-1 w-full rounded-md bg-white p-2"
              >
                <div className="flex items-center justify-between border-b pb-1">
                  <div>
                    <div className="mb-1 flex items-center">

                      <p>{reception.club_name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{reception.category_name}</p>
                  </div>
               </div>
                <div className="flex w-full items-center justify-between pt-1">
                  <div>
                    <p className="text-xl font-medium">
                      { reception.name }
                    </p>
                    <p className="text-sm text-gray-500">{formatDateToLocal(reception.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateReception id={reception.id} tourn_id={tourn_id}/>
                    <DeleteReception id={reception.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full bg-sky-100 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-3 py-5 font-medium sm:pl-6">
                  クラブ名（または個人）
                </th>
                <th scope="col" className="px-3 py-5 font-medium sm:pl-6">
                  種目
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  氏　名
                </th>
                <th scope="col" className="px-3 py-5 font-medium sm:pl-6">
                  年令（または学年）
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                    申込日（更新日）
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {receptions?.map((reception) => (
                <tr
                  key={reception.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap w-48 py-3 pr-3">
                     
                      <p>{reception.club_name}</p>
            
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {reception.category_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    { reception.name }
                  </td>
                  <td className="whitespace-nowrap  w-48 px-3 py-3">
                    { reception.age }
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    { reception.email }
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(reception.date)}
                  </td>

                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateReception id={reception.id}  tourn_id={tourn_id} />
                      <DeleteReception id={reception.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
