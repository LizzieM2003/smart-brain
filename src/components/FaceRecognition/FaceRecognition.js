import React from 'react';
import './FaceRecognition.css';

const faceRecognition = ({ imageUrl, boxes }) => {
  const faces = boxes.map(box => {
    return (
      <div
        className="bounding-box"
        style={{
          top: box.topRow,
          right: box.rightCol,
          bottom: box.bottomRow,
          left: box.leftCol
        }}
      />
    );
  });
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="inputimage"
          src={imageUrl}
          alt="Process for faces"
          width="500px"
          height="auto"
        />
        {faces}
      </div>
    </div>
  );
};

export default faceRecognition;
