import { Link } from 'react-router-dom';

const SearchItem = ({ post }) => { //props

  return( 
    <li className="list">
    <img src={post.imageUrl} alt="images" />
    <article className="art">
    <h2 className='title2'>{post.title}</h2>
    <p className='type'>Type: {post.type}</p>
   
    <Link className="btn" to={`/details/${post._id}`}>
      Details
    </Link>
    </article>
  </li>
)
  }

  export default SearchItem
