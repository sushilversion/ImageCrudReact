import React from 'react';

//import { userService } from '../../_services/user.service';
import { authenticationService } from '../../_services/authentication.service';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { productService } from '../../_services/product.service';

class EditComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            positions: [],
            statuslist: [],
            pos: -1,
            title: '',
            status: '',
            startDate: new Date(),
            endDate: new Date(),
            // pictures: [],
            picture: null,
            errors: {
                picture: '',
            }
        };

        this._onSelectPos = this._onSelectPos.bind(this);
        this._onSelectStatus = this._onSelectStatus.bind(this);
        this._onStartDate = this._onStartDate.bind(this);
        this._onEndDate = this._onEndDate.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.close = this.close.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.validateAndUpload = this.validateAndUpload.bind(this);
        this.validateForm= this.validateForm.bind(this);
    }
    onChangeTitle(event) {
        this.setState({ title: event.target.value });

    }
    onDrop(event) {
        //  validation for Image Type
        this.validateAndUpload(event.target.files[0], (picture) => {
            if (picture) {
                this.setState({ picture });
                this.setState({errors:{picture:''}})

            }
            else {
                this.setState({errors:{picture:'Not a valid  image.'}})
            }

        });


    }

    // TODO- Move to Util/Common Function
    validateAndUpload(file, callback) {
        var URL = window.URL || window.webkitURL;

        if (file) {
            var image = new Image();

            image.onload = function () {
                console.log(this.width);

                if (this.width) {
                    console.log('Image.w', this.width);
                    console.log('Image.h', this.height);
                    callback(file);
                }
            };
            image.onerror = () => {
                // console.log('error on image');
                callback(null);

            }

            image.src = URL.createObjectURL(file);
        }
    }

    componentDidMount() {
        const { handle } = this.props.match.params
        const { fromNotifications } = this.props.location.state

        console.log('Handle',handle);
        console.log('location',this.props.location);
        console.log('fromNotifications',fromNotifications);

        
        const positions = productService.getAllPositions();
        const statuslist = productService.getAllStatus();
        this.setState({ positions });
        this.setState({ statuslist });

        this.setState({ pos: positions[0].value });
        this.setState({ status: statuslist[0].value });
    }

    //for dropdown position
    _onSelectPos(event) {
        console.log(event);

        this.setState({ pos: event.value });

    }

    //for dropdown status
    _onSelectStatus(status) {
        this.setState({ status });
    }

    _onStartDate(startDate) {

        this.setState({ startDate });

    }
    _onEndDate(endDate) {
        this.setState({ endDate });

    }

    onSubmit(e) {
        e.preventDefault();

        if (this.validateForm(this.state.errors)) {
            console.info('Valid Form')

            const record = {
                "pos": this.state.pos,
                "title": this.state.title,
                "status": this.state.status,
                "startDate": this.state.startDate.toLocaleDateString(),
                "endDate": this.state.endDate.toLocaleDateString(),
                "picture": this.state.picture
            };
            console.log('onSubmit Invoked: ', record);
            //TODO: Validation for records
            productService.pushRecord(record);
            // history.goBack;
            this.close();
        } else {
            console.error('Invalid Form')
        }


    }

    validateForm (errors) {
        console.log(errors);
        
        let valid = true;
        Object.values(errors).forEach(
            // if we have an error string set valid to false
            (val) => val.length > 0 && (valid = false)
        );
        return valid;
    }

    close(e) {
        this.props.history.goBack();
    }

    render() {
       
        const {errors} = this.state;

        return (

            <div style={{ marginTop: 10 }}>
                <h3 align="center">Edit Banner</h3>
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
                      
                    </div>
                    <div className="form-group">
                        <input type="submit"
                            value="Submit"
                            className="btn btn-primary" />
                    </div>
                    {errors.picture.length>0 && 
                            <span className='error'>{errors.picture}</span>}
                </form>
            </div>
        );
    }
}
export { EditComponent };