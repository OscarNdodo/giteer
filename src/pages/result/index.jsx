
// import Results from "../../components/Result";
import SearchResult from "../../components/SearchResult";

export function Result() {

    return (
        <main>
            {/* <Header /> */}
            <SearchResult searchQuery={localStorage.getItem("query")} />
            {/* <Results searchQuery="react" /> */}
        </main>
    );
}
