import ApplicationMainLayout from "../components/layout/ApplicationMainLayout/ApplicationMainLayout";
import LargeButton from "../components/buttons/button";
import SingleLineText from "../components/Inputs/SingleLineText";
import ColorPicker from "../components/Inputs/ColorPicker";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { dismissAccountMessage, getLoggedInUser, selectAccountMessage, selectEmail, selectIsGetUserDetailsPending, selectPasswordField, updateBusinessDetails, updateUserAuth } from "../redux/authSlice";
import { useSelector } from "react-redux";
import { selectBusinessName, selectPhone, selectHexPrimary, selectHexSecondary, setName, setPhone, setHexPrimary, setHexSecondary, setEmail, setPasswordField } from "../redux/authSlice";
import Loading from "../components/loading/loading";
import UpdateMessage from "../components/notifications/UpdateMessage";
import { getStripePortralLink } from "../redux/billingSlice";

function Settings() {
    const styles = { 'minWidth': '500px' }

    const businessName = useSelector(selectBusinessName);
    const phone = useSelector(selectPhone)
    const hexPrimary = { hex: "#" + useSelector(selectHexPrimary) }
    const hexSecondary = { hex: "#" + useSelector(selectHexSecondary) }
    const fetchCurrentUserInfoIsLoading = useSelector(selectIsGetUserDetailsPending)
    const email = useSelector(selectEmail)
    const passwordField = useSelector(selectPasswordField);
    const accountMessage = useSelector(selectAccountMessage);

    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            try {
                await dispatch(getLoggedInUser());
            } catch (err) {
                console.log(err)
            }
        })();
    }, [dispatch])

    const handleBusinessFormSubmission = () => {
        dispatch(updateBusinessDetails({
            name: businessName,
            phone: phone,
            hexPrimary: hexPrimary.hex.slice(1,7),
            hexSecondary: hexSecondary.hex.slice(1,7)
        }))
    }

    const handleUserFormSubmission = () => {
        dispatch(updateUserAuth({
            email: email,
            password: passwordField
        }))
    }

    const handleStripePortalRedirect = async () => {
        try {
            const response = await dispatch(getStripePortralLink({route: 'settings'}))
            window.location.href = response.payload.data;
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <ApplicationMainLayout header="Account Settings">
            <div className="flex flex-wrap pt-10">
                <UpdateMessage
                    message={accountMessage.message}
                    isVisible={accountMessage.isVisible}
                    isSuccess={accountMessage.isSuccess}
                    dismissReducer={() => dispatch(dismissAccountMessage())}
                />
                <div className="w-1/2 pr-48 pb-24" style={styles}>
                    <h2 className="text-2xl font-semibold font-poppins mb-1">Update Company Information</h2>
                    <p className="mb-1">Update your business name, phone number or branding below.</p>
                    <br />
                    {!fetchCurrentUserInfoIsLoading
                        ? (
                            <div>
                                <SingleLineText
                                    name="name"
                                    label="Business Name"
                                    type="text"
                                    state={businessName}
                                    setState={(e) => dispatch(setName(e))}
                                    helper="ABC Pest"
                                    size="medium"
                                />
                                <SingleLineText
                                    name="phone"
                                    label="Business Phone"
                                    type="text"
                                    state={phone}
                                    setState={(e) => dispatch(setPhone(e))}
                                    helper="123-123-1233"
                                    size="medium"
                                />
                                <ColorPicker
                                    name="primary"
                                    label="Brand's Primary Color"
                                    state={hexPrimary}
                                    setState={(e) => dispatch(setHexPrimary(e))}
                                />
                                <ColorPicker
                                    name="primary"
                                    label="Brand's Background Color"
                                    state={hexSecondary}
                                    setState={(e) => dispatch(setHexSecondary(e))}
                                />
                                <LargeButton size={0} handleClick={handleBusinessFormSubmission}>Update</LargeButton>
                            </div>
                        )
                        : (
                            <Loading />
                        )
                    }

                </div>
                <div className="w-1/2 pr-48 pb-24" style={styles}>
                    <h2 className="text-2xl font-semibold font-poppins mb-1">Update Account Information</h2>
                    <p className="mb-1">Update your login credentials.</p>
                    <br />
                    {
                        !fetchCurrentUserInfoIsLoading
                            ? (
                                <div>
                                    <SingleLineText
                                        name="email"
                                        label="Account Email"
                                        type="text"
                                        state={email}
                                        setState={(e) => dispatch(setEmail(e))}
                                        helper="abcpest@gmail.com"
                                        size="medium"
                                    />
                                    <SingleLineText
                                        name="password"
                                        label="Password"
                                        type="password"
                                        state={passwordField}
                                        setState={(e) => dispatch(setPasswordField(e))}
                                        helper="New Password"
                                        size="medium"
                                    />
                                    <LargeButton size={0} handleClick={handleUserFormSubmission}>Update</LargeButton>
                                </div>
                            ) 
                            : (
                                <Loading />
                            )
                    }

                </div>
                <div className="w-full pr-48 py-4">
                    <h2 className="text-2xl font-semibold font-poppins mb-1">Billing</h2>
                    <p className="mb-1">Click below to manage your account’s billing information and view your order history.</p>
                    <LargeButton handleClick={() => handleStripePortalRedirect()} size={0}>Open Billing</LargeButton>
                </div>
            </div>
        </ApplicationMainLayout>
    )
}

export default Settings;