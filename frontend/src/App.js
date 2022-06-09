import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Setting from "./containers/Setting";
import Bookmark from "./containers/Bookmark";
import Jobs from "./containers/Jobs";
import Activate from "./containers/Activate";
import DetailPage from "./containers/DetailPage";
import UserProfile from "./containers/UserProfile";
import Messages from "./containers/Messages";
import List from "./containers/List";
import Notification from "./containers/Notification";
import NewPost from "./containers/NewPost";
import ResetPassword from "./containers/ResetPassword";
import ResetPasswordConfirm from "./containers/ResetPasswordConfirm";
import Chat from "./containers/Chat";
import PageNotFound from "./components/PageNotFound";
import { Provider } from "react-redux";
import store from "./store";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./hocs/Layout";

const App = () => (
  <Provider store={store}>
    <Router>
      <ScrollToTop />
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/chat/:room" component={Chat} />
          <Route exact path="/profile/:name" component={UserProfile} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/Setting/:tab" component={Setting} />
          <Route exact path="/Bookmark" component={Bookmark} />
          <Route exact path="/messages" component={Messages} />
          <Route exact path="/list/:type/:id" component={List} />
          <Route exact path="/jobs" component={Jobs} />
          <Route exact path="/notification" component={Notification} />
          <Route exact path="/newpost" component={NewPost} />
          <Route exact path="/reset_password" component={ResetPassword} />
          <Route
            exact
            path="/password/reset/confirm/:uid/:token"
            component={ResetPasswordConfirm}
          />
          <Route exact path="/activate/:uid/:token" component={Activate} />
          <Route exact path="/detail/:postId" component={DetailPage} />
          <Route exact path="*" component={PageNotFound} />
        </Switch>
      </Layout>
    </Router>
  </Provider>
);

export default App;
