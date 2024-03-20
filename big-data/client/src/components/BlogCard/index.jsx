import moment from "moment";
import PropTypes from 'prop-types';

export const BlogCard = ({ blog }) => {
    return (
        <div className="mx-auto w-[45%] h-[250px] flex items-center justify-center ">
            {blog && (
                <a
                    href="#"
                    className="text-xl relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
                >
                    <span
                        className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
                    ></span>

                    <div className="sm:flex sm:justify-between sm:gap-4">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                                {blog?.comments}
                            </h3>

                            <p className="mt-1 text-xs font-medium text-gray-600">By {blog?.User?.fullName}</p>
                        </div>

                        <div className="hidden sm:block sm:shrink-0">
                            <img
                                alt=""
                                src={blog.image}
                                className="size-16 rounded-lg object-cover shadow-sm"
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <p className="text-pretty text-sm text-gray-500">
                            {blog?.content}
                        </p>
                    </div>

                    <dl className="mt-6 flex gap-4 sm:gap-6">
                        <div className="flex flex-col-reverse">
                            <dt className="text-sm font-medium text-gray-600">Published</dt>
                            <dd className="text-xs text-gray-500">{moment(blog?.createdAt).fromNow()}</dd>
                        </div>

                        <div className="flex flex-col-reverse">
                            <dt className="text-sm font-medium text-gray-600">{blog.id}</dt>
                            <dd className="text-xs text-gray-500">#id</dd>
                        </div>
                    </dl>
                </a>
            )}
        </div>
    )
}

BlogCard.propTypes = {
    blog: PropTypes.shape({
        id: PropTypes.number.isRequired,
        comments: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        User: PropTypes.shape({
            fullName: PropTypes.string.isRequired
        }),
    }).isRequired
};