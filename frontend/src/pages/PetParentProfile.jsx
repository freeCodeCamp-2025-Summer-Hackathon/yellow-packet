/* LOWER PRIORITY

	This is an idea, but we may not..

*/

import Header from '../components/Header';
import Navbar from '../components/Navbar';

function PetParentProfile(user) {

	if (!user) {
		// go to login page -> They have to login to view profile ofc
		return;
	}

	return (
		<>
			<div>
				<Header />
				<Navbar />
				{/* Should include a parent profile that is editable by people interested in adopting*/}
			</div>
		</>
	);
}

export default PetParentProfile;
