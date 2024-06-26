import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {categories} from '../constants/index'

function Navbar() {

  const close = useRef();
  const navigate = useNavigate();

  const [query, setquery] = useState("")

  const handleChange = (e) => {
    setquery(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${query}`)
    close.current.click()
  }

  return (
    <>
      <nav className="navbar navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">sk-news-app</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">sk-news-app</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close" ref={close}></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">Home</a>
                </li>
                
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Categories
                  </a>
                  <ul className="dropdown-menu dropdown-menu-dark">
                    {
                      categories.map((e) => {
                        if (e === "RealEstate") {
                          return <li key={e}><a className="dropdown-item" href={`/categories/${e.toLowerCase()}`}>Real Estate</a></li>
                        }
                        else if (e === "Sundayreview") {
                          return <li key={e}><a className="dropdown-item" href={`/categories/${e.toLowerCase()}`}>Sunday Opinion</a></li>
                        }
                        return <li key={e}><a className="dropdown-item" href={`/categories/${e.toLowerCase()}`}>{e}</a></li>
                      })
                    }
                  </ul>
                </li>
              </ul>
              <form className="d-flex mt-3" role="search" onSubmit={handleSubmit}>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" name='search' onChange={handleChange} />
                <button className="btn btn-success" type="submit">Search</button>
              </form>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar