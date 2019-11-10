import React from 'react';

import { userService } from '../../_services/user.service';
import { authenticationService } from '../../_services/authentication.service';
import DisplayListComponent from "../presentational/DisplayListComponent.jsx";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: authenticationService.currentUserValue,
      openAddRoute:false,
      userFromApi: null,
      imageRecordList:[{ "pos": 1, "title": "Image 1", "status": "Active", "startDate": "12/08/2019", "endDate": "15/08/2019" },
      { "pos": 2, "title": "Image 2", "status": "Active", "startDate": "12/08/2019", "endDate": "15/08/2019" },
      { "pos": 3, "title": "Image 3", "status": "Active", "startDate": "12/08/2019", "endDate": "15/08/2019" },
      { "pos": 4, "title": "Image 4", "status": "Active", "startDate": "12/08/2019", "endDate": "15/08/2019" },
      { "pos": 5, "title": "Image 5", "status": "Active", "startDate": "12/08/2019", "endDate": "15/08/2019" }]
    };
    this.deleteImageRecord = this.deleteImageRecord.bind(this);
    this.editImageRecord = this.editImageRecord.bind(this);
    this.addImageRecord = this.addImageRecord.bind(this);


  }

  deleteImageRecord(event) {
    console.log(event);
    

  }
  editImageRecord(event) {
    console.log(event);

  }

  addImageRecord(event) {
    console.log('Add Image Invoked');
    
    console.log(event);

    // this.setState({openAddRoute:true})

    // return <Redirect to="/dashboard" />;

  }


  componentDidMount() {
    const { currentUser } = this.state;
    userService.getById(currentUser.id).then(userFromApi => this.setState({ userFromApi }));
  }

  render() {
    const { currentUser, userFromApi } = this.state;
   const  isLoggedIn= this.state.openAddRoute;
    return (
      <div>
        <p>Your role is: <strong>{currentUser.role}</strong>.</p>
        {/* if (isLoggedIn) {
           <Redirect to="/dashboard" />
        } */}

        <DisplayListComponent
          imageList={this.state.imageRecordList}
          editImageRecord={this.editImageRecord}
          deleteImageRecord= {this.deleteImageRecord}
          addImageRecord={this.addImageRecord}
        />
      </div>

    );
  }
}

export { Dashboard };