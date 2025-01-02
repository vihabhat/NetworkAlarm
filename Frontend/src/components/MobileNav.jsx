import React from 'react';

const MobileNav = ({ isOpen, children }) => {
  return (
    <>
      {/* Mobile Navigation Menu */}
      <div 
        className={`
          fixed inset-0 z-40 bg-slate-900 transform transition-transform duration-300 ease-in-out lg:hidden
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full pt-16 pb-6 px-4">
          {children}
        </div>
      </div>
    </>
  );
};

export default MobileNav;
