import BookCard from "./components/BookCard";
import LibraryHeader from "./components/LibraryHeader";


function App() {
    return (
        <div>


<LibraryHeader title="ჩემი ბიბლიოთეკა" totalBooks={2} />

<BookCard
  title="ვეფხისტყაოსანი"
  author="შოთა რუსთაველი"
  price={25}
  isBestSeller={true}
  categories={["პოეზია", "კლასიკა"]}
/>

<BookCard
  title="დათა თუთაშხია"
  author="ჭაბუა ამირეჯიბი"
  price={30}
  categories={["რომანი"]}
            />
        </div>

    );
}

export default App;

