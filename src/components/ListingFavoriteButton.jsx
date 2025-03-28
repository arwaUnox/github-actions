import { Heart } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import {
  addToFavorite,
  removeFromFavorite,
} from '@/state/slices/listingsSlice';

const ListingFavoriteButton = ({ listing, className }) => {
  const dispatch = useDispatch();

  const favoriteListingIds = useSelector(
    (state) => state.listings.favouriteListingIds,
  );

  const isFavorite = useMemo(
    () => favoriteListingIds?.includes(listing.id),
    [favoriteListingIds, listing],
  );

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFromFavorite(listing.id));
    } else {
      dispatch(addToFavorite(listing.id));
    }
  };
  return (
    <Button variant='outline' className={className} onClick={handleClick}>
      <Heart
        className={cn('h-4 w-4', { 'fill-primary text-primary': isFavorite })}
      />
    </Button>
  );
};

export default ListingFavoriteButton;
