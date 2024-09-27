export const generatePaginationNumbers = (currentPage:number, totalPages: number) => {

    //if totalPages <= 7 / show all pages without '...'
    if( totalPages <= 7) {
       return Array.from({length: totalPages}, (_,i) => i +1) //[1,2,3,4,5,6,7]
    }

    // if totalPages > 7 &  1< currentPage< 3 / show the first 3 pages, ..., the last 2 pages
    if( currentPage <=3){
        return [1,2,3,'...', totalPages -1,  totalPages];//[1,2,3,'...',29,30]
    }

    // if currentPage is between the last 3 pages / show the first 2 pages, ..., the last 3 pages
    if(currentPage >= totalPages -2){
        return [1,2,'...', totalPages -2, totalPages -1, totalPages]; //[1,2,'...',28,29,30]
    }
    // if currentPage is in the middle of totalPages / show the first 1 page, ...; currentPage + nearby pages
    return [1, '...', currentPage -1, currentPage, currentPage +1,'...',totalPages];
}
