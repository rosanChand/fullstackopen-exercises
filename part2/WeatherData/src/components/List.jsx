import Detail from "./Detail";
import { useState, useEffect } from "react";

const List = ({ data, search }) => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [showDetail, setShowDetail] = useState(false); 

    const searchList = data.filter(dataItem =>
        dataItem.name.common.toLowerCase().includes(search.toLowerCase())
    );

    const handleShow = (id) => {
        const country = searchList.find(item => item.cca3 === id);
        console.log(searchList)
        console.log('country',[country])
        setSelectedCountry([country]);
        setShowDetail(true)
        console.log('after',selectedCountry)
    };

    // useEffect(() => {
    //     if (searchList.length == 1 && !selectedCountry ) {
    //         setSelectedCountry(searchList);
    //         setShowDetail(true)
    //     }
    // }, [searchList]);
   

    if (!showDetail && searchList.length > 1) {
        return searchList.slice(0, 10).map(country => (
            <p key={country.cca3}>
                {country.name.common}{' '}
                <button onClick={() => handleShow(country.cca3)}>show</button>
            </p>
        ));
    } 

       if (searchList.length === 1){
        return <Detail searchList={searchList} />;
       }else 
        return <Detail searchList={selectedCountry} />;
    
};

export default List;