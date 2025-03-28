import { Search } from 'lucide-react';
import { Button, DateRangePicker, Input, Stepper } from '@/components/ui';
import { useState, memo } from 'react';
const ListingFilters = ({ onChange }) => {
  const [search, setSearch] = useState('');
  const [dates, setDates] = useState();
  const [guests, setGuests] = useState(0);
  const handleSubmit = () => {
    onChange({ search: search, dates: dates, guests: guests });
  };
  return (
    <div className='flex flex-row items-center justify-center gap-2 p-6'>
      <Input
        className='w-[400px]'
        placeholder='Search destinations'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <DateRangePicker
        placeholder='Add dates'
        minDate={new Date()}
        onChange={setDates}
        value={dates}
      />
      <Stepper value={guests} onChange={setGuests} />
      <Button onClick={handleSubmit}>
        <Search className='h-4 w-4' />
      </Button>
    </div>
  );
};

export default memo(ListingFilters);
