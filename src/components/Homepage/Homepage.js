import React, { Component } from 'react';
import Logo from './Logo/Logo';
import Rank from "./Rank";
import ImageLinkForm from "./ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./FaceRecognition/FaceRecognition"
import Clarifai from "clarifai";

const app = new Clarifai.App({
    apiKey: '3ffb16394ca04e83a3fd7a43b2f201c6'
   });

class Homepage extends Component {
  constructor(){
    super();
    this.state = {
      usedUrl : "",
      box : []
    }
  }
  
  calculateBox(currentUrl){    
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", currentUrl)
      .then( respond => {
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        var dataArray = respond.outputs[0].data.regions
        var currentbox =[]
        for (var data of dataArray){
          var clarifaiFace = data.region_info.bounding_box;
          currentbox.push( 
            {leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)}
          );
        } this.props.updateUserRank(dataArray.length);
        this.setState({box: currentbox});
      }).catch(console.log);
}

  onConfirmClick = () =>{
    var urlLink = document.getElementById("urllink");
    var currentUrl=  urlLink.value;
    this.setState({usedUrl : currentUrl ,box:[]});

    this.calculateBox(currentUrl);
  };

  render() {
    const {usedUrl,box} = this.state;
    return (<div>
        <Logo/>
        <Rank userInfo={this.props.userInfo} />
        <ImageLinkForm onConfirmClick={this.onConfirmClick} />
        <FaceRecognition usedUrl={usedUrl} box ={box}/>
    </div>  
    );
  }
}

export default Homepage;
