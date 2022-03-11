import React, {useEffect, useState } from "react";
import { connect } from "react-redux";
import "./changePassword.css";
import { userActions } from "../../../_actions";
const  ChangePassword  =(props) => {
   
    const { chagePasswordReducer ,updatePassword,passwordApendris} = props;
   
    const Error = {
        eHandleError: false,
        errorMessage: "",
    };
    
    const [state,setState] = useState(Error)
    const [currentPassword,setcurrentPassword] =useState('')
    const [newPassword,setnewPassword] =useState('')
    const [confirmPassword,setconfirmPassword] =useState('')
    console.log(passwordApendris)
    const eHandleValidatePassword= (data) => {
        if (data.newPassword === data.confirmPassword) {
            if (data.newPassword.length > 5) {
                setState({
                    eHandleError: false,
                    message: "",
                });
                
                updatePassword(data);
                return true
            } else {
                    setState({
                    eHandleError: true,
                    message: "La nueva contraseña debe tener 5 caracteres",
                });
                return false;
            }
        } else {
            setState({
                eHandleError: true,
                message: "Las contraseñas no coninciden",
            });
            return false;
        }
    }

    const eHandleSubmit = (e) => {
        
        e.preventDefault();
        const user = {
            currentPassword,
            newPassword,
            confirmPassword,
        };
      
        eHandleValidatePassword(user)  
        if(eHandleValidatePassword(user)){
            setconfirmPassword('')
            setnewPassword('')
            setcurrentPassword('')
        } 
    };
    
    

        return (
            <div className="background_login">
                <div className="custom_background_sidebar">
                    <div className="center_container">
                        <div className="container_white_edit">
                            <h3 className="title">Cambiar contraseña</h3>
                            <p className="subtitle mb-2">Gestiona tu contraseña de una forma fácil, recuerda confirmar tu correo por si se te olvida tu contraseña.</p>
                            <form
                                method="POST"
                                onSubmit={eHandleSubmit}>
                                <div className="form_group mt-30">
                                    <label htmlFor="current-password" className="labelText">
                                        Contraseña actual
                                    </label>
                                    <input
                                        type="password"
                                        className="form_control"
                                        placeholder="Contraseña actual"
                                        value={currentPassword}
                                        name="current-password"
                                        onChange={(e) => setcurrentPassword(e.target.value)}
                                    />
                                </div>

                                <div className="form_group mt-30">
                                    <label htmlFor="new-password" className="labelText">
                                        Nueva contraseña
                                    </label>
                                    <input
                                        type="password"
                                        className="form_control"
                                        value={newPassword}
                                        placeholder="Nueva contraseña"
                                        name="new-password"
                                        onChange={(e) =>setnewPassword(e.target.value)}
                                    />
                                </div>

                                <div className="form_group mt-30">
                                    <label htmlFor="repeat-password" className="labelText">
                                        Repetir contraseña
                                    </label>
                                    <input
                                        type="password"
                                        className="form_control"
                                        placeholder="Repetir contraseña"
                                        name="repeat-password"
                                        value={confirmPassword}
                                        onChange={(e) =>setconfirmPassword(e.target.value)}
                                    />

                                    {state.eHandleError && (
                                        <div className="alert_error_edit" style={{ marginTop: 15 }}>
                                            {state.message}
                                        </div>
                                    )}

                                    {!chagePasswordReducer.status && (
                                        <div className="alert_error_edit" style={{ marginTop: 15 }}>
                                            {chagePasswordReducer.message}
                                        </div>
                                    )}

                                    {chagePasswordReducer.status && (
                                        <div
                                            className="alert_success_edit"
                                            style={{ marginTop: 15 }}
                                        >
                                           
                                            {chagePasswordReducer.message}
                                        </div>
                                    )}
                                </div>

                                <button className="btn btn_big btn_orange">
                                    Cambiar contraseña
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


function mapStateToProps(state) {
    const { authReducer, chagePasswordReducer } = state;
    return { authReducer, chagePasswordReducer };
}

const actionCreator = {
    updatePassword: userActions.updatePassword,
    passwordApendris:userActions.passwordApendris
};

const changePasswordComponent = connect(mapStateToProps, actionCreator)(ChangePassword);
export { changePasswordComponent as ChangePassword };
