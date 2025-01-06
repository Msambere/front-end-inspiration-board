const sortData = (data, sortOptions, sortValue, sortOrder) => {
    const key = sortOptions[sortValue];
    let sortedData;
    if (data === null || data.length === 0) {
        return data;
    }
    if (typeof data[0][key] === "string") {
        sortedData = data.toSorted((a, b) => {
            return sortOrder === "asc" ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]);

        });
    } else {
        sortedData = data.toSorted((a, b) => {
            return sortOrder === "asc" ? a[key] - b[key] : b[key] - a[key];
        });
    }
    return sortedData;
}
export default sortData;