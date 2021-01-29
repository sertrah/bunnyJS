import React from "react";
import PropTypes from "prop-types";
import { NavLink, Link } from "react-router-dom";

const baseClass = "hg-header";

function NavBar({ menu }) {
  return (
    <nav className="hg-menu-list__container">
      {menu.map(({ title, path, permission, onClick }) => (
        <SimpleNavLink key={title} onClick={onClick} to={path}>
          {title}
        </SimpleNavLink>
      ))}
    </nav>
  );
}

function SimpleNavLink({ to, onClick, className, children }) {
  return to ? (
    <NavLink
      to={to}
      className={className}
      activeClassName="hg-menu-item__active"
      exact
    >
      {children}
    </NavLink>
  ) : (
    <p>PERRITO</p>
  );
}

const PageHeader = ({ unfixed, isPublic, children }) => (
  <header className={baseClass}>{children}</header>
);

PageHeader.propTypes = {
  children: PropTypes.node.isRequired,
  isPublic: PropTypes.bool,
};

PageHeader.defaultProps = {
  isPublic: false,
};

function Header({ menu }) {
  return (
    <PageHeader>
      <Link to="/" className="hg-header__logo">
        Bunny
      </Link>
      <NavBar menu={menu} />
    </PageHeader>
  );
}

export default Header;
