import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import {
  ClubsTableType,
  FormattedClubsTable,
} from '@/app/lib/definitions';

export default async function ClubsTable({
  clubs,
}: {
  clubs: FormattedClubsTable[];
}) {
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        クラブ（または個人）
      </h1>
      <Search placeholder="Search clubs..." />
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {clubs?.map((club) => (
                  <div
                    key={club.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            <p>{club.club_name}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          Email:　 {club.club_email}
                        </p>
                        <p className="text-sm text-gray-500">
                          住 所:　{club.club_address}
                        </p>
                        <p className="text-sm text-gray-500">
                          Tel:　　{club.club_phonenumber}
                        </p>
                        <p className="text-sm text-gray-500">
                          Fax:　　{club.club_faxnumber}
                        </p>
                      </div>
                    </div>
 
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-sky-100 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      クラブ名（または個人）
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Email
                    </th>                    
                    <th scope="col" className="px-3 py-5 font-medium">
                      住　所
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      電話番号
                    </th>                    
                    <th scope="col" className="px-3 py-5 font-medium">
                      Fax番号
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {clubs.map((club) => (
                    <tr key={club.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <p>{club.club_name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {club.club_email}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {club.club_address}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {club.club_phonenumber}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                        {club.club_faxnumber}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
