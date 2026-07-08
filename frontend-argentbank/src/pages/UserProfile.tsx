import React from "react";
import { useAppSelector } from "../store/hooks";
import { useAppDispatch } from "../store/hooks";
import { updateUserProfile } from "../store/slices/userSlice"; // Import update User slice
import FormEditName from "../components/Form/FormEditProfile"; // Update User Data Form

const UserProfile: React.FC = () => {
  const { userInfo } = useAppSelector((state) => state.user);
  const [isEditing, setIsEditing] = React.useState(false);
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="header">
        <h1>
          Welcome back
          <br />
          {userInfo ? `${userInfo.firstName} ${userInfo.lastName}!` : "User!"}
        </h1>
        {isEditing && userInfo ? (
          <FormEditName
            user={userInfo!}
            onSubmit={(updatedProfile) => {
              dispatch(updateUserProfile(updatedProfile));
              setIsEditing(false);
            }}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Edit Name
          </button>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
