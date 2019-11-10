import React from 'react';

import { userService } from '../../_services/user.service';
import { authenticationService } from '../../_services/authentication.service';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import ImageUploader from 'react-images-upload';



class CreateComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            userFromApi: null,
            startDate: new Date(),
            endDate: new Date(),
            pictures: [],
            picture: null
        };

        this._onSelect = this._onSelect.bind(this);
        this._onSelectStatus = this._onSelectStatus.bind(this);
        this._onStartDate = this._onStartDate.bind(this);
        this._onEndDate = this._onEndDate.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        

    }

    onDrop(picture) {
        // this.setState({
        //     pictures: this.state.pictures.concat(picture),
        // });
        this.setState({ picture });
    }
    componentDidMount() {
        const { currentUser } = this.state;
        //  userService.getById(currentUser.id).then(userFromApi => this.setState({ userFromApi }));
    }

    //for dropdown position
    _onSelect(e) {

    }

    //for dropdown status
    _onSelectStatus(e) {

    }

    _onStartDate(startDate) {
        this.setState({ startDate });


    }
    _onEndDate(endDate) {
        this.setState({ endDate });

    }


    onSubmit(e){
        e.preventDefault();
        // const formData = new FormData();
        // formData.append('myImage',this.state.file);
        // const config = {
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     }
        // };
        // axios.post("/upload",formData,config)
        //     .then((response) => {
        //         alert("The file is successfully uploaded");
        //     }).catch((error) => {
        // });
    }


    render() {
        //  const { currentUser, userFromApi } = this.state;
        const positions = [
            { value: 1, label: 1 },
            { value: 2, label: 2 },
            { value: 3, label: 3 },
            { value: 4, label: 4 },
            { value: 5, label: 5 }

        ]
        const status = [
            { value: 'Active', label: 'Active' },
            { value: 'Inactive', label: 'Inactive' }

        ]

        const defaultPosition = positions[0] //set for next available pos
        const defaultStatus = status[0] //set for next available pos

        return (

            <div style={{ marginTop: 10 }}>
                <h3 align="center">Add new Banner</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Select Position:  </label>
                        <Dropdown options={positions} onChange={this._onSelect} value={defaultPosition} placeholder="Select an option" />
                    </div>

                    <div className="form-group">
                        <label>Title:  </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.person_name}
                            onChange={this.onChangePersonName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Status: </label>
                        <Dropdown options={status}
                            onChange={this._onSelectStatus}
                            value={defaultStatus}
                            placeholder="Select an option"
                        />
                    </div>
                    <div className="form-group">
                        <label>Start Date: </label>
                        <DatePicker
                            selected={this.state.startDate}
                            onChange={this._onStartDate}
                            className="ml-1"
                        />
                        <label className="ml-3">End Date: </label>
                        <DatePicker
                            selected={this.state.endDate}
                            onChange={this._onEndDate}
                            className="ml-1"
                        />
                    </div>

                    <div className="form-group">
                        <label>Image Upload: </label>
                        <input type="file" name="myImage" 
                        onChange= {this.onDrop}
                        className="form-control"
                        />
                        {/* <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
            /> */}
                    </div>
                    <div className="form-group">
                        <input type="submit"
                            value="Submit"
                            className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}
export { CreateComponent };