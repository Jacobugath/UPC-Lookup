
import './App.css';
import axios from 'axios';
import React, {useState} from 'react';

function App() {

  const [upc, setUpc] = useState('');
  const [data, setData] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) =>{
    e.preventDefault();
    setError('');
    setUpc(e.target.value);
  }

  const handleClick = () =>{
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.upcdatabase.org/product/${upc}?apikey=9EB58F7CDB0B5C727E60BA5FFBA14291`).then(res =>{
      if(res.data.success){
      console.log(res.data);
      setError('');
      setData(res.data);
      }
      else{
        setData('');
        setError('No Results');
      }
  }).catch(e =>{
    console.log(e);
    setData('');
    setError('No Results');
  })

  }
  
  return (
    <div className="App">
      <div className='h1'>
        <div className='hcon'>
        <p>UPC LOOKUP</p>
        
        </div>
      </div>
      <div className='con'>
        <input type='text' placeholder ='Enter UPC...' onChange={handleChange} value={upc}/>
        <button onClick={handleClick}>search</button>
      </div>
      { data && <div className='dcon'>
        <h2>{data.title}</h2>
        <br></br>
        <p>Barcode: {data.barcode}</p>
      </div>}
      {error && <div className='dcon'>
        <h2>{error}</h2>
        </div>}
      
    </div>
  );
}

export default App;
