import { useEffect, useState } from 'react';

export default function ArticleFilter() {
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectCategory] = useState("");
  const [selectedJournal, setSelectedJournal] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);
  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchJournalists();
    fetchCategories();
  }, []);

  const fetchArticles = async () => {
    // Fetch articles from the API
    axios.get('http://localhost:5000/articles')
    .then(res => setArticles(res.data))
    .catch((err) => {console.log(err);});
      
  };

  const fetchJournalists = async () => {
    // Fetch journalists from the API
    axios.get('http://localhost:5000/journalists')
    .then(res => setJournalists(res.data))
    .catch((err) => {console.log(err);});
  };

  const fetchCategories = async () => {
    // Fetch categories from the API
    axios.get('http://localhost:5000/categories')
    .then(res => setCategories(res.data))
    .catch((err) => {console.log(err);});
  }

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label htmlFor="journalistFilter">Filter by Journalist:</label>
        <select id="journalistFilter" value={selectedJournal} onChange = {(e) => setSelectedJournal(e.target.value)  }>
          <option value="">All Journalists</option>
          {/* Options for journalists */
          journalists.map((j) => (
            <option key={j.journalistId} value={j.journalistId}> {j.name} </option>
          ))
          }
        </select>

        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select id="categoryFilter" value={selectedCategory} onChange={(e) => setSelectCategory(e.target.value)}>
          <option value="">All Categories</option>
          {/* Options for categories */
          categories.map((j) => (
            <option key={j.categoryId} value={j.categoryId}> {j.name} </option>
          ))
          }
        </select>

        <button
          onClick={() => {
            // Logic to apply filters
            const filtered = articles.filter( (a) =>
              selectedCategor === a.categoryIdy.toString() && selectedJournal === a.journalistId.toString()
            )
            setFilteredArticles(filtered);
          }}
        >Apply Filters</button>
        <button
          onClick={() => {
            // Logic to reset filters
            setFilteredArticles(articles);
            setSelectedCategory("");
            setSelectedJournal("");
          }}
        >Reset Filters</button>
      </div>

      <ul>
        {filteredArticles.map(article => (
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