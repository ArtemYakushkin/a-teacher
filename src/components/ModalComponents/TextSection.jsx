const TextSection = ({
	type,
	activeView,
	title,
	text,
	buttonText,
	onToggle,
}) => {
	return (
		<div className={`text ${type} ${activeView === type ? 'active' : ''}`}>
			<h2>{title}</h2>
			<p>{text}</p>
			<button type="button" onClick={onToggle}>
				{buttonText}
			</button>
		</div>
	);
};

export default TextSection;
