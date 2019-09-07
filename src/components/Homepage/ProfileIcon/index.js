import React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { URL } from "../../../App";

class ProfileIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  render() {
    const { dropdownOpen } = this.state;
    const { toggleProfileModal, onchangeRoute } = this.props;
    return (
      <div className="pa4 tc">
        <Dropdown isOpen={dropdownOpen} toggle={this.toggle}>
          <DropdownToggle
            tag="span"
            onClick={this.toggle}
            data-toggle="dropdown"
            aria-expanded={dropdownOpen}
          >
            <img
              src="http://tachyons.io/img/logo.jpg"
              className="br-100 h3 w3 dib"
              alt="avatar"
            />
          </DropdownToggle>
          <DropdownMenu
            className="b--transparent shadow-5"
            style={{
              right: "0",
              marginTop: "20px",
              backgroundColor: "rgba(255, 255, 255, 0.5)"
            }}
            right
          >
            <DropdownItem onClick={toggleProfileModal}>
              View Profile
            </DropdownItem>
            <DropdownItem
              onClick={async () => {
                onchangeRoute("signinPage");
                await fetch(URL + "/signout", {
                  method: "get",
                  headers: {
                    "Content-type": "application/json",
                    Authorization: window.localStorage.getItem("idToken")
                  }
                });
                window.localStorage.removeItem("idToken");
              }}
            >
              Sign Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

export default ProfileIcon;
