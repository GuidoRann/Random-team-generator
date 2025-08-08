import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Landing } from './Landing';
import GeneratorPage from './pages/GeneratorPage';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/generator" element={<GeneratorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
