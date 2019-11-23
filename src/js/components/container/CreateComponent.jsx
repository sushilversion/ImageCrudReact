import React from 'react';

//import { userService } from '../../_services/user.service';
import { authenticationService } from '../../_services/authentication.service';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { productService } from '../../_services/product.service';

//import ImageUploader from 'react-images-upload';



class CreateComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            positions:[],
            statuslist:[],
            pos: -1,
            title:'',
            status:'',
            startDate: new Date(),
            endDate: new Date(),
            // pictures: [],
            picture: null
        };

        this._onSelectPos = this._onSelectPos.bind(this);
        this._onSelectStatus = this._onSelectStatus.bind(this);
        this._onStartDate = this._onStartDate.bind(this);
        this._onEndDate = this._onEndDate.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.close=this.close.bind(this);

        this.onChangeTitle=this.onChangeTitle.bind(this);

    }
    onChangeTitle(event){
        this.setState({title:event.target.value});

    }
    onDrop(picture) {
        // this.setState({
        //     pictures: this.state.pictures.concat(picture),
        // });
        console.log(picture.target.files[0].name);

        this.setState({ picture: picture.target.files[0].name });

    }
    componentDidMount() {
        const positions=productService.getAllPositions();
        const statuslist =productService.getAllStatus();
        this.setState({positions});
        this.setState({statuslist });

        this.setState({pos:positions[0].value});
        this.setState({status:statuslist[0].value});
        //  userService.getById(currentUser.id).then(userFromApi => this.setState({ userFromApi }));
    }

    //for dropdown position
    _onSelectPos(event) {
        console.log(event);
        
        this.setState({pos:event.value});

    }

    //for dropdown status
    _onSelectStatus(statusval) {
        this.setState({status:statusval});
    }

    _onStartDate(startDate) {
        // console.log('Startdate',startDate);
        // console.log('StartdateString',startDate.toLocaleDateString());
        
        this.setState({ startDate });


    }
    _onEndDate(endDate) {
        this.setState({ endDate});

    }


    onSubmit(e) {
        e.preventDefault();
        const record={ "pos": this.state.pos, 
        "title": this.state.title,
         "status": this.state.status,
          "startDate": this.state.startDate.toLocaleDateString(),
           "endDate": this.state.endDate.toLocaleDateString(),
            "picture": this.state.picture};

       
        // const formData = new FormData();
        // formData.append('myImage', this.state.picture);
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
        console.log('onSubmit Invoked: ',record);
        //TODO: Validation for records
        productService.pushRecord(record);
        // history.goBack;
        this.close();
    }

    close(e) {
        this.props.history.goBack();
    }

    render() {
        //  const { currentUser, userFromApi } = this.state;
       

        //this.setState({pos:defaultPosition})
       // const defaultStatus = status[0] //set for next available pos

        return (

            <div style={{ marginTop: 10 }}>
                <h3 align="center">Add new Banner</h3>
                <div className="row">
                <button className="btn btn-danger ml-3 " onClick={this.close} >Back</button>

                    </div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Select Position:  </label>
                        <Dropdown options={this.state.positions} onChange={this._onSelectPos} value={this.state.positions[0]} placeholder="Select an option" />
                    </div>

                    <div className="form-group">
                        <label>Title:  </label>
                        <input
                            type="text"
                            className="form-control"
                            
                            onChange={this.onChangeTitle}
                            required="true"
                            
                        />
                    </div>
                    <div className="form-group">
                        <label>Status: </label>
                        <Dropdown options={this.state.statuslist}
                            onChange={this._onSelectStatus}
                            value={this.state.statuslist[0]}
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
                            onChange={this.onDrop}
                            className="form-control"
                            required="true"
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