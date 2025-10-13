import React, { useState } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeNav, setActiveNav] = useState('dashboard');

  const stats = [
    { icon: '👥', value: '1,234', label: 'Total Users' },
    { icon: '📦', value: '567', label: 'Products' },
    { icon: '💰', value: '$12,456', label: 'Revenue' },
    { icon: '📈', value: '89%', label: 'Growth' }
  ];

  const activities = [
    { time: '2 min ago', text: 'New user registered' },
    { time: '5 min ago', text: 'Order #1234 completed' },
    { time: '1 hour ago', text: 'Product updated' }
  ];

  const navItems = [
    { id: 'dashboard', label: '📊 Dashboard' },
    { id: 'users', label: '👥 Users' },
    { id: 'products', label: '📦 Products' },
    { id: 'orders', label: '💰 Orders' },
    { id: 'settings', label: '⚙️ Settings' }
  ];

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <h2>Admin Panel</h2>
        </div>
        <nav className="nav">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeNav === item.id ? 'active' : ''}`}
              onClick={() => setActiveNav(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <div className="header-left">
            <h1>Dashboard</h1>
          </div>
          <div className="header-right">
            <div className="user-menu">
              <span>Admin User</span>
              <div className="avatar">A</div>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-info">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="content-grid">
          <div className="card">
            <h2>Recent Activity</h2>
            <div className="activity-list">
              {activities.map((activity, index) => (
                <div key={index} className="activity-item">
                  <span className="activity-time">{activity.time}</span>
                  <span className="activity-text">{activity.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card">
            <h2>Quick Stats</h2>
            <div className="stats-list">
              <p>Active Users: 892</p>
              <p>Pending Orders: 23</p>
              <p>Low Stock Items: 5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;