import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  primaryKey: '_id',
  serializeId: function(id) {
    console.log("HELLO" + id);
    return id.toString();
  }
});
