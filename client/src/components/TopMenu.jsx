import  axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TopMenu = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/catalogue/categories/')
      .then(response => {
        setCategories(response.data.categories);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-0">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          CatalogCraft- Catalog Digitization with Ease
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <button
                className="btn nav-link dropdown-toggle fw-bold"
                id="navbarDropdown"
                data-toggle="dropdown"
                aria-expanded="false"
                data-bs-toggle="dropdown"
              >
                All Catalogues
              </button>
              {/* <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link className="dropdown-item" to="/account/signin">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/account/signup">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="/checkout">
                    Checkout Page
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/contact-us">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/blog">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/blog/detail">
                    Blog Detail
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="/fsafasf">
                    404 Page Not Found
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/500">
                    500 Internal Server Error
                  </Link>
                </li>
              </ul> */}
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {categories.map((category, index) => (
                  <li key={index}>
                    <p className="dropdown-item">{category}</p>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category">
                Standardized Catalogues
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category">
                Non Standardized Catalogues
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/category">
                Electronics
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category">
                Furniture
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category">
                Garden & Outdoors
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category">
                Jewellery
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/documentation">
                Documentation
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default TopMenu;
