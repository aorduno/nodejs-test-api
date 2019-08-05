const assert = require('assert');
const mongoDb = require('mongodb');
const MongoClient = mongoDb.MongoClient;
const MongoObjectId = mongoDb.ObjectID;

function getDbName() {
	return "blogapp";
}

module.exports = {
	clientConnect: async() => (
		client = await(
			() => (
				new Promise(
					(resolve, reject) => (
						MongoClient.connect('mongodb://localhost:27017/' + getDbName(), {}, (err, client) => {
							if (err !== null) {
								reject(err);
							}

							resolve(client);
						})
					)
				)
			)
		)()
	),

	clientClose: async(client) => {
		client.close();
		return true;
	},

	getDbName: function() {
		return getDbName();
	},

	generateObjectId: function(objectId) {
		return new MongoObjectId(objectId);
	}
}