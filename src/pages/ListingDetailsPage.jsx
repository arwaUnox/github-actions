import React from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from '@/components/ui';
import ListingDetailsCard from '@/components/ListingDetailsCard';
import useFetch from '@/hooks/useFetch';
import DataRenderer from '@/components/DataRenderer';

function ListingDetailsPage() {
  const { listingId } = useParams();
  const {
    data: listing,
    isLoading,
    error,
  } = useFetch(`/api/listings/${listingId}`);

  return (
    <div className='container py-4'>
      <DataRenderer error={error} isLoading={isLoading}>
        <ListingDetailsCard listing={listing} />
      </DataRenderer>
    </div>
  );
}

export default ListingDetailsPage;
