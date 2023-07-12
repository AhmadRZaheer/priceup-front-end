import ExitingQuotes from "../../components/ExtimatesMoblie/existingQuotes";
import MobileBar from "../../components/MobileNavBar/MobleNavBar";
import "./StaffMobile.scss";

const Exiting = () => {
 
  return (
    <div className="Customers">
      <MobileBar />
      <div className="customersContainer">
        {/* <IndexMobile /> */}
        <ExitingQuotes />
      </div>
    </div>
  );
};

export default Exiting;