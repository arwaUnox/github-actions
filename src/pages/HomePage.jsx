import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import api from '@/api';
import { useAuthContext } from '@/components/AuthProvider';
import DataRenderer from '@/components/DataRenderer';
import ListingFilters from '@/components/ListingFilter';
import ListingList from '@/components/ListingList';
import { Separator, Spinner } from '@/components/ui';
import { fetchListings } from '@/state/slices/listingsSlice';
function HomePage() {
  const [filters, setFilters] = useState({
    dates: undefined,
    guests: 0,
    search: '',
  });

  const fetchOptions = useMemo(
    () => ({
      params: filters,
    }),
    [filters],
  );
  const { listings, error, status } = useSelector((state) => state.listings);
  const dispatch = useDispatch();

  const handleFilters = useCallback((filters) => {
    setFilters(filters);
  }, []);
  useEffect(() => {
    const request = dispatch(fetchListings(fetchOptions));

    return () => {
      request.abort();
    };
  }, [dispatch, fetchOptions]);

  return (
    <>
      <ListingFilters onChange={handleFilters} />
      <Separator />
      <DataRenderer isLoading={status === 'loading'} error={error}>
        <ListingList listings={listings} />
      </DataRenderer>
    </>
  );
}

export default HomePage;
