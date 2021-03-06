import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./components/forms/Login";
import Signup from "./components/forms/Signup";
import Setting from "./containers/Setting";
import Bookmark from "./containers/Bookmark";
import Jobs from "./containers/Jobs";
import Activate from "./containers/Activate";
import PostPage from "./containers/PostPage";
import JobPage from "./containers/JobPage";
import RequestJobResume from "./containers/RequestJobResume";
import UserProfile from "./containers/UserProfile";
import UsersList from "./containers/UsersList";
import Messages from "./containers/Messages";
import List from "./containers/List";
import Notification from "./containers/Notification";
import NewPost from "./components/forms/NewPost";
import ResetPassword from "./components/forms/ResetPassword";
import ResetPasswordConfirm from "./components/forms/ResetPasswordConfirm";
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
          <Route exact path="/Bookmark/:tab" component={Bookmark} />
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
          <Route exact path="/post/:postId" component={PostPage} />
          <Route exact path="/job/:jobId" component={JobPage} />
          <Route
            exact
            path="/job/:jobId/resume/:userId"
            component={RequestJobResume}
          />
          <Route exact path="/users" component={UsersList} />
          <Route exact path="*" component={PageNotFound} />
        </Switch>
      </Layout>
    </Router>
  </Provider>
);

export default App;
