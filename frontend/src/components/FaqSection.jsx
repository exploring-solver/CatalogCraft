import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";
import useMeasure from "react-use-measure";

const BasicFAQ = () => {
  return (
    <div className="px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h3 className="mb-4 text-center text-3xl font-semibold">
          FAQ Section
        </h3>
        {/* <Question title="faq 1" defaultOpen>
          <p>
            kuch likhdo
          </p>
        </Question> */}
        <Question title="how to get started?">
          <p>
            To get started, follow these steps:
            <ol className="list-decimal list-inside">
              <li>Download the app from the official website or app store.</li>
              <li>Install the app on your device.</li>
              <li>Open the app and create a seller account.</li>
            </ol>
          </p>
        </Question>
        <Question title="tell about workflow?">
          <p>
            <strong>Authentication:</strong> After installing the app, authenticate by providing your credentials. This ensures that only authorized users can access and manage their store.
          </p>
          <p>
            <strong>Create Your Store:</strong> Once authenticated, you can create your store by providing the necessary details such as store name, address, and contact information.
          </p>
          <p>
            <strong>Manage Store:</strong> Use the app to manage your store. You can add new products, update existing ones, and keep track of inventory.
          </p>
          <p>
            <strong>Make Catalogue:</strong> Create your product catalogue using images to standardize items. You can also add products using voice input and match them to the master catalogue for consistency.
          </p>
          <p>
            <strong>Admin Panel:</strong> The admin panel allows for efficient management of all stores and ensures that they are mapped to the master catalogue.
          </p>
          <p>
            <strong>Analytical Dashboard:</strong> The analytical dashboard provides store statistics and insights, helping you make informed decisions based on data.
          </p>
          <p>
            <strong>Database:</strong> All store data is stored securely in the database. The database allows for CRUD (Create, Read, Update, Delete) operations and efficient data fetching.
          </p>
        </Question>
      </div>
    </div>
  );
};

const Question = ({ title, children, defaultOpen = false }) => {
  const [ref, { height }] = useMeasure();
  const [open, setOpen] = useState(defaultOpen);

  return (
    <motion.div
      animate={open ? "open" : "closed"}
      className="border-b-[1px] border-b-slate-300"
    >
      <button
        onClick={() => setOpen((pv) => !pv)}
        className="flex w-full items-center justify-between gap-4 py-6"
      >
        <motion.span
          variants={{
            open: {
              color: "#181818",
            },
            closed: {
              color: "rgba(3, 6, 23, 1)",
            },
          }}
          className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-left text-lg font-medium"
        >
          {title}
        </motion.span>
        <motion.span
          variants={{
            open: {
              rotate: "180deg",
              color: "rgb(124 58 237)",
            },
            closed: {
              rotate: "0deg",
              color: "#030617",
            },
          }}
        >
          <FiChevronDown className="text-2xl" />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: open ? height : "0px",
          marginBottom: open ? "24px" : "0px",
        }}
        className="overflow-hidden text-slate-600"
      >
        <div ref={ref}>{children}</div>
      </motion.div>
    </motion.div>
  );
};

export default BasicFAQ;
