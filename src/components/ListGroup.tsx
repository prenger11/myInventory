import { Fragment } from "react";

function ListGroup() {
  const items = [
    'Preworkout',
    'Protein',
    'Ammino Acids',
    'Hydration',
    'SARMS'
  ];

  
  
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