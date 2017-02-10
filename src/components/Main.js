require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

var ImageFigure = React.createClass({
  render: function(){
    return (
      <figure>
        <img src={this.props.data.imgUrl} alt={this.props.data.title} className="img-size"/>
        <figcaption>
          <h2>{this.props.data.title}</h2>
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
  render() {

    var controllers = [],
        imgFigures = [];

    imageDatas.forEach(function(value){

      imgFigures.push(<ImageFigure data={value}/>);

    });

    return (
      <section className="stage">
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
