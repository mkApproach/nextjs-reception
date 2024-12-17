import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import {
  TournamentsTableType,
  FormattedTournamentsTable,
} from '@/app/lib/definitions';
import { formatDateToLocal } from '@/app/lib/utils';

export default async function TournamentsTable({
  tournaments,
}: {
  tournaments: FormattedTournamentsTable[];
}) {
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        大会
      </h1>
      <Search placeholder="Search tournaments..." />
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {tournaments?.map((tournament) => (
                  <div
                    key={tournament.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            <p>{tournament.tournament_name}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          会場:　 {tournament.venue_name}
                        </p>
                        <p className="text-sm text-gray-500">
                          主催者:　{tournament.club_name}
                        </p>
                        <p className="text-sm text-gray-500">
                          開催日:　　{formatDateToLocal(tournament.date)}
                        </p>
                      </div>
                    </div>
 
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-sky-100 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-3 py-5 font-medium sm:pl-6">
                      大会名
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      会場
                    </th>                    
                    <th scope="col" className="px-3 py-5 font-medium">
                      主催者
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      開催日
                    </th>                    
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {tournaments.map((tournament) => (
                    <tr key={tournament.id} className="group">
                      <td className="whitespace-nowrap bg-white w-80 py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <p>{tournament.tournament_name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-3 py-5 text-sm">
                        {tournament.venue_name}
                      </td>
                      <td className="whitespace-nowrap bg-white px-3 py-5 text-sm">
                        {tournament.club_name}
                      </td>
                      <td className="whitespace-nowrap bg-white px-3 py-5 text-sm">
                        {formatDateToLocal(tournament.date)}
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
