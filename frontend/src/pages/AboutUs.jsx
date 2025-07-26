import Header from '../components/Header';
import Navbar from '../components/Navbar';
import "../styles/AboutUs.css";
import maya from '../images/maya.png';

function AboutUs({ user, setUser }) {
	return (
		<>
			<div className="about-container">
				<Header user={user} setUser={setUser} />
				<Navbar />
				<main className="main-content">
					<h1 className='head'>About Us</h1>
					<p>
						This site is a service to match prospective adopters with shelters and pets.
					</p>
					
					<h4 className='head'>Our Team</h4>
					<p>We are a team of freeCodeCampers who build this site as a part of freeCodeCamp's 2025 summer hackathon.</p>
					<ul>
						<li><a href='https://github.com/qvd808'>Dang Quang Vinh</a></li>
						<li><a href='https://github.com/uhohgio'>Giovanna Ehrig</a></li>
						<li><a href='https://github.com/adamocamb'>Adam O'Camb</a></li>
						<li><a href='https://github.com/jomarrumbawa'>Jomar Rumbawa</a></li>
						<li><a href='https://github.com/JackSawyerWATX'>Jack Sawyer</a></li>
						<li><a href='https://github.com/MinMyatMaung'>Min Myat Maung/Ricky</a></li>
						<li><a href='https://github.com/paul-b-dev232'>Paul Barton</a></li>
						<li><a href='https://github.com/BDubDesigns'>BDubDesigns</a></li>
						<li><a href='https://github.com/melkyy'>Aaron Rodriguez</a></li>
						<li><a href='https://github.com/thomas1424'>Thomas Pan</a></li>
						<li><a href='https://github.com/thegreatdunzle'>thegreatdunzle</a></li>
						<li><a href='https://github.com/JakeHaverOfCatz'>Jake Johnson</a></li>
						<li><a href='https://github.com/jacqrocha'>Jackie</a></li>
						<li><a href='https://github.com/kunyoungahhh'>kunyoungahhh</a></li>
					</ul>
					<h4>Lead Couch Warmer: Maya</h4>
					<img src={maya} alt='Dog on a couch' className='dog'/>
				</main>
			</div>
		</>
	);
}

export default AboutUs
