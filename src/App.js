import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmailForm from './Components/email';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<EmailForm />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
