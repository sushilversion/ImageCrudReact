import React from 'react';
import ReactDOM from "react-dom";

import { Router, Route, Link } from 'react-router-dom';

import { history } from '../../_helpers/history';
import {  Role } from '../../_helpers/Role';
import { authenticationService } from './../../_services/authentication.service';
import { PrivateRoute } from './PrivateRoute.jsx';
import { HomePage } from './HomePage.jsx';
import { AdminPage } from './AdminPage.jsx';
import { LoginPage } from './LoginPage.jsx';
import { Dashboard } from './Dashboard.jsx';
import { CreateComponent } from './CreateComponent.jsx';
import { EditComponent } from './EditComponent.jsx';

export default class AppContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            isAdmin: false
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({
            currentUser: x,
            isAdmin: x && x.role === Role.Admin
        }));
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    render() {
        const { currentUser, isAdmin } = this.state;
        return (
            <Router history={history}>
                <div className="col-md-12">
                    {currentUser &&
                        <nav className="navbar navbar-expand navbar-dark bg-dark">
                            <div className="navbar-nav">
                                <Link to="/" className="nav-item nav-link">Home</Link>
                                <Link to="/dashboard" className="nav-item nav-link">Dashboard</Link>

                                {isAdmin && <Link to="/admin" className="nav-item nav-link">Admin</Link>}
                                <a onClick={this.logout} className="nav-item nav-link">Logout</a>
                            </div>
                        </nav>
                    }
                        <div className="col-md-6 offset-md-3">
                                <div >
                                    <PrivateRoute exact path="/" component={HomePage} />
                                    <PrivateRoute exact path="/dashboard" component={Dashboard} />
                                    <PrivateRoute exact path="/create" component={CreateComponent} />
                                    <PrivateRoute exact path="/edit" component={EditComponent} />

                                    <PrivateRoute path="/admin" roles={[Role.Admin]} component={AdminPage} />
                                    <Route path="/login" component={LoginPage} />
                                    {/* <Route exact path='/create' component={ Create } />
                                     <Route path='/edit/:id' component={ Edit } /> */}
                                </div>
                            </div>
                        
                    </div>
            </Router>
        );
    }
}

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<AppContainer />, wrapper) : false;
