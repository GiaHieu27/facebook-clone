import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

import SettingsPrivacy from "./SettingsPrivacy";
import DisplayAccessibility from "./DisplayAccessibility";
import HelpSupport from "./HelpSupport";
import userReducer from "../../../redux/reducers/userReducer";

function UserMenu({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [visible, setVisible] = useState(0);

  const logOut = () => {
    Cookies.set("user", "");
    dispatch(userReducer.actions.LOGOUT());
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="mmenu">
      {visible === 0 && (
        <div>
          <Link to="/profile" className="mmenu_header hover3">
            <img src={user?.picture} alt="" />
            <div className="mmenu_col">
              <span>
                {user?.first_name} {user?.last_name}
              </span>
              <span>See your profile</span>
            </div>
          </Link>

          <div className="mmenu_splitter"></div>

          <div className="mmenu_main hover3">
            <div className="small_circle">
              <i className="report_filled_icon"></i>
            </div>
            <div className="mmenu_col">
              <div className="mmenu_span1">Give feedback</div>
              <div className="mmenu_span2">Help us improve facebook</div>
            </div>
          </div>

          <div className="mmenu_splitter"></div>

          <div className="mmenu_item hover3" onClick={() => setVisible(1)}>
            <div className="small_circle">
              <i className="settings_filled_icon"></i>
            </div>
            <span>Settings &amp; privacy</span>
            <div className="rArrow">
              <i className="right_icon"></i>
            </div>
          </div>
          <div className="mmenu_item hover3" onClick={() => setVisible(2)}>
            <div className="small_circle">
              <i className="help_filled_icon"></i>
            </div>
            <span>Help &amp; support</span>
            <div className="rArrow">
              <i className="right_icon"></i>
            </div>
          </div>
          <div className="mmenu_item hover3" onClick={() => setVisible(3)}>
            <div className="small_circle">
              <i className="dark_filled_icon"></i>
            </div>
            <span>Display &amp; Accessibility</span>
            <div className="rArrow">
              <i className="right_icon"></i>
            </div>
          </div>
          <div className="mmenu_item hover3" onClick={logOut}>
            <div className="small_circle">
              <i className="logout_filled_icon"></i>
            </div>
            <span>Logout</span>
          </div>
        </div>
      )}

      {visible === 1 && <SettingsPrivacy setVisible={setVisible} />}
      {visible === 2 && <HelpSupport setVisible={setVisible} />}
      {visible === 3 && <DisplayAccessibility setVisible={setVisible} />}
    </div>
  );
}

export default UserMenu;
