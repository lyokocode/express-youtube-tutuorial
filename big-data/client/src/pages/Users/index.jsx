import { Pagination, UserCard } from "@/components"
import useFetch from "@/hooks/useFetch"
import { usePagination } from "@/utils/usePagination"


export const Users = () => {

    const { page, pageSize, totalPages, handlePageChange } = usePagination(10, 'users/count')

    const { data: users, error, loading, reFetch } = useFetch(`http://localhost:5000/api/users?fields=id,fullName,profilePicture,email,birthDate,isAdmin,userName&page=${page}&pageSize=${pageSize}`)
    //id,fullName,profilePicture,email,birthDate,isAdmin,userName
    console.log(users)
    return (
        <div className="p-4">
            <div className="relative overflow-x-auto ">
                <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white">
                    <div>
                        <button className="inline-flex items-center text-xl text-gray-500  border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg  px-3 py-1.5   bg-green-200   "
                            onClick={() => reFetch()}
                        >
                            Refetch
                        </button>
                    </div>
                    <label className="sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 bg-white rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="text" id="table-search-users" className="block  p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500   :--blue-500" placeholder="Search for users" />
                    </div>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                #ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                BIRTH DATE
                            </th>
                            <th scope="col" className="px-6 py-3">
                                ROLE
                            </th>
                            <th scope="col" className="px-6 py-3">
                                VİEW
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? 'loading...' : (
                            users && users.map(person => (
                                <UserCard key={person.id} person={person} />
                            ))
                            // 'users'
                        )}
                    </tbody>
                </table>
                <Pagination
                    currentPage={page}
                    onPageChange={handlePageChange}
                    totalPages={totalPages}
                />
            </div>
        </div>
    )
}
