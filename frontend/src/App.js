import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
//pages and components
import Home from './pages/Home'
import { useAuthContext } from './hooks/useAuthContext'
import InstructorCourses from './components/InstructorCourses'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Popper from 'popper.js'
import ForgotI from './components/ForgotIndiv'
import ForgotC from './components/ForgotC'
import AddCourseForm from './components/AddCourseForm';
import AddAdminForm from './components/AddAdminForm';
import FilterInstructor from './components/FilterInstructor';
import AddCorpTraineeForm from './components/AddCorpTraineeForm';
import AddInstructorForm from './components/AdminAddins';
import Instructor from './pages/Instructor';
import Forgot from './components/Forgot'
import Admin2 from './pages/Admin';
import CoorprateTrainee from './pages/CoorpateTrainee';
import IndividualTrainee from './pages/IndividualTrainee';
import AllCourses from './components/AllCourses';
import CTitle from './components/instructorViewTitle';
import FilterSubjectRate from './components/FilterSubjectRate';
import CourseDetIndiv from './components/CourseDetIndiv';
import CourseDetCoorp from './components/CourseDetCoorp';
import NavbarCourse from './components/NavbarCourse';
import NavbarInstructor from './components/NavbarInstructor';
import AddCoursesForm from './components/AddCoursesForm';
import Subtitle from './components/Subtitle';
import UpdatePass from './components/UpdatePass';
import Sidebar from './components/Sidebar';
import Upload from './components/Upload';
import SubContent from './components/SubContent';
import MyCourses from './components/MyCourses';
import NotReg from './components/NotRegIndiv';
import SignIn from './components/SignUpInst';
import Duration from './components/Duration';
import CreateExam from './components/CreateExam';
import SolveExam from './components/solveExam';
import SolveTheExamChoosen from './components/SolveTheExamChoosen';
import SolveExamCoorp from './components/SolveExamCoorp';
import SolveTheExamChoosenCoorp from './components/SolveTheExamChoosenCoorp';
import PriceFilter from './components/PriceFilter';
import CreateSubtitle from './components/CreateSubtitle';
import NotRegIndiv from './components/NotRegIndiv';
import NotRegCoorp from './components/NotRegCoorp';
import InstuctorViewCourse from './components/instructorviewcourse'
import MyCoursesIndiv from './components/MyCoursesIndiv';
import EditProfileC from './components/EditProfileC';
import EditProfileIndiv from './components/EditProfileIndiv';
import EditProfileInst from './components/EditProfileInst';
import Search from './components/Search';
import Footer from './components/Footer';
import SubContent2 from './components/SubContent2';
import Viewcreviews from './components/Viewcreviews';
import { Resource, Admin, Login } from 'react-admin'

import restProvider from 'ra-data-simple-rest'
import PostList from './components/PostList';
import Login2 from './components/login';
import View from './components/Viewinstcourse'

import ErrorPage from './pages/Errorpage'

import { useState } from 'react'
import Register from './components/Register'
import AdminLogin from './components/AdminLogin'
import ProtectedRoutes from './ProtectedRoutes'
import ProtectedRoutes2 from './ProtectedRoutes2'
import ProtectedRoutes3 from './ProtectedRoutes3'
import ProtectedRoutes4 from './ProtectedRoutes4'
import GuestViewCourse from './components/guestviewcourse'
function App() {
  var f = true
  const { user } = useAuthContext()
  var userId = ""
  if (user) {
    userId = user.id
    console.log(user.UserType === "indiv")
  }
  console.log(useAuthContext().user)

  const redirectAfterLogin = () => {
    console.log(user.UserType)
    if (user.UserType == "instructor")
      return "/instructor"
    else if (user.UserType == "admin")
      return "/admin"
    else if (user.UserType == "indiv")
      return "/individual"
    else if (user.UserType == "coorp")
      return "/coorprate"
    else
      return "/home"
  }

  return (

    <div className="App"  >

      <BrowserRouter>
        {/* <NavbarCourse /> */}
        {/* <Sidebar /> */}
        <Routes>
          <Route
            path="/"
            element={!user ? <Home /> : <Navigate to={redirectAfterLogin()} />}


          />

          <Route element={<ProtectedRoutes3 />} >
            <Route
              path="/coorprate/course/:idC"
              element={<NotRegCoorp />}

            />
          </Route>


          <Route
            path="*"
            element={<ErrorPage />}

          />

          <Route
            path="/search/:name"
            element={<Search />}

          />
          <Route
            path="/forgotpassword"
            element={<Forgot />}

          />
          <Route
            path="/forgotpassword"
            element={<ForgotI />}

          />
          <Route
            path="/forgotpassword"
            element={<ForgotC />}

          />
          <Route element={<ProtectedRoutes2 />} >

            <Route
              path="/individual/course/:idC"
              element={<NotRegIndiv />}

            />
          </Route>
          <Route element={<ProtectedRoutes />} >
            <Route
              path="/instructor/course/:idC"
              element={<InstuctorViewCourse />}

            />
          </Route>

          <Route
              path="/course/:idC"
              element={<GuestViewCourse />}

            />

          <Route
            path="/duration"
            element={<Duration />}

          />

          <Route element={<ProtectedRoutes4 />} >
            <Route
              path="/admin"
              element={<Admin2 />}

            />
          </Route>
          <Route element={<ProtectedRoutes3 />} >
            <Route
              path="/coorp/mycourses"
              element={<MyCourses />}

            />
          </Route>
          <Route element={<ProtectedRoutes2 />} >
            <Route
              path="/indiv/mycourses"
              element={<MyCoursesIndiv />}

            />
          </Route>
          <Route element={<ProtectedRoutes3 />} >
            <Route
              path="coorp/mycourses/course/:id"
              element={<CourseDetCoorp />}

            />
          </Route>
          <Route element={<ProtectedRoutes2 />} >
            <Route
              path="indiv/mycourses/course/:id"
              element={<CourseDetIndiv />}

            />
          </Route>
          <Route
            path="/adminlogin"
            element={!user ? <AdminLogin /> : <Navigate to={redirectAfterLogin()} />}


          />
          <Route element={<ProtectedRoutes />} >
            <Route
              path="/instructor/createcourse/:idC/:idS"
              element={<Upload />}

            />
          </Route>
          <Route element={<ProtectedRoutes3 />} >
            <Route
              path="/:cid/:sid/coorp"
              element={<SubContent />}

            />
          </Route>
          <Route element={<ProtectedRoutes />} >
            <Route
              path="/instructor/:id/viewcreviews"
              element={<Viewcreviews />}

            />
          </Route>
          <Route element={<ProtectedRoutes />} >
            <Route
              path="/instructor/mycourses"
              element={<InstructorCourses />}

            />
          </Route>
          <Route element={<ProtectedRoutes2 />} >
            <Route
              path="/:cid/:sid/indiv"
              element={<SubContent2 />}

            />
          </Route>
          {/* <Route
            path="/ss"
            element={<Subtitle />}

          /> */}
          {/* <Route element = {<ProtectedRoutes/>} ></Route>
          <Route
            path="/instructor/updatepass/:id"
            element={<UpdatePass />}

          /> */}
          <Route element={<ProtectedRoutes />} >
            <Route
              path="/instructor/createcourse"
              element={<AddCoursesForm />}

            />
          </Route>
          <Route element={<ProtectedRoutes />} >
            <Route
              path="/instructor/createcourse/:idC"
              element={<CreateSubtitle />}

            />
          </Route>


          <Route element={<ProtectedRoutes />} >
            <Route
              path="/instructor"
              element={<Instructor />}

            />
          </Route>
          <Route
            path="/login"
            element={!user ? <Login2 /> : <Navigate to={redirectAfterLogin()} />}


          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to={redirectAfterLogin()} />}


          />
          <Route element={<ProtectedRoutes3 />} >
            <Route
              path="/coorprate/profile"
              element={<EditProfileC />}

            />
          </Route>
          <Route element={<ProtectedRoutes2 />} >
            <Route
              path="/individual/profile"
              element={<EditProfileIndiv id={userId} />}

            />
          </Route>
          <Route element={<ProtectedRoutes />} >
            <Route
              path="/instructor/profile"
              element={<EditProfileInst />}

            />
          </Route>
          <Route element={<ProtectedRoutes3 />} >
            <Route
              path="/coorprate"
              element={<CoorprateTrainee />}

            />
          </Route>
          <Route element={<ProtectedRoutes2 />} >
            <Route
              path="/individual"
              element={<IndividualTrainee />}

            />
          </Route>

          {/* <Route
            path="/course"
            element={<Course_Det />}
          /> */}
          <Route
            path="/AddCourse"
            element={<AddCourseForm />}

          />




          <Route
            path="/filterSubjectRate"
            element={<FilterSubjectRate />}
          />
          <Route
            path="/addAdmin"
            element={<AddAdminForm />}
          />
          <Route
            path="/AddInstructor"
            element={<AddInstructorForm />}
          />
          <Route
            path="/AddCoorp"
            element={<AddCorpTraineeForm />}
          />

          {/* <Route
            path=":/:id2/course/:id"
            element={< Course_Det />}
          /> */}
          <Route element={<ProtectedRoutes />} >
            <Route
              path="/instructor/createcourse/createexam/:idcourse/:idsub"
              element={<CreateExam />}

            />

          </Route>
          {/* <Route
            path="/indiv/solveExam/cid/sid"
            element={<SolveExam />}

          />

          <Route
            path="/coorp/:idi/:idc/solveExam"
            element={<SolveExamCoorp />}

          /> */}
          <Route element={<ProtectedRoutes2 />} >
            <Route
              path="/coorp/solveExam/:idcourse/:ide"
              element={<SolveTheExamChoosenCoorp />}

            />
          </Route>
          <Route element={<ProtectedRoutes2 />} >
            <Route
              path="/indiv/solveExam/:idcourse/:ide"
              element={<SolveTheExamChoosenCoorp />}

            />
          </Route>




        </Routes>
      </BrowserRouter>

    </div>


  );
}

export default App;
