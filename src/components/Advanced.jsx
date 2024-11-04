/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import CommandPalette, { filterItems, getItemIndex } from 'react-cmdk';
import 'react-cmdk/dist/cmdk.css';
import { Search, Settings, User, Mail, FileText, Home, Calendar, Bell } from 'lucide-react';

const CommandMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState('root');
  const [pages, setPages] = useState(['root']);

  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Simulated user data
  const userData = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin'
  };

  // Simulated notification data
  const notifications = [
    { id: 1, title: 'New message', description: 'You have a new message from Alice' },
    { id: 2, title: 'Meeting reminder', description: 'Team meeting in 30 minutes' }
  ];

  // Navigate between pages
  const handlePageChange = (newPage) => {
    setPage(newPage);
    if (!pages.includes(newPage)) {
      setPages([...pages, newPage]);
    }
  };

  // Go back to previous page
  const handleBack = () => {
    setPages((currentPages) => {
      const newPages = [...currentPages];
      newPages.pop();
      setPage(newPages[newPages.length - 1]);
      return newPages;
    });
  };

  // Handle command selection
  const handleCommandSelect = (item) => {
    if (item.performAction) {
      item.performAction();
    }
    setIsOpen(false);
  };

  // Custom loading placeholder
  const LoadingPlaceholder = () => (
    <div className="flex items-center justify-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  );

  return (
    <>
      {/* Trigger button */}
      <button
        className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg"
        onClick={() => setIsOpen(true)}
      >
        Press ⌘K
      </button>

      <CommandPalette
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        search={search}
        onSearch={setSearch}
        page={page}
        onPageChange={handlePageChange}
        placeholder="Search for commands..."
        LoadingPlaceholder={LoadingPlaceholder}
      >
        {/* Root Page */}
        <CommandPalette.Page id="root">
          {/* Quick Actions Group */}
          <CommandPalette.List heading="Quick Actions">
            <CommandPalette.Item
              icon={<Home />}
              children="Go to Dashboard"
              closeOnSelect
              onSelect={() => {
                // Handle navigation
                console.log('Navigating to dashboard');
              }}
            />
            
            <CommandPalette.Item
              icon={<Settings />}
              children="Open Settings"
              closeOnSelect
              onSelect={() => handlePageChange('settings')}
            />

            <CommandPalette.Item
              icon={<Bell />}
              children="View Notifications"
              closeOnSelect
              onSelect={() => handlePageChange('notifications')}
            />
          </CommandPalette.List>

          {/* Navigation Group */}
          <CommandPalette.List heading="Navigation">
            <CommandPalette.Item
              icon={<Calendar />}
              children="Calendar"
              shortcut="C"
              onSelect={() => {
                console.log('Opening calendar');
              }}
            />

            <CommandPalette.Item
              icon={<Mail />}
              children="Messages"
              shortcut="M"
              onSelect={() => handlePageChange('messages')}
            />

            <CommandPalette.Item
              icon={<FileText />}
              children="Documents"
              shortcut="D"
              onSelect={() => handlePageChange('documents')}
            />
          </CommandPalette.List>

          {/* User Actions Group */}
          <CommandPalette.List heading="User">
            <CommandPalette.Item
              icon={<User />}
              children="Profile Settings"
              onSelect={() => handlePageChange('profile')}
            />

            <CommandPalette.Item
              icon={<User />}
              children="Sign Out"
              closeOnSelect
              onSelect={() => {
                console.log('Signing out...');
              }}
            />
          </CommandPalette.List>
        </CommandPalette.Page>

        {/* Settings Page */}
        <CommandPalette.Page id="settings" onBack={handleBack}>
          <CommandPalette.List heading="Settings">
            <CommandPalette.Item
              children="General Settings"
              onSelect={() => {
                console.log('Opening general settings');
              }}
            />
            <CommandPalette.Item
              children="Security Settings"
              onSelect={() => {
                console.log('Opening security settings');
              }}
            />
            <CommandPalette.Item
              children="Notification Preferences"
              onSelect={() => {
                console.log('Opening notification settings');
              }}
            />
          </CommandPalette.List>
        </CommandPalette.Page>

        {/* Profile Page */}
        <CommandPalette.Page id="profile" onBack={handleBack}>
          <CommandPalette.List heading="Profile">
            <CommandPalette.Item
              children={`Name: ${userData.name}`}
              closeOnSelect={false}
            />
            <CommandPalette.Item
              children={`Email: ${userData.email}`}
              closeOnSelect={false}
            />
            <CommandPalette.Item
              children={`Role: ${userData.role}`}
              closeOnSelect={false}
            />
            <CommandPalette.Item
              children="Edit Profile"
              onSelect={() => {
                console.log('Editing profile');
              }}
            />
          </CommandPalette.List>
        </CommandPalette.Page>

        {/* Notifications Page */}
        <CommandPalette.Page id="notifications" onBack={handleBack}>
          <CommandPalette.List heading="Recent Notifications">
            {notifications.map((notification) => (
              <CommandPalette.Item
                key={notification.id}
                children={notification.title}
                subtitle={notification.description}
                onSelect={() => {
                  console.log(`Opening notification: ${notification.title}`);
                }}
              />
            ))}
          </CommandPalette.List>
        </CommandPalette.Page>

        {/* Empty State */}
        <CommandPalette.Empty>No results found.</CommandPalette.Empty>
      </CommandPalette>
    </>
  );
};

export default CommandMenu;