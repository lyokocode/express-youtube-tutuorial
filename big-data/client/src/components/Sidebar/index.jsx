import "./sidebar.scss"
import { Link } from 'react-router-dom'
import { MdDashboard } from "react-icons/md"
import { AiOutlineUser } from "react-icons/ai"
import { BiLogoBlogger } from "react-icons/bi"

export const Sidebar = () => {

    return (
        <div className='sidebar '>
            <div className="top">
                <Link to="/">
                    <h1 className="logo"></h1>
                </Link>
            </div>
            <div className="center">
                <ul>
                    <p className="title">Main</p>
                    <Link to="/">
                        <li>
                            <MdDashboard className="icon" />
                            <span>Dashboard</span>
                        </li>
                    </Link>
                    <p className="title">Lists</p>
                    <Link to="/users">
                        <li>
                            <AiOutlineUser className="icon" />
                            <span>Users</span>
                        </li>
                    </Link>
                    <Link to="/blogs">
                        <li>
                            <BiLogoBlogger className="icon" />
                            <span>Blogs</span>
                        </li>
                    </Link>

                </ul>
            </div>

        </div>
    )
}