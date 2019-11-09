import React from 'react';

import { userService } from '../../_services/user.service';
import { authenticationService } from '../../_services/authentication.service';
import UploadsComponent from "../presentational/UploadsComponent.jsx";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: authenticationService.currentUserValue,
      userFromApi: null,
      imageRecordList:[{ "pos": 1, "title": "Image 1", "status": "Active", "startDate": "12/08/2019", "endDate": "15/08/2019" },
      { "pos": 2, "title": "Image 2", "status": "Active", "startDate": "12/08/2019", "endDate": "15/08/2019" },
      { "pos": 3, "title": "Image 3", "status": "Active", "startDate": "12/08/2019", "endDate": "15/08/2019" },
      { "pos": 4, "title": "Image 4", "status": "Active", "startDate": "12/08/2019", "endDate": "15/08/2019" },
      { "pos": 5, "title": "Image 5", "status": "Active", "startDate": "12/08/2019", "endDate": "15/08/2019" }]
    };
    this.deleteImageRecord = this.deleteImageRecord.bind(this);
    this.editImageRecord = this.editImageRecord.bind(this);


  }

  deleteImageRecord(event) {
    console.log(event);
    

  }
  editImageRecord(event) {
    console.log(event);

  }


  componentDidMount() {
    const { currentUser } = this.state;
    userService.getById(currentUser.id).then(userFromApi => this.setState({ userFromApi }));
  }

  render() {
    const { currentUser, userFromApi } = this.state;
    return (
      <div>
        <p>Your role is: <strong>{currentUser.role}</strong>.</p>

        <UploadsComponent
          imageList={this.state.imageRecordList}
          editImageRecord={this.state.editImageRecord}
          deleteImageRecord= {this.state.deleteImageRecord}
        />
      </div>

    );
  }
}

export { Dashboard };