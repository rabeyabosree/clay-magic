import FooterPage from './FooterPage';
import Navbar from './../Navbar';

const Layout = ({ children }) => {

    return (
      <div className="flex flex-col w-full min-h-screen">
      
        {/* Page Content */}
        <main className="flex-1 flex items-center justify-center mt-4 mb-16 p-4">
          {children}
        </main>
  
 
      </div>
    );
  };
  
  export default Layout;
  