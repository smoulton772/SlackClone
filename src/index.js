import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import registerServiceWorker from "./registerServiceWorker";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import firebase from "./firebase";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import rootReducer from "./reducers/index";
import {setUser} from './actions'
import Spinner from './Spinner'



const store = createStore(rootReducer, composeWithDevTools());

class Root extends React.Component {
  componentDidMount() {
    // console.log(this.props.isLoading )
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //console.log(user)
        this.props.setUser(user)
        this.props.history.push("/");
      }
    });
  }

  render() {
    return this.props.isLoading ? <Spinner /> : (
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.user.isLoading
});

const RootWithAuth = withRouter(connect(mapStateToProps, { setUser })(Root));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();