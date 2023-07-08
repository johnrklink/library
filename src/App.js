import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [snippets, setSnippets] = useState([]);
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('');

  useEffect(() => {
    // Load snippets from local storage when the component mounts
    const storedSnippets = JSON.parse(localStorage.getItem('snippets'));
    if (storedSnippets) {
      setSnippets(storedSnippets);
    }
  }, []);

  useEffect(() => {
    // Update local storage when snippets change
    localStorage.setItem('snippets', JSON.stringify(snippets));
  }, [snippets]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate a unique ID for the new snippet
    const id = Date.now();

    // Create a new snippet object
    const newSnippet = {
      id,
      title,
      code,
      language,
    };

    // Add the new snippet to the existing snippets array
    setSnippets([...snippets, newSnippet]);

    // Clear the input fields
    setTitle('');
    setCode('');
    setLanguage('');
  };

  return (
    <div>
      <h1>Code Snippet Library</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          required
        />

        <label htmlFor="code">Code:</label>
        <textarea
          id="code"
          value={code}
          onChange={handleCodeChange}
          required
        />

        <label htmlFor="language">Language:</label>
        <input
          type="text"
          id="language"
          value={language}
          onChange={handleLanguageChange}
          required
        />

        <button type="submit">Add Snippet</button>
      </form>

      <h2>Snippet Library</h2>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Code</th>
            <th>Language</th>
          </tr>
        </thead>
        <tbody>
          {snippets.map((snippet) => (
            <tr key={snippet.id}>
              <td>{snippet.title}</td>
              <td>{snippet.code}</td>
              <td>{snippet.language}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
