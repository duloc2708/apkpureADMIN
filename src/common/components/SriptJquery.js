class SriptJquery extends React.Component {
	componentDidMount() {
		$('#script_livestream').remove()
		const s = document.createElement('script');
		s.type = 'text/javascript';
		s.src = '/js/livestream.js?v=1.2.34';
		s.setAttribute("id", "script_livestream");
		s.async = true;
		document.body.appendChild(s);
	}
	componentDidUpdate() {
		$('#script_livestream').remove()
		const s = document.createElement('script');
		s.type = 'text/javascript';
		s.src = '/js/livestream.js?v=1.2.34';
		s.setAttribute("id", "script_livestream");
		s.async = true;
		document.body.appendChild(s);
	}
	render() {
		return (
			<div style={{ "display": "none" }}>
			</div>
		)
	}
}
module.exports = SriptJquery