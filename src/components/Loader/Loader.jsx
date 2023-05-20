import cl from './Loader.module.css'
import PropTypes from "prop-types"

const Loader = ({loaderType,message,size}) => {

	const svgSize = size ? size === 'small' ? '20px' : size === 'large' ? '60px' : '40px' : '40px';
	const fontSize = size ? size === 'small' ? '16px' : size === 'large' ? '32px' : '24px' : '24px';

	return (
		<div className={cl['loader']}>
			{loaderType && loaderType === 'spinner' && (
				<span className={cl['loader__spinner']}>
					<svg 
						width={svgSize}
						height={svgSize}
						viewBox="0 0 40 40" 
					>
						<path opacity="0.2" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
							s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
							c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
						<path d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
							C22.32,8.481,24.301,9.057,26.013,10.047z">
							<animateTransform attributeType="xml"
								attributeName="transform"
								type="rotate"
								from="0 20 20"
								to="360 20 20"
								dur="0.5s"
								repeatCount="indefinite"/>
						</path>
					</svg>
				</span>
			)}
			<span 
				className={['text text_type_main-default', cl['loader__message']].join(' ')}
				style={{
					fontSize: fontSize,
				}}
			>
				{message ? message : 'Loading...'}
			</span>
		</div>
	)
}

Loader.propTypes = {
	loaderType: PropTypes.oneOf(['spinner', 'message']).isRequired,
	message: PropTypes.string,
	size: PropTypes.oneOf(['small', 'normal', 'large'])
}

export default Loader