import React from "react";
import PropTypes from "prop-types";


  // const renderTableHeader= ({ imageList}) => (

  // Object.keys(imageList[0]).map((key, index) => {
  //    return <th key={index}>{key.toUpperCase()}</th>
  // })
  // );

  const renderTableData= ({ imageList, editImageRecord,deleteImageRecord }) => (

   imageList.map((record, index) => {
     const { pos, title, status, startDate,endDate } = record //destructuring
     return (
        <tr key={pos}>
           <td>{pos}</td>
           <td>{title}</td>
           <td>{status}</td>
           <td>{startDate}</td>
           <td>{endDate}</td>
           <td>
             
              <button className="button muted-button" onClick={editImageRecord}>Edit</button>
              <button className="button muted-button" onClick={deleteImageRecord}>Delete</button>
            </td>
        </tr>
     )
  })
  );

const UploadsComponent= ({ imageList, editImageRecord,deleteImageRecord }) => (
   <div>
            <strong id='title'>Uploaded Items List</strong>
            <table id='students'>
               <tbody>
                  <tr>
                  <th key={0}>Position</th>
                  <th key={1}>Title</th>
                  <th key={2}>Status</th>
                  <th key={3}>Start Date</th>
                  <th key={4}>End Date</th>
                  <th key={5}>Actions</th>
                  {/* {renderTableHeader({imageList})} */}
                  </tr>
                  
                  {renderTableData({imageList})}
               </tbody>
            </table>
         </div>
);


UploadsComponent.propTypes = {
    imageList: PropTypes.arrayOf(PropTypes.exact({
        pos: PropTypes.number,
        title: PropTypes.string,
        status: PropTypes.string,
        startDate:PropTypes.string,
        endDate: PropTypes.string

    })).isRequired,
    editImageRecord: PropTypes.func.isRequired,
    deleteImageRecord: PropTypes.func.isRequired
};
export default UploadsComponent;