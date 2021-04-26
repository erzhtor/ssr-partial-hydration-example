import React from "react";
import ReactDOM from "react-dom";

const isBrowser = () => typeof window !== "undefined" && !!window.document;

const hydrateInstances = (Component, hid) => {
    document
        .querySelectorAll(`script[data-hid="${hid}"]`)
        .forEach((element) => {
            const props = JSON.parse(element.innerHTML);

            ReactDOM.hydrate(
                <Component {...props} />,
                element.nextElementSibling
            );
        });
};

const withHydration = (Component, hid) => {
    if (isBrowser()) {
        return hydrateInstances(Component, hid);
    }

    return (props) => (
        <>
            <script
                type="text/json"
                data-hid={hid}
                dangerouslySetInnerHTML={{ __html: JSON.stringify(props) }}
            />
            <Component {...props} />
        </>
    );
};

export const hydrated = (components) => {
    const Hydrated = {};
    Object.entries(components).forEach(([name, Component]) => {
        Hydrated[name] = withHydration(Component, name);
    });
    return Hydrated;
};
