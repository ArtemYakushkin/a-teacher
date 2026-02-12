const Tabs = ({ activeTab, setActiveTab }) => {
	return (
		<div className="tabs">
			<button
				className={activeTab === 'courseABC' ? 'active' : ''}
				onClick={() => setActiveTab('courseABC')}
			>
				Курс ABC
			</button>
		</div>
	);
};

export default Tabs;
