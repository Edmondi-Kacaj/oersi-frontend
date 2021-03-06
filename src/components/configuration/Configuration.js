import React from "react";
import { getConfiguration } from "../../service/configuration/configurationService";
import ToastComponent from "../toast/ToastComponent";
import App from "../../App";
import ErrorComponent from "../errorPage/ErrorComponent";

class Configuration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      configData: {},
      isLoaded: false
    };
  }

  async componentDidMount() {
    await getConfiguration("/config/config.json")
      .then(r => r.json())
      .then(dat => {
        this.setState({
          configData: dat,
          isLoaded: true
        });
      })
      .catch(error => {
        this.setState({
          configData: null,
          isLoaded: true
        });
      });
  }

  UNSAFE_componentWillUnmount() {
    this.setState({
      configData: {},
      isLoaded: false
    });
  }

  renderAppComponent() {
    if (this.state.isLoaded && this.state.configData != null) {
      return <App data={this.state.configData} />;
    } else if (this.state.isLoaded && this.state.configData == null) {
      return (
        <>
          <ErrorComponent />
          <ToastComponent
            message={"Something Was wrong and We can't load the page "}
            title={"Error on Load"}
            type={"error"}
          />
        </>
      );
    }
  }

  render() {
    return <>{this.renderAppComponent()}</>;
  }
}

export default Configuration;
