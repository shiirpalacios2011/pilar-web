import { React } from "react";
import {Grid,Paper,Box} from '@mui/material';
import { ManageSearch } from '@mui/icons-material';

const Todo = () => {
  return (
   <Grid container spacing={3}>
    <Grid item md={12} xs={12}>
     <Paper sx={{p: 2}}>
       <Box>
       <ManageSearch/>
          Todo
        </Box>
     </Paper>
    </Grid>
   </Grid>
  );
};


export default Todo;