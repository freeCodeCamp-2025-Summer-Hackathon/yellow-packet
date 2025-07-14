/* 
    This is a grouping of pet cards.
    You should USE the <PetCard /> component to build a resizable grid of petcards.
    You should use the Pet Filter function to determine which pets to show in the grid. Consider making those functions in a separate file, but not necessary.
*/
import { useState } from "react";
import PetCard from "./PetCard";
import "../styles/BrowsePets.css"

export default function PetGrid({ filters }){

    // replace with the list of pet objects from db
    const [petList, setPetList] = useState(()=>

    // a pet list I used for testing    
    Array.from({ length: 22 }, (_, i) => ({
        id: i,
        type: i % 2 === 0 ? 'Dog' : 'Cat',
        shelter: i % 3 === 0 ? 'Colorado Shelter' : 'Cali Shelter',
        age: (i % 10) + 1,
        size: ['Small', 'Medium', 'Large'][i % 3],
        sex: i % 2 === 0 ? 'Male' : 'Female',
        favorites: i % 5 === 0,
        name: `Pet ${i + 1}`,
        pic: i % 2 === 0 ? 'https://plus.unsplash.com/premium_photo-1694819488591-a43907d1c5cc?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y3V0ZSUyMGRvZ3xlbnwwfHwwfHx8MA%3D%3D' : 'https://cst.brightspotcdn.com/dims4/default/9e04f85/2147483647/strip/false/crop/5000x2813+0+263/resize/1200x675!/quality/90/?url=https%3A%2F%2Fchorus-production-cst-web.s3.us-east-1.amazonaws.com%2Fbrightspot%2F91%2F13%2Fdd3ccd65438eaec555522479705d%2Fadobestock-236992283.jpg',
    })));

    function toggleFavorite(petId) {
        setPetList(prev =>
            prev.map(pet =>
                pet.id === petId ? { ...pet, favorites: !pet.favorites } : pet
            )
        );
    }

    // properly filter pets
    const filteredPets = petList.filter((pet) => {
        for (const key in filters) {
            const filterValue = filters[key];
            if (filterValue === '' || filterValue === false) continue;

            if (key === "age_stage") {
            // Translate age label to number range
                if (filterValue === "Youth" && pet.age >= 2) return false;
                if (filterValue === "Adult" && (pet.age < 2 || pet.age > 6)) return false;
                if (filterValue === "Senior" && pet.age <= 6) return false;
            } else {
                if (pet[key] !== filterValue) return false;
            }
        }
        return true;
    });

    return ( 
    <section className="pet-grid-section">
        <div className="pet-grid">
        {
            filteredPets.map((pet) => {
                return (
                    <PetCard 
                        name={pet.name} 
                        age={pet.age} 
                        gender={pet.sex} 
                        location={pet.shelter} 
                        type={pet.type} 
                        pic={pet.pic} 
                        isFav={pet.favorites}
                        onToggleFav={() => toggleFavorite(pet.id)}
                    />
                )
            })
        }
        </div>
    </section>
    );
};