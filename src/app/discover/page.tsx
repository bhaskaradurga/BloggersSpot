import React from 'react';

const DiscoverPage = () => {
  return (
    <div className="flex">
      <aside className="sidebar">
        <div className="p-6">
          <h2 className="text-xl font-bold">Perplexity</h2>
        </div>
        <nav className="flex flex-col p-4">
          <a href="#" className="py-2 px-4 rounded-lg hover:bg-gray-200">Home</a>
          <a href="#" className="py-2 px-4 rounded-lg hover:bg-gray-200">Discover</a>
          <a href="#" className="py-2 px-4 rounded-lg hover:bg-gray-200">Library</a>
        </nav>
      </aside>
      <main className="main-content">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl">Discover</h1>
          <button className="button-primary">
            New Thread
          </button>
        </header>
        <div className="section">
          <h2 className="text-2xl mb-4">Trending</h2>
          <p>This is where trending content will be displayed.</p>
        </div>
        <div className="section">
          <h2 className="text-2xl mb-4">For You</h2>
          <p>This is where personalized content will be displayed.</p>
        </div>
        <div className="section">
          <h2 className="text-2xl mb-4">Search</h2>
          <input type="text" placeholder="Search..." className="w-full" />
        </div>
      </main>
    </div>
  );
};

export default DiscoverPage;