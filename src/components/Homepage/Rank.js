import React from "react";

const createEmojiMarkup = emoji => {
  return { __html: emoji };
};

class Rank extends React.Component {
  constructor() {
    super();
    this.state = {
      emoji: ""
    };
  }

  setEmoji() {
    fetch(
      `https://fockjyzhr5.execute-api.us-east-1.amazonaws.com/prod/users/create?entries=${this.props.userInfo.entries}`
    )
      .then(res => res.json())
      .then(({ emoji }) => this.setState({ emoji }))
      .catch(err => this.setState({ emoji: "" }));
  }

  componentDidMount() {
    this.setEmoji();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userInfo.entries !== this.props.userInfo.entries) {
      this.setEmoji();
    }
  }

  render() {
    const { userInfo } = this.props;
    return (
      <div className="ma4 mt0 mb3 center">
        <p className="white f2 mt3 center">
          {userInfo.name}, your current rank is...
        </p>
        <div className="white f1 mb2 mt0" style={{ textAlign: "center" }}>
          #{userInfo.entries}{" "}
          <span dangerouslySetInnerHTML={createEmojiMarkup(this.state.emoji)} />
        </div>
      </div>
    );
  }
}

export default Rank;
