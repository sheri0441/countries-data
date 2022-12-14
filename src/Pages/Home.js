import { useState } from 'react';
import Card from '../Components/Card';
import Form from '../Components/Form';
import Preloader from '../Components/Preloader';


const Home = ({data}) => {
  const [search, setSearch] = useState('');
  const [continent, setregion] = useState('');
 
  
  const countryList = (data && data.filter(a => { 
    if (a.name.common.toLowerCase().includes(search.toLowerCase()) && a.region.toLowerCase().includes(continent)){
      return a.name
    }
  }))

 
  window.scrollTo(0, 0);
  
  return(
    <div className='px-5 pt-20 pb-14'>
          <Form setSearch={setSearch} setregion={setregion} />
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 md:mt-9 gap-5 lg:gap-12'>
            {countryList && 
              countryList.map((a, index) => {
                return(
                  <Card content={a} key={index} />
                  )
              })
            }
          </div>
        </div>
    )
}


export default Home;