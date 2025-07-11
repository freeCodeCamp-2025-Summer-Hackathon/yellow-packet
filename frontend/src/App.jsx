import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import SignIn from './pages/SignIn';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<div>Welcome to the Home Page! Navigate to /signin or /signup</div>} />
      </Routes>
    </Router>
  );
}

export default App;