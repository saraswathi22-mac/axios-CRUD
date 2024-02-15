import './App.css'
import Posts from './components/GetPosts'
import CreatePost from './components/CreatePosts'
import UpdatePost from './components/UpdatePosts'
import DeletePost from './components/DeletePosts'

function App() {

  return (
    <>
      <Posts />
      <CreatePost />
      <UpdatePost />
      <DeletePost />
    </>
  )
}

export default App
