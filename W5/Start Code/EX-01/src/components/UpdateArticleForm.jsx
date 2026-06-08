import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';



export default function UpdateArticleForm() {
  const [form, setForm] = useState({
    title: '',
    content: '',
    journalistId: '',
    categoryId: '',
  });

  const { id } = useParams();


  // Fetch to prefill a form and update an existing article
  useEffect(() => {

    axios.get(`http://localhost:5000/articles/${id}`)
    .then((res) => {
      const {title, content, journalistId, categoryId} = res.data;
      setForm({
        title: title || '',
	          content: content || '',
	          journalistId: journalistId || '',
	          categoryId: categoryId || '',

      })
    })
    .catch((err) => {console.log(err);})
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Update article with axios
    const updatedData = {
      title: form.title,
      content: form.content,
      journalistId: Number(form.journalistId),
      categoryId: Number(form.categoryId),
    };

    axios.put(`http://localhost:5000/articles/${id}`, updatedData)
     .then(() => {
        alert('Article updated successfully!');
        
      })
      .catch(err => {
        console.error(err);
        alert('Failed to update article.');
      });

  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Article</h3>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required /><br />
      <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content" required /><br />
      <input name="journalistId" value={form.journalistId} onChange={handleChange} placeholder="Journalist ID" required /><br />
      <input name="categoryId" value={form.categoryId} onChange={handleChange} placeholder="Category ID" required /><br />
      <button type="submit">Update</button>
    </form>
  );
}
