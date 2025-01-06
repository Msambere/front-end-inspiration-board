import PropTypes from 'prop-types';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SortingButtons = ({options, setSortOrder, setSortValue, sortValue, sortOrder}) => {
    const menuItems = options.map((option) => {
        return (
            <MenuItem key={option} value={option}>{option}</MenuItem>
        )});


    const handleSortValueChange = (event) => {
        setSortValue(event.target.value);
        console.log("Current sort value: ", event.target.value);
    };

    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
        console.log("Current sort order: ", event.target.value);
    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="sort-by-label">Sort By:</InputLabel>
            <Select
                labelId="sort-by-label"
                id="sort-by-options"
                value={sortValue}
                onChange={handleSortValueChange}
                autoWidth
                label="Sort by:"
            >
                {menuItems}
            </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 100 }}>
            <InputLabel id="sort-order-label">Sort Order:</InputLabel>
            <Select
                labelId="sort-order-label"
                id="sort-order-options"
                value={sortOrder}
                onChange={handleSortOrderChange}
                autoWidth
                label="Sort Order:"
            >
                <MenuItem value={"asc"}>Ascending</MenuItem>
                <MenuItem value={"desc"}>Descending</MenuItem>
            </Select>
            </FormControl>
        </div>
    );
}

SortingButtons.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    setSortOrder: PropTypes.func.isRequired,
    setSortValue: PropTypes.func.isRequired,
    sortValue: PropTypes.string.isRequired,
    sortOrder: PropTypes.string.isRequired
};

export default SortingButtons;