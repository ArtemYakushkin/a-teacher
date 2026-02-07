const LogoutModal = ({ onConfirm, onCancel, setLogoutOpen }) => {
	return (
		<div className="modal-backdrop" onClick={() => setLogoutOpen(false)}>
			<div
				className="modal"
				style={{ width: '375px', height: '200px', padding: '20px' }}
				onClick={(e) => e.stopPropagation()}
			>
				<p
					style={{
						fontWeight: 700,
						fontSize: '20px',
						color: 'var(--color-dark)',
						textAlign: 'center',
						marginBottom: '40px',
					}}
				>
					Ви справді хочете вийти?
				</p>

				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						gap: '20px',
					}}
				>
					<button
						style={{
							width: '100px',
							padding: '14px 20px',
							borderRadius: '32px',
							color: 'var(--color-light)',
							background: 'var(--color-accent)',
							fontWeight: 700,
						}}
						onClick={onCancel}
					>
						Ні
					</button>
					<button
						style={{
							width: '100px',
							padding: '14px 20px',
							borderRadius: '32px',
							color: 'var(--color-accent)',
							background: 'transparent',
							border: '1px solid var(--color-accent)',
							fontWeight: 700,
						}}
						onClick={onConfirm}
					>
						Так
					</button>
				</div>
			</div>
		</div>
	);
};

export default LogoutModal;
