import { React } from "react";
import {Grid,Paper,Box} from '@mui/material';
import { ManageSearch } from '@mui/icons-material';
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { appSelector,appActions } from '../../redux/appRedux';

const FetchList = () => {
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(appActions.setPageTitle("LISTA"))
},[])

  return (
   <Grid container spacing={3}>
    <Grid item md={12} xs={12}>
     <Paper sx={{p: 2}}>
       <Box>
          <ManageSearch/>
          FetchList
        </Box>
     </Paper>
    </Grid>
   </Grid>
  );
};


export default FetchList;