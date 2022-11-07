import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, Snackbar } from '@mui/material';
import { Add, Done, DoneAll, Edit } from '@mui/icons-material';
import { addCustomerDetails, deleteCustomerDetails, editCustomerDetails } from '../features/actions';
import Delete from '@mui/icons-material/Delete';

const Customers = () => {
  const dispatch = useDispatch()
  const rows = useSelector((state) => state.customer.customerReducer.customerList)
  const [add, setAdd] = useState(false);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [isDisable, setDisable] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [localState,setLocalState] = useState(rows)
  const [newAdd, setNewAdd] = useState({
    sequence : localState.length+1,
    cusGroup: '',
    cusName : '',
  })

  const handleClose = (event, reason) => {
    if(reason === "clickaway"){
      return;
    }
    setOpen(false);
  };
  const handleAdd = (cusGroup, cusName) => {
    setAdd(true);
  }
  const handleEdit = () => {
    setEdit(!edit);
    setDisable(false);
  }
  const handleSave = (e, index) => {
    setEdit(!edit);
  }

  const editDetailsSave = (index) => {
    dispatch(editCustomerDetails(index, localState[index]))
  }
  
  const handleCusGroupChange = (value, index) => {
    const newState = localState.map(obj => {
      if(obj.sequence === index+1) {
        return {...obj, cusGroup: value}
      }
      return obj;
    })
    setLocalState(newState)
  }
  const handleCusNameChange = (value, index) => {
    const newState = localState.map(obj => {
      if(obj.sequence === index+1) {
        return {...obj, cusName: value}
      }
      return obj;
    })
    setLocalState(newState)
  }
  const handleAddNewCusGroup = (value) => {
    setNewAdd((prevState) => ({
      ...prevState,
      cusGroup: value,
    }
    ))
  }
  const handleAddNewCusName = (value) => {
    setNewAdd((prevState) => ({
      ...prevState,
      cusName: value,
    }
    ))
  }
  
  const handleCancel = () => {
    setShowConfirm(false);
  }
  const handleAddNewElement = () => {
    setEdit(!edit);
    dispatch(addCustomerDetails(newAdd))
  }

  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sequence</TableCell>
            <TableCell >Customer Group</TableCell>
            <TableCell >Customer Name</TableCell>     
            <TableCell >Action</TableCell>     
            </TableRow>
        </TableHead>
        {/* //This table body is loaded when the edit mode is ON */}
        {edit ? (
          <>
        <TableBody>     
          {rows.map((row, index) => {
          return (
            <TableRow
              key={row.sequence}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.sequence}
              </TableCell>
              <TableCell align="right"><Input defaultValue={row.cusGroup} disabled= { isDisable } onChange={(e) => handleCusGroupChange(e.target.value, index)}/></TableCell>
              <TableCell align="right"><Input defaultValue={row.cusName} disabled= { isDisable }  onChange={(e) => handleCusNameChange(e.target.value, index)}/></TableCell>
              <TableCell>
                <Button variant="outlined" color="success" startIcon={<Delete />} onClick = { () => {
                setShowConfirm(true)
              }} />
              <Button variant="outlined" color="success" endIcon={<Done />} onClick = { (e) => {
                editDetailsSave(index)
              }} />
              </TableCell>

              {/* Dialogue box for the dele click  */}
              {showConfirm && (
                      <div>
                        <Dialog
                          open={showConfirm}
                          onClose={handleCancel}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            {"Confirm Delete"}
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              Are you sure to delete
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              onClick={() => {
                                setShowConfirm(false)
                                dispatch(deleteCustomerDetails({ index: index }))
                              }
                            }
                              color="primary"
                              autoFocus
                            >
                              Yes
                            </Button>
                            <Button
                              onClick={handleCancel}
                              color="primary"
                              autoFocus
                            >
                              No
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </div>
                    )}
            </TableRow>
          )})}
          {add && (
            <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row"></TableCell>
            <TableCell align="right" defaultValue='customer group' onChange={(e) => {
              handleAddNewCusGroup(e.target.value)
            } } ><Input /></TableCell>
            <TableCell align="right" defaultValue='customer group' onChange={(e) => {
              handleAddNewCusName(e.target.value)
            } }><Input /></TableCell>
            <TableCell>
            <Button variant="outlined" color="success" endIcon={<Done />} onClick={handleAddNewElement} />
            </TableCell>
            </TableRow>
          )}
        </TableBody>
      {rows.length !== 0 && (
        <>
        <Button variant="outlined" startIcon={<Add />}  onClick={ handleAdd }>
        Add
      </Button>
        <Button variant="outlined" color="success" startIcon={<DoneAll />} onClick={handleSave}>
          SAVE
          </Button>
          </>
      )}
      </>
        
        ):(
          //This table body is loaded when the edit mode is OFF
        <> 
        <TableBody>
          <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          // className={classes.snackbar}
        >
          <Alert onClose={handleClose} severity="success">
            Customer Details updated!!!!!
          </Alert>
        </Snackbar>   
        
        {/* Table data displayed */}
            {rows.map((row, index) => {
          return (
            <TableRow
              key={row.sequence}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.sequence}
              </TableCell>
              <TableCell align='justify'>{row.cusGroup}</TableCell>
              <TableCell align='justify'>{row.cusName} </TableCell>
              <TableCell><Button disabled variant="outlined" color="success" startIcon={<Delete />} /></TableCell>
            </TableRow>
          )})}
        </TableBody>
        <Button variant="outlined" startIcon={<Edit />} onClick={handleEdit} >
          Edit
        </Button>
        </>
        )}
      </Table>
      
    </TableContainer>  
  </>
  )
}

export default Customers