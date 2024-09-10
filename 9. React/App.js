import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import "./components/Portal/Layout/layout.css";
import "bootstrap/dist/css/bootstrap.css";
import { getCookie } from "./components/Common/getCookie";
import { setCookie } from "./components/Common/setCookie";
import Fallback from "./components/Common/Fallback"
import LoginFallback from "./components/Portal/Login/LoginFallback";

// Components with code splitting
const NoPermission = lazy(() =>
  import("./components/Portal/NoPermission/NoPermission")
);
const Launch = lazy(() => import("./components/Portal/Login/Launch"));
const Login = lazy(() => import("./components/Portal/Login/Login"));
const PasswordReset = lazy(() =>
  import("./components/Portal/Login/PasswordReset")
);
const PasswordResetConfirm = lazy(() =>
  import("./components/Portal/Login/PasswordResetConfirm")
);
const CreateNewUser = lazy(() =>
  import("./components/Portal/Login/CreateNewUser")
);
const Pending = lazy(() => import("./components/Portal/Login/Pending"));
const AdminRoutes = lazy(() => import("./components/Common/AdminRoutes"));
const PrivateRoutes = lazy(() => import("./components/Common/PrivateRoutes"));
const Categories = lazy(() =>
  import("./components/Portal/Settings/Categories")
);
const Automation = lazy(() =>
  import("./components/Portal/Automation/Automation")
);
const CreateAutomation = lazy(() =>
  import("./components/Portal/Automation/CreateAutomation")
);
const EditAutomation = lazy(() =>
  import("./components/Portal/Automation/EditAutomation")
);
const Activities = lazy(() =>
  import("./components/Portal/Settings/Activities")
);

const Dashboard = lazy(() =>
  import("./components/Portal/Feedback/Dashboard/Dashboard")
);

const Evaluation = lazy(() =>
  import("./components/Portal/Feedback/Evaluation/Evaluation")
);

const FeedbackLink = lazy(() =>
  import("./components/Portal/Link/FeedbackLink")
);
const EditUser = lazy(() => import("./components/Portal/Users/EditUser"));
const LookAndFeel = lazy(() =>
  import("./components/Portal/Settings/LookAndFeel")
);
const EvaluationOptions = lazy(() =>
  import("./components/Portal/Settings/EvaluationOptions")
);
const Survey = lazy(() => import("./components/Survey/Survey"));
const EditSurveys = lazy(() =>
  import("./components/Portal/Surveys/EditSurveys")
);
const CreateSurvey = lazy(() =>
  import("./components/Portal/Surveys/CreateSurvey")
);
const CreateQuestions = lazy(() =>
  import("./components/Portal/Questions/CreateQuestions")
);
const EditQuestions = lazy(() =>
  import("./components/Portal/Questions/EditQuestions")
);
const Surveys = lazy(() => import("./components/Portal/Surveys/Surveys"));
const Questions = lazy(() => import("./components/Portal/Questions/Questions"));
const Profile = lazy(() => import("./components/Portal/Profile/Profile"));
const Users = lazy(() => import("./components/Portal/Users/Users"));
const CreateUser = lazy(() => import("./components/Portal/Users/CreateUser"));
const EditCourses = lazy(() =>
  import("./components/Portal/Courses/EditCourses")
);

const CreateCourse = lazy(() =>
  import("./components/Portal/Courses/CreateCourse")
);
const Courses = lazy(() => import("./components/Portal/Courses/Courses"));

const App = () => {
  document.addEventListener("click", function (event) {
    const expirationDate = new Date(Date.now() + 86400 * 1000); // Set the expiration date to 1 day from the current time
    const jwt = getCookie("jwt");
    setCookie("jwt", jwt, expirationDate);
  });
  return (
    <BrowserRouter>
        <Routes>
          <Route path="*" element={<Launch />} />
          <Route path="/" element={<Launch />} />
          <Route path="/login" element={ <Suspense fallback={<LoginFallback/>}><Login /></Suspense>} />
          <Route path="/pending" element={<Pending />} />
          <Route path="/newuser" element={ <Suspense fallback={<LoginFallback/>}><CreateNewUser /></Suspense>} />
          <Route path="/passwordreset" element={ <Suspense fallback={<LoginFallback/>}><PasswordReset /></Suspense>} />
          <Route
            path="/passwordresetconfirm"
            element={<PasswordResetConfirm />}
          />
          <Route path="/survey" element={<Survey />} />
          <Route path="/nopermission" element={<NoPermission />} />
          <Route element={<PrivateRoutes />}>
            <Route
              path="/dashboard"
              element={
                <Suspense fallback={<Fallback />}>
                  <Dashboard />
                </Suspense>
              }
            />
            <Route
              path="/evaluation/:target/:view"
              element={
                <Suspense fallback={<Fallback />}>
                  <Evaluation />
                </Suspense>
              }
            />
            <Route
              path="evaluation/:target/:view/:Id"
              element={
                <Suspense fallback={<Fallback />}>
                  <Evaluation />
                </Suspense>
              }
            />
            <Route
              path="/profile"
              element={
                <Suspense fallback={<Fallback />}>
                  <Profile />
                </Suspense>
              }
            />{" "}
            <Route element={<AdminRoutes />}>
              <Route
                path="/link"
                element={
                  <Suspense fallback={<Fallback />}>
                    <FeedbackLink />
                  </Suspense>
                }
              />
              <Route
                path="/courses"
                element={
                  <Suspense fallback={<Fallback />}>
                    <Courses />
                  </Suspense>
                }
              />
              <Route
                path="courses/edit/:courseId"
                element={
                  <Suspense fallback={<Fallback />}>
                    <EditCourses />
                  </Suspense>
                }
              />
              <Route path="courses/create" element={<CreateCourse />} />
              <Route
                path="/users"
                element={
                  <Suspense fallback={<Fallback />}>
                    <Users />
                  </Suspense>
                }
              />
              <Route path="users/create" element={<CreateUser />} />
              <Route
                path="users/edit/:userId"
                element={
                  <Suspense fallback={<Fallback />}>
                    <EditUser />
                  </Suspense>
                }
              />
              <Route
                path="lookandfeel"
                element={
                  <Suspense fallback={<Fallback />}>
                    <LookAndFeel />
                  </Suspense>
                }
              />
              <Route
                path="evaluationoptions"
                element={
                  <Suspense fallback={<Fallback />}>
                    <EvaluationOptions />
                  </Suspense>
                }
              />
              <Route
                path="automation"
                element={
                  <Suspense fallback={<Fallback />}>
                    <Automation />
                  </Suspense>
                }
              />
              <Route
                path="automation/create"
                element={
                  <Suspense fallback={<Fallback />}>
                    <CreateAutomation />
                  </Suspense>
                }
              />
              <Route
                path="automation/edit/:automationId"
                element={
                  <Suspense fallback={<Fallback />}>
                    <EditAutomation />
                  </Suspense>
                }
              />
              <Route
                path="categories"
                element={
                  <Suspense fallback={<Fallback />}>
                    <Categories />
                  </Suspense>
                }
              />
              <Route
                path="questions"
                element={
                  <Suspense fallback={<Fallback />}>
                    <Questions />
                  </Suspense>
                }
              />
              <Route
                path="questions/edit/:questionId"
                element={
                  <Suspense fallback={<Fallback />}>
                    <EditQuestions />
                  </Suspense>
                }
              />
              <Route
                path="questions/create"
                element={
                  <Suspense fallback={<Fallback />}>
                    <CreateQuestions />
                  </Suspense>
                }
              />
              <Route
                path="/surveys"
                element={
                  <Suspense fallback={<Fallback />}>
                    <Surveys />
                  </Suspense>
                }
              />
              <Route
                path="surveys/edit/:surveyId"
                element={
                  <Suspense fallback={<Fallback />}>
                    <EditSurveys />
                  </Suspense>
                }
              />
              <Route
                path="surveys/create"
                element={
                  <Suspense fallback={<Fallback />}>
                    <CreateSurvey />
                  </Suspense>
                }
              />
              <Route
                path="/activitiesxy"
                element={
                  <Suspense fallback={<Fallback />}>
                    <Activities />
                  </Suspense>
                }
              />
            </Route>
          </Route>
        </Routes>
    </BrowserRouter>
  );
};

export default App;
