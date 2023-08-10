import { Fragment } from "react";

function ListGroup() {
  const items = [
    'Preworkout',
    'Protein',
    'Ammino Acids',
    'Hydration',
    'SARMS'
  ];

  if (items.length === 0) 
  return <p>No Item Found</p>
  
  return (
    <Fragment>  
        <h1>List</h1>
      <ul className="list-group">
        {items.map((item) => (
        <li key={item}>{item}</li>
        ))}
      </ul>
      </Fragment>
    )
}

export default ListGroup;