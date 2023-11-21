'use client'

import ListingCard from './listings/ListingCard';

interface ArraySlicerProps {
  listings: any[]; 
  currentUser: any; 
}

const ArraySlicer: React.FC<ArraySlicerProps> = ({ listings, currentUser }) => {
  const slicedListings = listings.slice(0, 3);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {slicedListings.map((listing, index) => (
        <ListingCard 
        currentUser={currentUser} 
        key={listing.id} 
        data={listing} 
        startDelay={index * 5000}
        />
      ))}
    </div>
  );
}

export default ArraySlicer;
