import React from "react";
import ReactDOM from "react-dom";
import { createCache, createResource } from "react-cache";

let cache = createCache();
let BookCollectionResource = createResource(() =>
  fetch("https://www.googleapis.com/books/v1/volumes?q=software").then(res =>
    res.json()
  )
);

function MyList({ className, component: Component = "li", ...props }) {
  return <li className={["list-item", className].join(" ")} {...props} />;
}

// function onClick() {

//   const url = "https://www.googleapis.com/books/v1/volumes?q=quilting";
//   if (this.state.query.length > 0) {
//     fetch(url)
//       .then(res => res.json())
//       //.then(x => console.log(x.hits[0]))
//       .then(data => this.setState({ hits: data.hits, loading: false }));
//   }
// };

function BookList() {
  return (
    <ul className="list-group">
      {" "}
      {BookCollectionResource.read(cache).items.map(item => (
        <MyList className="list-group-item" key={item.volumeInfo.title}>
          {item.volumeInfo.title}, {item.volumeInfo.authors}
        </MyList>
      ))}
    </ul>
  );
}

function App() {
  return (
    <div>
      <h1>Books on software:</h1>
      <React.Suspense fallback={<div>Loading...</div>}>
        <BookList />
      </React.Suspense>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
