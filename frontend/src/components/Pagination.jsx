import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function createArrayOfSize(n) {
    return new Array(n).fill(0);
  }
  
  function Pagination({totalPages,currentPage,handlePageChange}) {
    let pages = createArrayOfSize(totalPages).map((a, i) => 
      <Button variant="outlined"
      key={i} 
      onClick={()=>handlePageChange(i+1)}
      disabled={currentPage==i+1}
      >{i+1}</Button>
    );
    return <Stack direction="row" spacing={2}>{pages}</Stack>;
  }
  
  export default Pagination;