import React from 'react';
import { useParams } from 'react-router-dom';

// ItemDetail component displays details for a specific item based on its ID
const ItemDetail = () => {
  //Retrieves the dynamic "id" parameter from the URL
  const { id } = useParams();

  return (
    <div>
      <h1>Item Detail for Item ID: {id}</h1>
    </div>
  );
};

export default ItemDetail;
