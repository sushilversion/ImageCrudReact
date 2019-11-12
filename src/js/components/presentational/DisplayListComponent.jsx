import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';


const renderTableData = ({ imageList, deleteImageRecord }) => (

  imageList.map((record, index) => {
    const { pos, title, status, startDate, endDate , picture} = record //destructuring
    return (
      <tr key={pos}>
        <td>{pos}</td>
        <td>{title}</td>
        <td>{status}</td>
        <td>{startDate}</td>
        <td>{endDate}</td>
        <td>{picture}</td>

        
        <td>

          <Link to={"/edit"} className="btn btn-primary ml-3">Edit</Link>
          <button className="btn btn-danger ml-3 " onClick={deleteImageRecord}>Delete</button>
        
        </td>
      </tr>
    )
  })
);

const DisplayListComponent = ({ positionAvailable,imageList, deleteImageRecord }) => (
  <div>
    <div className="row">
        {/* <button className="button normal-button" onClick={addImageRecord}></button> */}
        
        {positionAvailable && <Link to={"/create"}  className="btn btn-primary" >Add Record</Link>}

        {/* <Link to='/add-record'>Add Record</Link> */}

        
    </div>

    <div className="row">
      <strong id='title'>Uploaded Items List</strong>
      <table id='uploadedItemsList' className="table">
        <tbody>
          <tr>
            <th key={0}>Position</th>
            <th key={1}>Title</th>
            <th key={2}>Status</th>
            <th key={3}>Start Date</th>
            <th key={4}>End Date</th>
            <th key={5}>Picture</th>
            <th key={6}>Actions</th>
            {/* {renderTableHeader({imageList})} */}
          </tr>

          {renderTableData({ imageList, deleteImageRecord })}
        </tbody>
      </table>
    </div>
  </div>
);


DisplayListComponent.propTypes = {
  positionAvailable:PropTypes.bool.isRequired,
  imageList: PropTypes.arrayOf(PropTypes.exact({
    pos: PropTypes.number,
    title: PropTypes.string,
    status: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    picture: PropTypes.string

  })).isRequired,
  deleteImageRecord: PropTypes.func.isRequired,
};
export default DisplayListComponent;