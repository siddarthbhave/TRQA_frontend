import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import { useStateContext } from './context/ContextProvider';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Navbar, Sidebar, ThemeSettings } from './components';
import { logout } from './store/actions';
import { useDispatch } from 'react-redux';
import FullPageLoading from './components/FullPageLoading';
import ServiceHistory from './pages/ServiceHistory';
// Lazy load the pages
// const Dashboard = lazy(() => import('./pages/dashboard'));
// const Orders = lazy(() => import('./pages/Orders'));
// const ShedLogin = lazy(() => import('./pages/shedLogin/login'));
// const VendorsDetail = lazy(() => import('./pages/VendorsDetail'));
// const CreateMovement = lazy(() => import('./forms/Transport'));
// const CreateService = lazy(() => import('./forms/Service'));
// const VendorHandle = lazy(() => import('./forms/VendorHandle'));
// const Shed = lazy(() => import('./pages/Shed'));
// const Calibration = lazy(() => import('./pages/Calibration'));
// const Vendor = lazy(() => import('./pages/Vendor'));
// const Transactions = lazy(() => import('./pages/Transactions'));
// const ShedTools = lazy(() => import('./pages/ShedTools'));
// const CalibrationDetailsForm = lazy(() => import('./forms/CalibrationDetails'));
// const Instruments = lazy(() => import('./pages/Instruments'));
// const History = lazy(() => import('./pages/History'));

// // const ServiceHistory = lazy(() => import('./pages/ServiceHistory'));
// const DocumentForm = lazy(() => import('./forms/Document'));
// const Challan = lazy(() => import('./pages/Challan'));
// const GroupMaster = lazy(() => import('./pages/InstrumentGroupMaster'));
// const MasterToolsDialog = lazy(() => import('./forms/MasterDialog'));
// const InstrumentFamily = lazy(() => import('./pages/InstrumentFamily'));

import Dashboard from './pages/dashboard';
import Orders from './pages/Orders';
import ShedLogin from './pages/shedLogin/login';
import VendorsDetail from './pages/VendorsDetail';
import CreateMovement from './forms/Transport';
import CreateService from './forms/Service';
import VendorHandle from './forms/VendorHandle';
import Shed from './pages/Shed';
import Calibration from './pages/Calibration';
import Vendor from './pages/Vendor';
import Transactions from './pages/Transactions';
import ShedTools from './pages/ShedTools';
import CalibrationDetailsForm from './forms/CalibrationDetails';
import Instruments from './pages/Instruments';
import History from './pages/History';

// import ServiceHistory from './pages/ServiceHistory'; // Uncomment if needed
import DocumentForm from './forms/Document';
import Challan from './pages/Challan';
import GroupMaster from './pages/InstrumentGroupMaster';
import MasterToolsDialog from './forms/MasterDialog';
import InstrumentFamily from './pages/InstrumentFamily';

const App = () => {
  const {  setCurrentMode, setActiveMenu, activeMenu, currentMode, currentColor, themeSettings, setThemeSettings, isLoading, setIsLoading } = useStateContext();
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    setActiveMenu(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/";
    }, 1000);
  };

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          {isAuthenticated && (
            <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
              <TooltipComponent content="Settings" position="Top">
                <button
                  type="button"
                  className="text-lg py-2 px-5 font-semibold hover:drop-shadow-xl rounded-md hover:bg-light-gray text-white"
                  onClick={handleLogout}
                  style={{ background: currentColor }}
                >
                  LOGOUT
                </button>
              </TooltipComponent>
            </div>
          )}
          {activeMenu && isAuthenticated ? (
            <div className="w-72 fixed sidebar">
              <Sidebar />
            </div>
          ) : activeMenu ? (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          ) : null}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg bg-main-bg min-h-screen overflow-x-auto md:ml-72 w-full'
                : 'bg-main-bg dark:bg-main-dark-bg w-full min-h-screen flex-2'
            }
          >
            {isAuthenticated && (
              <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                <Navbar onLogout={handleLogout} />
              </div>
            )}
            <div>
              {themeSettings && <ThemeSettings />}
                <Routes>
                  {!isAuthenticated ? (
                    <Route path="/" element={<ShedLogin />} />
                  ) : role === 'shed' ? (
                    <>
                      <Route path="/home" element={<Dashboard />} />
                      <Route path="/transport-history" element={<History />} />
                      <Route path={`/shed-tools/:id`} element={<ShedTools />} />
                    </>
                  ) : role === 'admin' ? (
                    <>
                      <Route path="/home" element={<Dashboard />} />
                      <Route path="/orders" element={<Orders />} />
                      <Route path="/vendors" element={<Vendor />} />
                      <Route path="/shed" element={<Shed />} />
                      <Route path="/calibration" element={<Calibration />} />
                      <Route path="/calibration/:id" element={<Transactions />} />
                      <Route path="/shed/:id" element={<ShedTools />} />
                      <Route path="/vendors/:id" element={<VendorsDetail />} />
                      <Route path="/calibrationreport" element={<CalibrationDetailsForm />} />
                      <Route path="/transport-history" element={<History />} />
                      <Route path="/service-history" element={<ServiceHistory />} />
                      <Route path="/transactions" element={<CreateMovement />} />
                      <Route path="/vendorhandle" element={<VendorHandle />} />
                      <Route path="/deliverychallan" element={<Challan />} />
                      <Route path="/services" element={<CreateService />} />
                      <Route path="/instrument-family" element={<InstrumentFamily />} />
                      <Route path="/instrument-family/master/:id" element={<GroupMaster />} />
                      <Route path="/instrument-family/master/tools/:id" element={<MasterToolsDialog />} />
                      <Route path="/instruments" element={<Instruments />} />
                      <Route path="/document-form" element={<DocumentForm />} />
                    </>
                  ) : null}
                </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
      {isLoading && <FullPageLoading />}
    </div>
  );
};

export default App;
