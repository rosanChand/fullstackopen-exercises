import {useState} from 'react'

const BlogForm = ({createBlog}) => {
    const [newBlog,setNewBlog] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        const blogObject = {
            ...newBlog
        }
        createBlog(blogObject)

        setNewBlog({})
    }
    const handleInputChange = (event) => {
        const { name, value } = event.target
        setNewBlog({ ...newBlog, [name]: value })

      }
    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
            <div>
                Title
                <input type="text" name="title" value={newBlog.title} onChange={handleInputChange} />
            </div>
            <div>
                Author
                <input type="text" name="author" value={newBlog.author} onChange={handleInputChange} />
            </div>
            <div>
                Url
                <input type="text" name="url" value={newBlog.url} onChange={handleInputChange} />
            </div>
            <button type="submit">save</button>
            </form>
        </>
    )
}
export default BlogForm