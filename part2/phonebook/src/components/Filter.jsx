const Filter = ({searchName,handleSearch})=>{
    return <p>filter shown with <input value={searchName} onChange={handleSearch} /></p>
}
export default Filter