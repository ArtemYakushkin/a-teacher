import React from 'react';

const Background = ({ activeView }) => {
	return <div className={`card ${activeView === 'login' ? 'login' : ''}`} />;
};

export default Background;
