import { BlogCard } from "@/components"
import useFetch from "@/hooks/useFetch"
import { VList } from "virtua"

export const Blogs = () => {
    const { data: blogs, error, loading, reFetch } = useFetch(`http://localhost:5000/api/blogs`)
    console.log(blogs)
    return (
        <VList style={{ height: 800 }}>
            {loading ? 'loading... ' : (
                blogs && blogs.map(blog => (
                    <BlogCard key={blog.id} blog={blog} />
                ))
            )}
        </VList>
    )
}
