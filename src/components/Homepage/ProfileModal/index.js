import React, { Component } from "react";
import Modal from "../../Modal";

import "./ProfileModal.css";

class ProfileModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  onInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = () => {
    const { toggleHandler, onSubmitUpdate } = this.props;
    onSubmitUpdate(this.state);
    toggleHandler();
  };

  render() {
    const { toggleHandler, isShown, userInfo } = this.props;
    return (
      isShown && (
        <Modal>
          <div className="profile-modal">
            <article className="br3 ba b--black-10 mv4 pa3 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
              <div className="modal-close" onClick={() => toggleHandler()}>
                &times;
              </div>
              <main className="pa4 black-80 w-80 center">
                <img
                  src="http://tachyons.io/img/logo.jpg"
                  className="h3 w3 dib"
                  alt="avatar"
                />
                <h1>{userInfo.name}</h1>
                <h4>{`Images submitted: ${userInfo.entries}`}</h4>
                <p>{`Member since: ${new Date(
                  userInfo.joined
                ).toLocaleDateString()}`}</p>
                <hr />
                <label className="mt2 fw6" htmlFor="user-name">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={this.onInputChange}
                  className="pa2 ba w-100"
                  placeholder={userInfo.name}
                ></input>
                <div
                  className="mt4"
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <button
                    onClick={this.onSubmit}
                    className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
                  >
                    Save
                  </button>
                  <button
                    className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
                    onClick={() => toggleHandler()}
                  >
                    Cancel
                  </button>
                </div>
              </main>
            </article>
          </div>
        </Modal>
      )
    );
  }
}

export default ProfileModal;
