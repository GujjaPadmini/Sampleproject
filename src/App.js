import React ,{useState}from 'react'
import './App.css'
import { IconButton, MenuItem ,Menu} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const App = () => {
  const [singleList, setSingleList] = useState("");
  const [lists, setLists] = useState([]);
  const [editId, setEditId] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
 
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const open = Boolean(anchorEl);
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (editId) {
      const editList = lists.find((i) => i.id === editId);
      const updatedLists = lists.map((t) =>
        t.id === editList.id
          ? (t = { id: t.id, singleList })
          : { id: t.id, singleList: t.singleList }
      );
      setLists(updatedLists);
      setEditId(0);
      setSingleList("");
      return;
    }

    if(singleList !==''){
      setLists([{ id: `${singleList}-${Date.now()}`, singleList }, ...lists])
      setSingleList("");
    }
   }
   const handleDelete = (id) => {
    const delList = lists.filter((to) => to.id !== id);
    setLists([...delList]);
   
  };
  const handleEdit = (id) => {
    const editList = lists.find((i) => i.id === id);
    setSingleList(editList.singleList);
    setEditId(id);
  };
  
  return (
    <div className='container'>
      <div className='block'>
        <h1>Students</h1>
      <form  className='inputform' onSubmit={handleSubmit}>
      <input type='text' placeholder='Enter A Name' className='input' value={singleList} onChange={(e) => setSingleList(e.target.value)}  />
      <button type='submit' className='buttonAdd' > {editId ? "Edit" : "Add"}</button>
       </form> 
       
       <ul className='allLists'>
        {lists.map((t)=>(
          <li className='singlelist'>
          <span className='listetxt' key={t.id}> {t.singleList}  </span>
         
          <IconButton
        aria-label="more"
        onClick={handleClick}
        aria-haspopup="true"
        aria-controls="long-menu"
      >
        <MoreVertIcon />
      </IconButton>
     
       <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
       
      >
        <MenuItem  onClick={()=>handleEdit(t.id)}>Edit</MenuItem>
        <MenuItem onClick={()=>handleDelete(t.id)}>Delete</MenuItem>
        
      </Menu>
      {/* <button onClick={()=>handleEdit(t.id)} className='buttonAdd'>
                  EDIT
              </button>
            
              <button onClick={()=>handleDelete(t.id)} className='buttonAdd'>
                  DELETE
              </button> */}
      </li>
        ))}
         

       </ul>
        </div>
      </div>
  )
}

export default App