import React from "react";

import { hydrated } from "./hydration";

import "./App.css";

const Section = ({ title, children }) => (
    <section className="Section">
        <h2>{title}</h2>
        <button onClick={() => alert(`clicked on "${title}"`)}>Click me</button>
        <div>{children}</div>
    </section>
);

const AnotherSection = ({ title, children }) => (
    <section className="Section">
        <button onClick={() => alert(`clicked on "${title}"`)}>Click me</button>
        <h2>{title}</h2>
        <div>{children}</div>
    </section>
);

const Hydrated = hydrated({ Section, AnotherSection });

function App(props) {
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <Hydrated.Section title="Dynamic Section 1">
                    {JSON.stringify(props)}
                </Hydrated.Section>
                <Section title="Static Section">
                    {JSON.stringify(props)}
                </Section>
                <Hydrated.Section title="Dynamic Section 2">
                    {JSON.stringify(props)}
                </Hydrated.Section>
                <AnotherSection title="Another Section">
                    {JSON.stringify(props)}
                </AnotherSection>
                <Hydrated.AnotherSection title="Another Dynamic Section">
                    {JSON.stringify(props)}
                </Hydrated.AnotherSection>
            </header>
        </div>
    );
}

export default App;
