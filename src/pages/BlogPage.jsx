import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { postsData } from "../data/posts";

const BlogPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDownload = (pdfPath) => {
    const link = document.createElement("a");
    link.href = pdfPath;
    link.download = pdfPath.split("/").pop(); // имя файла из пути
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="section">
      <div className="container">
        <ul className="list">
          {postsData.map((post) => (
            <li className="blog-item" key={post.id}>
              <img className="blog-img" src={post.img} alt="post" />

              <div className="blog-content">
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-text">{post.text}</p>

                <div className="blog-box-btn">
                  {post.pdf ? (
                    <button className="blog-btn" onClick={() => handleDownload(post.pdf)}>
                      Завантажити PDF
                    </button>
                  ) : (
                    <button className="blog-btn" onClick={() => navigate(`/post/${post.id}`)}>
                      Читати більше
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BlogPage;
