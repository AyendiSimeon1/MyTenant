import React from 'react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentTab, setCurrentTab }) => {
  const tabs = [
    { name: 'Users', key: 'users' },
    { name: 'Properties', key: 'properties' },
    { name: 'Payments', key: 'payments' },
    { name: 'Form Submissions', key: 'form-submissions' }
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white">
      <div className="p-5 font-semibold text-xl">Menu</div>
      <nav>
        <ul>
          {tabs.map((tab) => (
            <li key={tab.key}>
              <button
                onClick={() => setCurrentTab(tab.key)}
                className={`block px-5 py-2 hover:bg-gray-700 ${currentTab === tab.key ? 'bg-gray-700' : ''}`}
              >
                {tab.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
