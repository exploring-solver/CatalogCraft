import { Link } from 'react-router-dom';

function Help() {
  return (
    <div className="flex">
      <div className="rounded-xl p-4 border-r-2 border-gray-300 fixed z-20">
        <h2 className="text-xl font-bold mb-4 text-center">Help Page</h2>
        <ul className="space-y-2">
          <li><Link to="#overview" className="text-blue-500 hover:underline">Overview</Link></li>
          <li><Link to="#setup" className="text-blue-500 hover:underline">Setup</Link></li>
          <li><Link to="#workflow" className="text-blue-500 hover:underline">Workflow</Link></li>
          <li><Link to="#authentication" className="text-blue-500 hover:underline">Authentication</Link></li>
          <li><Link to="#create-store" className="text-blue-500 hover:underline">Create Store</Link></li>
          <li><Link to="#manage-store" className="text-blue-500 hover:underline">Manage Store</Link></li>
          <li><Link to="#make-catalogue" className="text-blue-500 hover:underline">Make Catalogue</Link></li>
          <li><Link to="#admin-panel" className="text-blue-500 hover:underline">Admin Panel</Link></li>
          <li><Link to="#dashboard" className="text-blue-500 hover:underline">Analytical Dashboard</Link></li>
          <li><Link to="#database" className="text-blue-500 hover:underline">Database</Link></li>
          <li><Link to="/product-search" className="text-blue-500 hover:underline">Product Search</Link></li>
          <li><Link to="/bulk-data" className="text-blue-500 hover:underline">Bulk Data</Link></li>
          <li><Link to="/my-catalog" className="text-blue-500 hover:underline">My Catalog</Link></li>
        </ul>
      </div>

      <div className="p-8 ml-48 max-w-4xl ">
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

        <section id="product-search" className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Product Search</h2>
          <p>
            Search and list products using existing catalogs. Enable fast digitization through image search.
          </p>
        </section>

        <section id="bulk-data" className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Bulk Data</h2>
          <p>
            Add products in bulk using templates and multi-add features. Use voice and image-based input for efficient catalog digitization.
          </p>
        </section>

        <section id="my-catalog" className="mb-8">
          <h2 className="text-xl font-semibold mb-4">My Catalog</h2>
          <p>
            View and manage your catalogs. Scan UPC barcodes to see products in the database.
          </p>
        </section>
      </div>
    </div>
  );
}

export default Help;
