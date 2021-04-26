import path from "path";
import fs from "fs";

import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";

import App from "../src/App";

const PORT = 8080;
const app = express();

const router = express.Router();

const initialProps = {
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Donec gravida tincidunt euismod. Mauris lacus mi, vulputate eget sem
    vitae, imperdiet consectetur urna. In ante sapien, mattis eu nisi ut,
    malesuada fringilla massa. Ut pulvinar, quam quis interdum convallis,
    sem dolor ullamcorper lacus, vel tristique felis nunc in risus.
    Duis ex dolor, commodo vitae metus ac, egestas tincidunt turpis.
    Morbi leo quam, ornare molestie pellentesque interdum, euismod ut magna.
    Aliquam tincidunt orci vulputate interdum varius.`,
};

const serverRenderer = (req, res, next) => {
    fs.readFile(path.resolve("./build/index.html"), "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("An error occurred");
        }
        return res.send(
            data.replace(
                '<div id="root"></div>',
                `${ReactDOMServer.renderToString(
                    <App {...initialProps} />
                )}`
            )
        );
    });
};
router.use("^/$", serverRenderer);

router.use(
    express.static(path.resolve(__dirname, "..", "build"), { maxAge: "30d" })
);

// tell the app to use the above rules
app.use(router);

// app.use(express.static('./build'))
app.listen(PORT, () => {
    console.log(`SSR running on port ${PORT}`);
});
