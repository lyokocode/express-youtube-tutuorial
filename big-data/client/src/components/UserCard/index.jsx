import { MdRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import './userCard.scss'


export const UserCard = ({ person }) => {
    return (
        <>
            <tr className="bg-white border-b , dark:border-gray-700 hover:bg-gray-50 ">
                <td className="px-6 py-4">
                    {person.id}
                </td>
                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <img className="w-10 h-10 rounded-full" src={person.profilePicture} alt="Jese image" />
                    <div className="ps-3">
                        <div className="text-base font-semibold text-gray-600">{person.fullName}</div>
                        <div className="font-normal text-gray-500">{person.email}</div>
                    </div>
                </th>
                <td className="px-6 py-4">
                    {person.birthDate}
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center">
                        {person.isAdmin ? 'admin' : 'client'}
                    </div>
                </td>
                <td className="px-6 py-4 ">
                    <Link to={`/users/${person.userName}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline"><MdRemoveRedEye size={20} /></Link>
                </td>
            </tr>
        </>
    )
}

UserCard.propTypes = {
    person: PropTypes.shape({
        id: PropTypes.number.isRequired,
        profilePicture: PropTypes.string.isRequired,
        fullName: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        isAdmin: PropTypes.bool.isRequired,
        birthDate: PropTypes.string.isRequired
    }).isRequired
};