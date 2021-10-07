import DashLayout from "../components/dashLayout";
import AddressCards from "../components/addressCard";
import AddEditAddress from "../components/addEditAddress";

export default function AddressesPage(props) {
  console.log(props)
    return (
      <>
      <DashLayout props={props}>
      <div className="description_right">

        <div className="my_address_outer">
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                <h6>My Addresses </h6>
                <AddEditAddress type="add"/>
            </div>
            <AddressCards/>
            
        </div>
        </div>

      </DashLayout>
      </>
    )
  }
  