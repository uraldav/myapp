import React from 'react';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div>Главная <Link to="/auth">Auth</Link></div>
  );
}

export default App;
