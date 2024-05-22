import React from 'react';

function Help() {
  return (
    <div className="flex">
      <div className="rounded-xl p-4 border-r-2 border-gray-300 fixed z-20">
        <h2 className="text-xl font-bold mb-4 text-center">Help Page</h2>
        <ul className="space-y-2">
          <li><a href="#overview" className="text-blue-500 hover:underline">Overview</a></li>
          <li><a href="#setup" className="text-blue-500 hover:underline">Setup</a></li>
          <li><a href="#workflow" className="text-blue-500 hover:underline">Workflow</a></li>
          <li><a href="#authentication" className="text-blue-500 hover:underline">Authentication</a></li>
          <li><a href="#create-store" className="text-blue-500 hover:underline">Create Store</a></li>
          <li><a href="#manage-store" className="text-blue-500 hover:underline">Manage Store</a></li>
          <li><a href="#make-catalogue" className="text-blue-500 hover:underline">Make Catalogue</a></li>
          <li><a href="#admin-panel" className="text-blue-500 hover:underline">Admin Panel</a></li>
          <li><a href="#dashboard" className="text-blue-500 hover:underline">Analytical Dashboard</a></li>
          <li><a href="#database" className="text-blue-500 hover:underline">Database</a></li>
        </ul>
      </div>

      <div className="p-8 ml-40">
        <h1 className="text-2xl font-bold mb-6">Get Started</h1>

        <section id="overview" className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Overview</h2>
          <p>
            Welcome to the Catalogue Craft help page. This guide will walk you through the steps to run the website, set up your store, manage your catalogue, and utilize the admin panel and analytical dashboard effectively.
          </p>
        </section>

        <section id="setup" className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Setup</h2>
          <p>To get started, follow these steps:</p>
          <ol className="list-decimal list-inside">
            <li>Download the app from the official website or app store.</li>
            <li>Install the app on your device.</li>
            <li>Open the app and create a seller account.</li>
          </ol>
        </section>

        <section id="workflow" className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Workflow</h2>
          <img className='w-1/2' src="./src/assets/workflow.jpg" alt="wf" srcset="" />
        </section>

        <section id="authentication" className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Authentication</h2>
          <p>
            After installing the app, authenticate by providing your credentials. This ensures that only authorized users can access and manage their store.
          </p>
        </section>

        <section id="create-store" className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Create Your Store</h2>
          <p>
            Once authenticated, you can create your store by providing the necessary details such as store name, address, and contact information.
          </p>
        </section>

        <section id="manage-store" className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Manage Store</h2>
          <p>
            Use the app to manage your store. You can add new products, update existing ones, and keep track of inventory.
          </p>
        </section>

        <section id="make-catalogue" className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Make Catalogue</h2>
          <p>
            Create your product catalogue using images to standardize items. You can also add products using voice input and match them to the master catalogue for consistency.
          </p>
        </section>

        <section id="admin-panel" className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Admin Panel</h2>
          <p>
            The admin panel allows for efficient management of all stores and ensures that they are mapped to the master catalogue.
          </p>
        </section>

        <section id="dashboard" className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Analytical Dashboard</h2>
          <p>
            The analytical dashboard provides store statistics and insights, helping you make informed decisions based on data.
          </p>
        </section>

        <section id="database" className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Database</h2>
          <p>
            All store data is stored securely in the database. The database allows for CRUD (Create, Read, Update, Delete) operations and efficient data fetching.
          </p>
        </section>
      </div>
    </div>
  );
}

export default Help;
