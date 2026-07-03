//
//  This repository shall:
//  - Connect to the database (using the pool provided by the database.js)
// -  Perfrom the SQL querries to implement the bellow API
//
import { pool } from "../utils/database.js";

// Get all articles
export async function getArticles() {
    // TODO
    const [rows] = await pool.query(`
        SELECT articles.*, journalists.name AS journalist_name
        FROM articles
        LEFT JOIN journalists ON articles.journalist_id = journalists.id
    `);
    return rows;
}

// Get one article by ID
export async function getArticleById(id) {
    // TODO
    const [rows] = await pool.query(
        `SELECT articles.*, journalists.name AS journalist_name
         FROM articles
         LEFT JOIN journalists ON articles.journalist_id = journalists.id
         WHERE articles.id = ?`,
        [id]
    );
    return rows[0];
}

// Create a new article
export async function createArticle(article) {
    // TODO
    const { title, content, journalist_id, category } = article;
    const [rows] = await pool.query(
        "INSERT INTO articles (title, content, journalist_id, category) VALUES (?, ?, ?, ?)",
        [title, content, journalist_id, category]
    );
    return rows.insertId;
}

// Update an article by ID
export async function updateArticle(id, updatedData) {
    // TODO
    const { title, content, journalist_id, category } = updatedData;
    const [rows] = await pool.query(
        "UPDATE articles SET title = ?, content = ?, journalist_id = ?, category = ? WHERE id = ?",
        [title, content, journalist_id, category, id]
    );
    return rows.affectedRows > 0;

}

// Delete an article by ID
export async function deleteArticle(id) {
    // TODO
    const [rows] = await pool.query("DELETE FROM articles WHERE id = ?", [id]);
    return rows.affectedRows > 0;
}

export async function fetchArticlesWithId(id) {
    const [rows] = await pool.query(
        `SELECT articles.*, journalists.name AS journalist_name 
         FROM articles 
         LEFT JOIN journalists ON articles.journalist_id = journalists.id 
         WHERE articles.id = ?`, 
        [id]
    );
    
    // Return the first row found (or undefined if no article exists)
    return rows[0]; 
}

export async function fetchAllArticleByJournalist(id){
    const [rows] = await pool.query(`
        SELECT articles.*, journalists.name AS journalist_name 
        FROM articles 
    LEFT JOIN journalists ON articles.journalist_id = journalists.id 
        WHERE journalists.id = ?`, [id])
        return rows;
}

