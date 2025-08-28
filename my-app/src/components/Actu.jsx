import { useEffect, useState } from "react";
import axios from "axios";

export default function Actu({ theme }) {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/articles")
      .then(res => setNews(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className={`${theme === 'dark' ? 'bg-dark' : 'bg-light'} p-4`}>
  {news.slice(0, 3).map((article, i) => (
    <div
      key={i}
      className={`${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-gray-900'} flex flex-col sm:flex-row rounded-xl shadow-md overflow-hidden mb-4 hover:shadow-lg transition-shadow`}
    >
      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className=" object-cover flex-shrink-0"
          style={{ width: '250px', height: '150px' }}
        />
      )}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold line-clamp-2">{article.title}</h3>
          <p className="text-sm line-clamp-3 mt-2">{article.description}</p>
        </div>
        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`${theme === 'dark' ? 'text-blue-400 hover:text-blue-500' : 'text-blue-600 hover:text-blue-700'} text-sm mt-2 inline-block`}
        >
          Lire plus →
        </a>
      </div>
    </div>
  ))}
</div>

  );
}
