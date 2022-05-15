import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavLink } from 'reactstrap';
import { IoIosStats } from 'react-icons/io';
import { IoIosHome } from 'react-icons/io';
import { MdPerson } from 'react-icons/md';
import { FaNewspaper } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaRoad } from 'react-icons/fa';
import { FaCar } from 'react-icons/fa';
import '../design/App.css';

const Navigation = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <Navbar color="dark" dark expand="md" className="nav-bar">
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav expand="sm" navbar>
          <NavLink href="/">
            <IoIosHome /> Domov
          </NavLink>
          <NavLink href="/zemljevid">
            <FaMapMarkerAlt />
            Zemljevid
          </NavLink>
          <NavLink href="/statistika">
            <IoIosStats /> Statistika
          </NavLink>
          <NavLink href="/prometnenovice">
            <FaNewspaper /> Novice
          </NavLink>
          <NavLink href="/stanjenacestah">
            <FaRoad /> Stanje na cestah
          </NavLink>
          <NavLink href="/napovedi">
            <FaCar /> Napovedi prometa
          </NavLink>
          <NavLink href="/onas">
            <MdPerson /> O nas
          </NavLink>
        </Nav>
      </Collapse>
    </Navbar>
  );
};
export default Navigation;
/*
<div className="nav-div">
                <Navbar expand="sm" className="nav-bar">
                        <NavLink href="/"><IoIosHome/> Domov </NavLink>
                        <NavLink href="/zemljevid"><FaMapMarkerAlt/>Zemljevid </NavLink>
                        <NavLink href="/statistika"> <IoIosStats/> Statistika</NavLink>
                        <NavLink href="/prometnenovice"> <FaNewspaper/> Novice</NavLink>
                        <NavLink href="/stanjenacestah"> <FaRoad/> Stanje na cestah</NavLink>
                        <NavLink href="/napovedi"> <FaCar/> Napovedi prometa</NavLink>
                        <NavLink href="/onas"><MdPerson/> O nas</NavLink>
                </Navbar>
            </div>*/
