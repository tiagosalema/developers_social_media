import React from 'react';
import { Link } from 'react-router-dom';

const Data = ({ label, data, deleteItem }) => {
  if (data.length === 0) return null;
  return (
    <>
      <h3>{label}</h3>
      <div className='table'>
        <div className='row row-main'>
          {Object.keys(data[0]).map(title => {
            if (title === '_id') return null;
            else if (title === 'current') return null;
            return <p key={title}>{title}</p>;
          })}
        </div>
        {data.map(experience => {
          const id = experience._id;
          return (
            <div className='row' key={id}>
              <div className='row-content'>
                {Object.entries(experience).map(([key, value]) => {
                  if (key === '_id' || !value) return null;
                  else if (key === 'to' || key === 'from')
                    return (
                      <span key={key + value}>
                        {new Intl.DateTimeFormat().format(new Date(value))}
                      </span>
                    );
                  return <span key={key + value}>{value}</span>;
                })}
              </div>
              <Link className='btn btn-red' to='#!' onClick={() => deleteItem(id)}>
                Delete
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Data;
