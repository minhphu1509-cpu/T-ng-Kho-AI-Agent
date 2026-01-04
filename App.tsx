
import React, { useState, Suspense, lazy } from 'react';
import { AppProvider, useApp } from './contexts/AppContext.tsx';
import { Layout } from './components/Layout.tsx';
import { ToastContainer } from './components/Toast.tsx';

// Pre-loading important components
import { Welcome } from './pages/Welcome.tsx';
import { Marketplace } from './pages/Marketplace.tsx';

// Lazy loading secondary components for optimization
const Workspace = lazy(() => import('./pages/Workspace.tsx').then(m => ({ default: m.Workspace })));
const CreatorStudio = lazy(() => import('./pages/CreatorStudio.tsx').then(m => ({ default: m.CreatorStudio })));
const Settings = lazy(() => import('./pages/Settings.tsx').then(m => ({ default: m.Settings })));
const Analytics = lazy(() => import('./pages/Analytics.tsx').then(m => ({ default: m.Analytics })));
const SupportInfo = lazy(() => import('./pages/SupportInfo.tsx').then(m => ({ default: m.SupportInfo })));
const TopUpModal = lazy(() => import('./components/TopUpModal.tsx').then(m => ({ default: m.TopUpModal })));

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-12">
    <div className="animate-spin h-8 w-8 border-4 border-luxury-accent border-t-transparent rounded-full"></div>
  </div>
);

const AppContent: React.FC = () => {
  const { isAuthenticated, isTopUpOpen } = useApp();
  const [activeTab, setActiveTab] = useState('marketplace');

  if (!isAuthenticated) {
    return <Welcome />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'marketplace':
        return <Marketplace onInstall={() => setActiveTab('workspace')} />;
      case 'workspace':
        return <Workspace />;
      case 'creator':
        return <CreatorStudio />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      case 'support':
        return <SupportInfo />;
      default:
        return <Marketplace onInstall={() => setActiveTab('workspace')} />;
    }
  };

  return (
    <>
      <Layout activeTab={activeTab} onTabChange={setActiveTab}>
        <Suspense fallback={<LoadingSpinner />}>
          {renderContent()}
        </Suspense>
      </Layout>
      <ToastContainer />
      <Suspense fallback={null}>
        {isTopUpOpen && <TopUpModal />}
      </Suspense>
    </>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
