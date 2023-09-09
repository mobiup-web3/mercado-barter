import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const GenericBreadcrumb = ({
  previousPage,
  currentPage
}) => {

  const navigate = useNavigate();

  const handleReturnToHome = () => {
    navigate("/");
  }

  const handleReturnPreviousPage = () => {
    navigate(previousPage.url);
  }

  return (
    <div className="container">
      <Breadcrumb className='py-2'>
        <BreadcrumbItem onClick={handleReturnToHome}><i className="bi bi-house"></i> Home</BreadcrumbItem>
        {previousPage && (
          <BreadcrumbItem onClick={handleReturnPreviousPage}>{previousPage.title}</BreadcrumbItem>
        )}
        <BreadcrumbItem active>{currentPage}</BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
};

export default GenericBreadcrumb;
