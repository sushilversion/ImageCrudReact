import config from 'config';
import { authHeader } from '../_helpers/auth-header';
import { handleResponse } from '../_helpers/handle-response';

export const productService = {
    getAll,
    getById,
    pushRecord,
    getAllPositions,
    getAvailablePositions,
    getAllStatus
};
const imageRecordList=[]

// const imageRecordList=[{ "pos": 1, "title": "Image 1", "status": "Active", "startDate": "12/08/2019", "endDate": "15/08/2019" ,"picture":"Picture 1"},
// { "pos": 2, "title": "Image 2", "status": "Active", "startDate": "12/08/2019", "endDate": "15/08/2019" ,"picture":"Picture 2"},
// { "pos": 3, "title": "Image 3", "status": "Active", "startDate": "12/08/2019", "endDate": "15/08/2019" ,"picture":"Picture 3"},
// { "pos": 4, "title": "Image 4", "status": "Active", "startDate": "12/08/2019", "endDate": "15/08/2019" ,"picture":"Picture 4"},
// { "pos": 5, "title": "Image 5", "status": "Active", "startDate": "12/08/2019", "endDate": "15/08/2019" ,"picture":"Picture 5"}]


const positions = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
    { value: 6, label: 6 },
    { value: 7, label: 7 },
    { value: 8, label: 8 },
    { value: 9, label: 9 },
    { value: 10, label: 10 }

]
const status = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' }

]
function getAllPositions() {
    return positions;
}
function getAvailablePositions() {
    return positions;
}
function getAllStatus() {
    return status;
}

function getAll() {
    // const requestOptions = { method: 'GET', headers: authHeader() };
    // return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
    return imageRecordList;
}
function pushRecord(record) {
    const pos=record.pos;
    //find postoremove=
    //scan value in positions
   const positionvalues= positions.map((item)=>{
        return item.value;
    })
    //console.log(pos,positionvalues.indexOf(pos),positionvalues);
    
   
    positions.splice( positionvalues.indexOf(pos),1);

    imageRecordList.push(record);
    //TODO: api calls for update for records

}

function getById(id) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}