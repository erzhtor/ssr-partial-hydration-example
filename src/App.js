import React from "react";

import "./App.css";

const Section = ({ title, children }) => (
    <section className="Section">
        <h2>{title}</h2>
        <button onClick={() => alert(`clicked`)}>Click me</button>
        <div>{children}</div>
    </section>
);

function App(props) {
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <Section title="Dynamic Section">
                    {JSON.stringify(props)}
                </Section>
            </header>
        </div>
    );
}

export default App;
