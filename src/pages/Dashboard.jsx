import MainContent from "../Components/Dashboard/MainContent";
import Sidebar from "../Components/Dashboard/Sidebar";
import TopBar from "../Components/Dashboard/Topbar";


const Dashboard = () => {
  return (
    // <div className="cointainer-fluid">
    //   {/* Sidebar */}
    //   <Sidebar />

    //   {/* Main Content Area */}
    //   <div className="flex-grow-1">
    //     {/* Top Bar */}
    //     <TopBar />

    //     {/* Main Content */}
    //      <MainContent/>
    //   </div>
    // </div>

    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
    <div style={{ flex: '1 1 auto', maxWidth: '300px' }}>
      <Sidebar />
    </div>
    <div style={{ flex: '3 1 1400px', width: '100%' }}>
      <TopBar />
      <MainContent />
    </div>
  </div>
  
    
  );
};

export default Dashboard;
