import { useEffect, useState } from 'react';

export default function ArticleFilterByCategory() {
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState("");
  const [filteredArticle, setFilteredArticle] = useState([]);
  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  const fetchArticles = async () => {
  try {
    const res = await axios.get('http://localhost:5000/articles');
    setArticles(res.data);
  } catch (err) {
    console.error("Error fetching articles:", err);
  }
};

const fetchCategories = async () => {
  try {
    const res = await axios.get('http://localhost:5000/categories');
    setCategories(res.data);
  } catch (err) {
    console.error("Error fetching categories:", err);
  }
};

const handleFilter = () => {
  const selectedArticle = articles.filter((e) => 
    e.categoryId.toString() === selected
  )
  setFilteredArticle(selectedArticle);
}

const handleReset = () => {
  setSelected("");
  setFilteredArticle(articles);
}

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select id="categoryFilter" value={selected} onChange={(e) => setSelected(e.target.value)}>
          <option value="">All Categories</option>
          {/* Options for categories */
            categories.map((c) => (
                <option key={c.id} value={c.id} >{c.name}</option>
             ) )
          }
        </select>

        <button
          onClick= {
            // Logic to apply filters
            handleFilter
          }
        >Apply Filters</button>
        <button
          onClick=
            // Logic to reset filters
            {handleReset}
         
        >Reset Filters</button>
      </div>

      <ul>
        {filteredArticle.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>By Journalist #{article.journalistId} | Category #{article.categoryId}</small><br />
            <button disabled>Delete</button>
            <button disabled>Update</button>
            <button disabled>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}