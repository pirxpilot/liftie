const select = require('../../select');
const debug = require('debug')('liftie:resort:lesarcs');

function parse(dom) {
    let liftStatus = {};

    select(dom, '.card-body.prl_info > div:first-child').forEach(function (div) {
        let name, status;

        if (div.firstChild.firstChild.data === "Lifts") {
            div.nextSibling.children.forEach(function (node) {
                name = node.children[1].firstChild.firstChild.data;

                const statusLetter = node.lastChild.firstChild.attribs.src.split("/").pop().split(".")[0];

                if (statusLetter === "O") {
                    status = "open";
                } else if (statusLetter === "P") {
                    status = "scheduled";
                } else {
                    status = "closed";
                }

                liftStatus[name] = status;
            });
        }
    });

    debug('Les Arcs Lift Status:', liftStatus);
    return liftStatus;
}

module.exports = parse;
