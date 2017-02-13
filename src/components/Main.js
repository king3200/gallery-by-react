require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';

var ImageFigure = React.createClass({
  render() {
    return (
      <figure className="img-fig">
        <img src={this.props.data.imgUrl} alt={this.props.data.title} className="img-size"/>
        <figcaption>
          <h2 className="title-fig">{this.props.data.title}</h2>
        </figcaption>
      </figure>
    )
  }
});


var imageDatas = require('../data/ImageData.json');
imageDatas = ((imageDatas) => {
  for(var i = 0, j = imageDatas.length; i < j; i++){
    var singleData = imageDatas[i];
    singleData.imgUrl = require('../images/' + singleData.fileName);
    imageDatas[i] = singleData
  }

  return imageDatas;

})(imageDatas);

class AppComponent extends React.Component {

  constructor(props) {
    super(props);

    this.constant = {
      centerPos: {
        left: 0,
        right: 0
      },
      hPosRange: {
        leftSecX: [0, 0],
        rightSecX: [0, 0],
        y: [0, 0]
      },
      vPosRange: {
        x: [0, 0],
        topY: [0, 0]
      }
    }

    this.state = {
      imgsArrangeArr: [

      ]
    }
  }

  componentDidMount() {
    var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
        stageWidth = stageDOM.scrollWidth,
        stageHeight = stageDOM.scrollHeight,
        halfStageW = Math.ceil(stageWidth / 2),
        halfStageH = Math.ceil(stageHeight / 2);

    var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
        imgWidth = imgFigureDOM.scrollWidth,
        imgHeight = imgFigureDOM.scrollHeight,
        halfImgWidth = Math.ceil(imgWidth / 2),
        halfImgHeight = Math.ceil(imgHeight / 2);

    this.constant.centerPos = {
      left: halfStageW - halfImgWidth,
      top: halfStageH - halfImgHeight
    };

    this.constant.hPosRange.leftSecX[0] = -halfImgWidth;
    this.constant.hPosRange.leftSecX[1] = halfStageW - halfImgWidth * 3;
    this.constant.hPosRange.rightSecX[0] = halfStageW = halfImgWidth;
    this.constant.hPosRange.rightSecX[1] = stageWidth - halfImgWidth;
    this.constant.hPosRange.y[0] = -halfImgHeight;
    this.constant.hPosRange.y[1] = stageHeight - halfImgHeight;

    this.constant.vPosRange.topY[0] = -halfImgHeight;
    this.constant.vPosRange.topY[1] = halfStageH - halfImgHeight * 3;
    this.constant.vPosRange.x[0] = halfImgWidth - imgWidth;
    this.constant.vPosRange.x[1] = halfImgWidth;

    this.rearrange(0);
  }

  rearrange(centerIndex) {

  }

  render() {

    var controllers = [],
        imgFigures = [];

    imageDatas.forEach(function(value, index){
      if(!this.state.imgsArrangeArr[index]){
        this.state.imgsArrangeArr[index] = {
          pos:{
            left: 0,
            top: 0
          }
        }
      }

      imgFigures.push(<ImageFigure data={value} ref={"imgFigure" + index}/>);

    }.bind(this));

    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {controllers}
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
