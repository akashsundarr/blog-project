import { Link, useNavigate } from "react-router-dom";
import styles from "./Create.module.css";
export default function Create(){
    const navigate = useNavigate();
    const createBlog = async (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const content = e.target.content.value;
        await fetch("http://localhost:5000/posts/",
        {method : "POST",
            body : JSON.stringify({title,content}),
            headers : {
                "Content-type" : "application/json"
            },
        });
     
        navigate("/");
        
    }

    return (
        <div className={styles.createContainer}>
          <h1 className={styles.heading}>Create a New Blog</h1>
          <Link to="/" className={styles.backBtn}>← Back</Link>
    
          <form onSubmit={createBlog} className={styles.blogForm}>
            <label htmlFor="title" className={styles.label}>Title</label>
            <input type="text" name="title" className={styles.input} required />
    
            <label htmlFor="content" className={styles.label}>Content</label>
            <textarea name="content" className={styles.textarea} required></textarea>
    
            <button type="submit" className={styles.submitBtn}>Create</button>
          </form>
        </div>
      );
    };
    
