import ListingCard from './ListingCard';
import { Link } from 'react-router-dom';
const ListingList = ({ listings }) => {
  return (
    <div className='flex flex-wrap justify-center gap-5'>
      {listings.length > 0 ? (
        listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))
      ) : (
        <p>No Listings Found</p>
      )}
    </div>
  );
};

export default ListingList;
