import React, { useState, useEffect } from 'react';
import './Dasheboard.css';
import {
     FiHome, 
  FiPackage,
  FiBell,
  FiClipboard,
  FiBarChart2,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiUser,
  FiActivity,
  FiMenu,
  FiChevronLeft
} from 'react-icons/fi';



const Dashboard = ({ onLogout, currentUser = 'Utilisateur' }) => {
  
 
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('dashboardActiveTab') || 'accueil';
  });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Sauvegarder l'onglet actif à chaque changement
  useEffect(() => {
    localStorage.setItem('dashboardActiveTab', activeTab);
  }, [activeTab]);

  const menuItems = [
    { id: 'accueil', icon: <FiHome />, label: 'Accueil', path: '/dashboard' },
    { id: 'medicaments', icon: <FiPackage />, label: 'Portefeuille', path: '/medicaments' },
    { id: 'rappels', icon: <FiBell />, label: 'Alertes', path: '/rappels' },
    { id: 'historique', icon: <FiClipboard />, label: 'Historique', path: '/historique' },
    { id: 'statistiques', icon: <FiBarChart2 />, label: 'Statistiques', path: '/statistiques' },
    { id: 'contacts', icon: <FiUsers />, label: 'Support', path: '/contacts' },
    { id: 'parametres', icon: <FiSettings />, label: 'Paramètres', path: '/parametres' }
  ];
  const handleMenuClick = (itemId) => {
    setActiveTab(itemId);
  };

  return (
    <div className="dashboard-container">
        {/*sidebar*/}
        <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
            <div className="logo">
                <span className="logo-icon"><FiActivity /></span>
                {!sidebarCollapsed && <span className="logo-text">MedReminder</span>}
            </div>
        </div>
        <nav className="sidebar-nav">
            <ul className="nav-list">
                {menuItems.map((item) => (
                    <li key={item.id} className="nav-item">
                        <button
                            className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
                            onClick={() => handleMenuClick(item.id)}
                            title={sidebarCollapsed ? item.label : ''}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            {!sidebarCollapsed && <span className="nav-label">{item.label}</span>}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
        <div className="sidebar-footer">
            <button 
            className="logout-btn"
            onClick={onLogout}
            title={sidebarCollapsed ? t('nav.logout') : ''}
          >
            <span className="logout-icon"><FiLogOut /></span>
            {!sidebarCollapsed && <span>Déconnexion</span>}
          </button>
        </div>
      </aside>

        {/*main content*/}
        <main className="main-content">
            <header className="main-header">
                <div className="header-left">
                    <h1 className="page-title">
                        {menuItems.find(item => item.id === activeTab)?.label || t('nav.home')}
                    </h1>
                    <div className="breadcrumb">{/*fil d'Ariane*/}
              <span>Tableau de bord</span>
              <span className="breadcrumb-separator">›</span>{/*séparateur*/}
              <span>{menuItems.find(item => item.id === activeTab)?.label}</span>
            </div>
          </div>
          <div className="header-right">
            <div className="header-actions">
              <button className="notification-btn">
                🔔
                <span className="notification-badge">3</span>
              </button>
              <div className="current-time">
                {new Date().toLocaleTimeString('fr-FR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          </div>
        </header>

        <div className="content-area">
          <DefaultDashboardContent activeTab={activeTab} />
        </div>
      </main>
    </div>
  );
};


const DefaultDashboardContent = ({ activeTab }) => {
    switch (activeTab) {
        case 'accueil':
            return <AccueilContent />;
        case 'medicaments':
            return <MedicamentsContent />;
        case 'calendrier':
            return <CalendrierContent />;
        case 'rappels':
            return <RappelsContent />;
         case 'historique':
        return <HistoriqueContent />;
      case 'statistiques':
        return <StatistiquesContent />;
      case 'contacts':
        return <ContactsContent />;
      case 'parametres':
        return <ParametresContent />;
      default:
        return <AccueilContent />;
    }
};

const AccueilContent = () => (
  <div className="dashboard-section">
    <h2>Bienvenue à TradingPro</h2>
    <p>Gérez vos investissements et suivez vos portefeuilles en temps réel.</p>
  </div>
);

const MedicamentsContent = () => (
  <div className="dashboard-section">
    <h2>Portefeuille</h2>
    <p>Voir vos positions et vos actifs.</p>
  </div>
);

const CalendrierContent = () => (
  <div className="dashboard-section">
    <h2>Calendrier</h2>
    <p>Consultez les événements importants et les dates d'échéance.</p>
  </div>
);

const RappelsContent = () => (
  <div className="dashboard-section">
    <h2>Alertes</h2>
    <p>Recevez des notifications pour vos positions et vos seuils.</p>
  </div>
);

const HistoriqueContent = () => (
  <div className="dashboard-section">
    <h2>Historique</h2>
    <p>Consultez l'historique de vos transactions et mouvements.</p>
  </div>
);

const StatistiquesContent = () => (
  <div className="dashboard-section">
    <h2>Statistiques</h2>
    <p>Analysez vos performances et tendances d'investissement.</p>
  </div>
);

const ContactsContent = () => {
  return (
    <div className="dashboard-section">
      <h2>Support 🎯</h2>
      <p>Contacter notre équipe d'assistance</p>
    </div>
  );
};

const ParametresContent = () => (
  <div className="dashboard-section">
    <h2>Paramètres</h2>
    <p>Configurer vos préférences et vos paramètres de compte.</p>
  </div>
);

export default Dashboard;