import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          {/* Your routes and other components */}
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App; 