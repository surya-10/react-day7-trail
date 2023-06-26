import Base from "./base";

function Home(){
    return (
        <Base
        name={"welcome to Admin Dashboard"}
        description={"Check out all pages to add new data or update existing data"}>
        <div className="home-div">
            <img src="https://www.simplilearn.com/ice9/free_resources_article_thumb/What_is_Data_Types_of_Data_and_How_To_Analyze_Data.jpg"/>
        </div>
        </Base>
    )
}
export default Home;
