"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.status = void 0;
const database_1 = require("../config/database");
const status = async (req, res) => {
    try {
        const db = await (0, database_1.getDB)();
        const filestatusCollection = db.collection('filestatus');
        const statusdata = await filestatusCollection.findOne({
            pointer: 'statusDisplay',
        });
        if (!statusdata) {
            throw new Error('No status data found');
        }
        res.status(200).send(statusdata);
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ error: 'No status data found' });
    }
};
exports.status = status;
//# sourceMappingURL=status.js.map