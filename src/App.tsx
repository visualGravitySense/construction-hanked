import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppTheme from './components/shared-theme/AppTheme';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Tenders from './pages/Tenders';
import Profiles from './pages/Profiles';
import Notifications from './pages/Notifications';
import Monitoring from './pages/Monitoring';
import Settings from './pages/Settings';
import Architecture from './pages/Architecture';
import './App.css';

function App() {
  return (
    <AppTheme>
      <BrowserRouter basename="/construction-hanked">
        <MainLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tenders" element={<Tenders />} />
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/monitoring" element={<Monitoring />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/architecture" element={<Architecture />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </AppTheme>
  );
}

export default App;
