import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Page: React.FC = ({ children }) => {
    return <section className="page">{children}</section>;
};
Page.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
export default Page;
