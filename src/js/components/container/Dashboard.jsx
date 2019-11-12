import React from 'react';

import { productService } from '../../_services/product.service';
import { authenticationService } from '../../_services/authentication.service';
import DisplayListComponent from "../presentational/DisplayListComponent.jsx";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: authenticationService.currentUserValue,
      openAddRoute:false,
      userFromApi: null,
      imageRecordList:[],
      positionAvailable:false
    };
    this.deleteImageRecord = this.deleteImageRecord.bind(this);
    // this.editImageRecord = this.editImageRecord.bind(this);
    // this.addImageRecord = this.addImageRecord.bind(this);

    this.onRecordAdded= this.onRecordAdded.bind(this);
  }
  onRecordAdded(){
    console.log('Prop invoked');
    
  }

  deleteImageRecord(event) {
    console.log(event);
    

  }
  // editImageRecord(event) {
  //   console.log(event);

  // }

  // addImageRecord(event) {
  //   console.log('Add Image Invoked');
    
  //   console.log(event);

  //   // this.setState({openAddRoute:true})

  //   // return <Redirect to="/dashboard" />;

  // }


  componentDidMount() {
    const { currentUser } = this.state;
   // userService.getById(currentUser.id).then(userFromApi => this.setState({ userFromApi }));
   //productService.getAll().then(imageRecordList => this.setState({ imageRecordList }))
   this.setState({imageRecordList:productService.getAll()});
   this.setState({positionAvailable: (productService.getAllPositions().length>0)?true:false})

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
          positionAvailable={this.state.positionAvailable}
          imageList={this.state.imageRecordList}
          deleteImageRecord= {this.deleteImageRecord}
         />
      </div>

    );
  }
}

export { Dashboard };