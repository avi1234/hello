import "./App.css";

fetch("https://catfact.ninja/fact").then((res) => res.json()).then((data) => {
    console.log(data);
});

function App() {
    return (
        <div className="App">
            <button>Generate Cat Fact</button>
            <p></p>
        </div>
    );
}

export default App;