import ListItems from "./ListItems";

const Home = () => {
//   const { error, isPending, data: batteries } = useFetch('https://f2byongc84.execute-api.eu-central-1.amazonaws.com/webdev_test_fetch_batteries')

  return (
    <div >
   <div className='header'>
        <h1>Battery Monitoring System</h1>
        <h5>- Powered by Bamomas</h5>
      </div>
      <ListItems/>
    </div>
  );
}
 
export default Home;