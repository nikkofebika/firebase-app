import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "../login";
import Dashboard from "../dashboard";
import Signup from "../signup";
import { Provider } from "react-redux";
import { store } from "../../../config/redux";
import ContohPromise from "../ContohPromise";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/promise" component={ContohPromise} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
