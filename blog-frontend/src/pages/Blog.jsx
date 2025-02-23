import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./Blog.module.css";

export default function Blog(){
  const {id} = useParams();
 
   const navigate = useNavigate();

  const [blog , setBlog] = useState([]);

  const load = async () => {
    const res = await fetch (`http://localhost:5000/posts/${id}`);
    const data = await res.json(); 
    setBlog(data);
    
    
  }  

  const onDelete = async () => {
    const res = await fetch (`http://localhost:5000/posts/${id}`,
       {method : "DELETE"} 
    );
    const data = await res.json();
    navigate("/");
    return data;
  }

  useEffect( () =>  {
    load();
  },[]);
 
 
  return (
    <div className={styles.blogContainer}>
      <h1 className={styles.blogTitle}>{blog.title}</h1>

      <div className={styles.blogContent}>
        <p>{blog.content}</p>
      </div>

      <hr className={styles.divider} />

      <div className={styles.blogActions}>
        <Link to={`/${id}/update`} className={styles.editBtn}>Edit</Link>
        <button onClick={onDelete} className={styles.deleteBtn}>Delete</button>
      </div>
    </div>
  );
};
