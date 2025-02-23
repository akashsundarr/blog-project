import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Blogs.module.css";

export default function Blogs(){

    const [posts, setPosts] = useState([]);

    const load = async () => {
        const res = await fetch ("http://localhost:5000/posts");
        const data = await res.json();
        setPosts(data);
    }

    useEffect(()=> {
        load();
    },[]);

    return (
        <div className={styles.blogListContainer}>
          <h1 className={styles.heading}>Blogs List</h1>
          <hr className={styles.divider} />
    
          <div className={styles.createContainer}>
            <Link to="/create" className={styles.createBtn}>Create New Blog</Link>
          </div>
    
          <hr className={styles.divider} />
    
          <ol className={styles.blogList}>
            {posts.map((post) => (
              <li key={post.id} className={styles.blogItem}>
                <h2 className={styles.blogTitle}>{post.title}</h2>
                <p className={styles.blogContent}>{post.content}</p>
                <Link to={`${post.id}`} className={styles.detailsBtn}>View Blog</Link>
              </li>
            ))}
          </ol>
        </div>
      );
    };
