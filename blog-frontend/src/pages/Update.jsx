import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import styles from "./Update.module.css";

export default function Update(){
     const {id} = useParams();

     const [blog , setBlog] = useState([]);
            
     const loadBlog = async () => {
         const res = await fetch(`http://localhost:5000/posts/${id}`)
         const data = await res.json();
         setBlog(data);
     }

     useEffect( () => {
        loadBlog();
     },[]);

    const navigate = useNavigate();
    const updateBlog = async (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const content = e.target.content.value;
         await fetch (`http://localhost:5000/posts/${id}`,
            {method : "PUT",
                body : JSON.stringify({title ,content}),
                headers : {
                    "Content-type" : "application/json",
                }
            } 
         );
         navigate("/");
    }

    return (
        <div className={styles.updateContainer}>
          <h1 className={styles.heading}>{blog.title}</h1>
          <Link to={`/${id}/`} className={styles.backBtn}>← Back</Link>
    
          <form onSubmit={updateBlog} className={styles.blogForm}>
            <label htmlFor="title" className={styles.label}>Title</label>
            <input type="text" name="title" defaultValue={blog.title} className={styles.input} required />
    
            <label htmlFor="content" className={styles.label}>Content</label>
            <textarea name="content" defaultValue={blog.content} className={styles.textarea} required></textarea>
    
            <button type="submit" className={styles.submitBtn}>Update</button>
          </form>
        </div>
      );
    
}